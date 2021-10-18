import axios, { AxiosResponse } from 'axios';
import { IProductData, IProductSearchSuccess, ProductSearchResults } from '.';
import { ApiAdapter } from '../../services/api-adapter';
import config from '../../app-config.json';
import { InvalidSearchResultError, isEmptyQueryError } from '../../services/api-errors';
import { ISearchResultPage } from '../../state/search/search-reducer';

export interface ISearchError {
  type: string;
  status: number;
  title: string;
  detail: string;
  instance?: string;
  errors?: string[];
}

const API_NAME = 'Search Product API';

export class ProductService extends ApiAdapter {
  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }
  private static instance: ProductService;

  private constructor() {
    super(config.searchEndpoint, API_NAME);
  }

  public async searchProducts(phrase: string, token?: string): Promise<IProductSearchSuccess | void> {
    try {
      const searchQuery = this.buildSearchQuery(phrase, token);
      const result: IProductSearchSuccess = await this.getSearchResults(searchQuery);
      return result;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (isEmptyQueryError(error)) {
          return ProductSearchResults.Empty;
        }
      } else {
        throw error;
      }
    }
  }

  private buildSearchQuery(phrase: string, token?: string): string {
    let searchQuery = `query=${phrase}`;

    if (token) {
      searchQuery = searchQuery + `&pageToken=${token}`;
    }

    return searchQuery;
  }

  private async getSearchResults(searchQuery: string) {
    const response = await axios.get(`${this.apiUrl}?${searchQuery}`).catch((e: unknown) => {
      const error = this.handleError(e);
      throw error;
    });

    if (response) {
      if (response instanceof Error)
        if (!this.isValidSearchResults(response)) {
          throw new InvalidSearchResultError();
        }

      return response.data;
    }
  }

  private isValidSearchResults(response: AxiosResponse): boolean {
    const responseBody = response.data;
    return responseBody?.totalItems !== undefined && !!responseBody?.products;
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
