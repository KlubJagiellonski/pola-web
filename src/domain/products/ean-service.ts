import axios from 'axios';
import { IProductEAN, IProductMock } from '.';
import { ApiService } from '../../services/api-service';
import config from '../../app-config.json';
import { EmptyResponseDataError, FetchError } from '../../services/api-errors';

export interface IProductEANParams {
  code: string;
}

export interface IProductEANError {
  error: unknown;
}

const PRODUCT_EAN_API = config.searchApiURL;

export class ProductEANService extends ApiService {
  public static getInstance(): ProductEANService {
    if (!ProductEANService.instance) {
      ProductEANService.instance = new ProductEANService();
    }
    return ProductEANService.instance;
  }
  private static instance: ProductEANService;

  private constructor() {
    super(PRODUCT_EAN_API);
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
