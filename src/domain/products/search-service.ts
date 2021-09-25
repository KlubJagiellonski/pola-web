import axios, { AxiosResponse, AxiosError } from 'axios';
import { IProductData, IProductSearchSuccess, ProductSearchResults } from '.';
import { ApiService } from '../../services/api-service';
import config from '../../app-config.json';
import { BadRequestError, FetchError, InternalServiceError, InvalidSearchResultError } from '../../services/api-errors';
import { ISearchResultPage } from '../../state/search/search-reducer';

export interface ISearchError {
  type: string;
  status: number;
  title: string;
  detail: string;
  instance?: string;
  errors?: string[];
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
    } catch (e: unknown) {
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

  private async getSearchResults(searchQuery: string) {
    const response = await axios.get(`/a/v4/${searchQuery}`).catch((error: AxiosError) => {
      /**
       * client received an error response (5xx, 4xx)
       */
      if (error.response) {
        switch (error.response.status) {
          case 200:
            return error.response.data;
          case 400:
            throw new BadRequestError();
          case 500:
            throw new InternalServiceError();
          default:
            console.warn('Unhandled error', error);
        }
      } else if (error.request) {
        /**
         * something happened in setting up the request that triggered an Error
         * client never received a response, or request never left
         */
        throw new FetchError('Search API', error);
      } else {
        console.warn('Unhandled error', error);
      }
    });

    if (!this.isValidSearchResponse(response)) {
      throw new InvalidSearchResultError();
    }

    return response.data;
  }

  private isValidSearchResponse(response: AxiosResponse): boolean {
    const responseBody = response.data;
    return !!responseBody.totalItems && !!responseBody.products;
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
