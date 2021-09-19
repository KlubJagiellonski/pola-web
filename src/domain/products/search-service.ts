import axios from 'axios';
import { IProductData, IProductSearchSuccess, ProductSearchResults } from '.';
import { ApiService } from '../../services/api-service';
import config from '../../app-config.json';
import { FetchError } from '../../services/api-errors';
import { ISearchResultPage } from '../../state/search/search-reducer';

export interface ISearchParams {
  phrase: string;
}
export interface ISearchError {
  error: unknown;
}

export class ProductService extends ApiService {
  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }
  private static instance: ProductService;

  private constructor() {
    super(config.searchApiURL);
  }

  public async searchProducts(phrase: string, token?: string): Promise<IProductSearchSuccess> {
    try {
      const phraseIsNotEmpty = phrase !== undefined && phrase.length > 0;

      if (phraseIsNotEmpty) {
        const searchQuery = this.buildSearchQuery(phrase, token);
        const result: IProductSearchSuccess = await this.getSearchResults(searchQuery);
        return result;
      }

      return ProductSearchResults.Empty;
    } catch (e) {
      throw new FetchError('Search API', e);
    }
  }

  private buildSearchQuery(phrase: string, token?: string): string {
    let searchQuery = `search?query=${phrase}`;

    if (token) {
      searchQuery = searchQuery + `&pageToken=${token}`;
    }

    return searchQuery;
  }

  private async getSearchResults(searchQuery: string): Promise<IProductSearchSuccess> {
    const response = await await axios.get(`/a/v4/${searchQuery}`);
    const result: IProductSearchSuccess = response.data;

    return result;
  }
}

/**
 * Reduces search result pages to one results collection
 * @param search API response data
 * @returns agreggated results collection
 */
export function reduceSearchResults(pages: ISearchResultPage[]): IProductData[] {
  return pages.reduce((products: IProductData[], page: ISearchResultPage) => {
    return [...products, ...page.products];
  }, []);
}
