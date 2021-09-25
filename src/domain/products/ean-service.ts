import axios from 'axios';
import { IProductEAN, IProductMock } from '.';
import { ApiAdapter } from '../../services/api-adapter';
import config from '../../app-config.json';
import { EmptyResponseDataError, FetchError } from '../../services/api-errors';

export interface IProductEANParams {
  code: string;
}

export interface IProductEANError {
  error: unknown;
}

const PRODUCT_EAN_API = config.searchApiURL;

export class ProductEANService extends ApiAdapter {
  public static getInstance(): ProductEANService {
    if (!ProductEANService.instance) {
      ProductEANService.instance = new ProductEANService();
    }
    return ProductEANService.instance;
  }
  private static instance: ProductEANService;

  private constructor() {
    super(PRODUCT_EAN_API, 'EAN API');
  }

  public async getProduct(code: string): Promise<IProductEAN> {
    try {
      const response = await await axios.get(`/a/v4/get_by_code?code=${code}&device_id="0"`);
      const product: IProductEAN = response.data;
      console.log('response', response);

      if (!product) {
        throw new EmptyResponseDataError('product');
      }

      return product;
    } catch (e) {
      throw new FetchError('EAN API', e);
    }
  }
}
