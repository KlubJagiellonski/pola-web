import { ApiAdapter } from '../../app/api-adapter';
import { EmptyResponseDataError, FetchError, ProductNotFoundError } from '../../app/api-errors';
import { AppSettings } from '../../app/app-settings';
import axios from 'axios';
import { EAN, IProductEAN } from 'search';

export interface IProductEANParams {
  code: EAN;
}

export interface IProductEANError {
  error: unknown;
}

const API_NAME = 'EAN Product API';

export class ProductEANService extends ApiAdapter {
  public static getInstance(): ProductEANService {
    if (!ProductEANService.instance) {
      ProductEANService.instance = new ProductEANService();
    }
    return ProductEANService.instance;
  }
  private static instance: ProductEANService;

  private constructor() {
    super(API_NAME, AppSettings.eanEndpoint);
  }

  private buildQuery(code: EAN): string {
    return `code=${code}&device_id="0"`;
  }

  public async getProduct(code: EAN): Promise<IProductEAN> {
    try {
      const query = this.buildQuery(code);
      const response = await await axios.get(`${this.apiUrl}?${query}`);
      const product: IProductEAN = response.data;

      if (response.status === 404) {
        throw new ProductNotFoundError(`EAN${code}`);
      }

      if (!product) {
        throw new EmptyResponseDataError(`EAN${code}`);
      }

      return product;
    } catch (e) {
      throw new FetchError(API_NAME, e);
    }
  }
}
