import { ApiAdapter } from '../../app/api-adapter';
import { InvalidSearchResultError } from '../../app/api-errors';
import { AppSettings } from '../../app/app-settings';
import { ISearchResultPage } from '../state/search-reducer';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { IProductData, ISearchSuccessResponse } from 'search';

import { isNotEmpty } from '@Utils/strings';

export interface ISearchError {
  type: string;
  status: number;
  title: string;
  detail: string;
  instance?: string;
  errors?: string[];
}

const API_NAME = 'Search Product API';

function typeCheck(response: any): response is ISearchSuccessResponse {
  return response.code;
}

export class ProductService extends ApiAdapter {
  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }
  private static instance: ProductService;

  private constructor() {
    super(API_NAME, AppSettings.searchEndpoint);
  }

  public async searchProducts(phrase: string, token?: string) {
    try {
      if (isNotEmpty(phrase)) {
        const searchQuery = this.buildSearchQuery(phrase, token);
        const response = await axios.get<ISearchSuccessResponse>(searchQuery);

        if (!response) {
          throw new Error('Response in empty');
        }
        if ((response as any).isAxiosError) {
          throw response;
        }
        if (!this.isValidSearchResults(response)) {
          throw new InvalidSearchResultError();
        }

        this.validateProducts(response.data.products);

        return {
          ...response.data,
        };
      }
      return null;
    } catch (error: unknown) {
      if (error instanceof InvalidSearchResultError) {
        throw error;
      }
      const apiError = this.handleError(error);
      throw apiError;
    }
  }

  private buildSearchQuery(phrase: string, token?: string): string {
    let params = `query=${phrase}`;

    if (token) {
      params = params + `&pageToken=${token}`;
    }

    return `${this.apiUrl}?${params}`;
  }

  private isValidSearchResults(response: AxiosResponse): boolean {
    const responseBody = response.data;
    return responseBody?.totalItems !== undefined && !!responseBody?.products;
  }

  private validateProducts(products: IProductData[]): void {
    products.forEach((product: IProductData) => {
      const errors = validateProduct(product);
      if (errors) {
        console.error(`Product ${product.name} is invalid: ${errors.join(', ')}`);
      }
    });
  }
}

/**
 * Reduces search result pages to one results collection
 * @param search API response data
 * @returns agreggated results collection
 */
export function reduceToFlatProductsList(pages: ISearchResultPage[]): IProductData[] {
  return pages.reduce((products: IProductData[], page: ISearchResultPage) => {
    return [...products, ...page.products];
  }, []);
}

const validateProduct = (product: IProductData): string[] | undefined => {
  const errorMessages: string[] = [];
  if (!product.brand) errorMessages.push('missing brand');
  if (!product.company) errorMessages.push('missing company');
  if (product.code.length < 1) errorMessages.push('empty EAN code');
  if (product.name.length < 1) errorMessages.push('empty name');
  return errorMessages.length > 1 ? errorMessages : undefined;
};
