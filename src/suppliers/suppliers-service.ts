import { ApiAdapter } from '../../services/api-adapter';
import { AppSettings } from '../../state/app-settings';

const API_NAME = 'Suppliers API';

export class SuppliersService extends ApiAdapter {
  public static getInstance(): SuppliersService {
    if (!SuppliersService.instance) {
      SuppliersService.instance = new SuppliersService();
    }
    return SuppliersService.instance;
  }
  private static instance: SuppliersService;

  private constructor() {
    super(API_NAME, AppSettings.newsletterEndpoint);
  }
}
