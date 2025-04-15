import { Dictionary } from '../app/generics';

import { getEAN } from '@Utils/data/random-number';

export type EAN = string;
export interface ICompany {
  name: string;
  score: number | null;
}

export interface IBrand {
  name: string;
}

export interface IProductData {
  code: EAN;
  name: string;
  company?: ICompany;
  brand?: IBrand;
}

export const mockProductData: IProductData = {
  code: getEAN(),
  name: 'test product',
  company: {
    name: 'product manufacturer',
    score: 80,
  },
  brand: {
    name: 'brand',
  },
};

export interface ISearchSuccessResponse {
  nextPageToken: string | null;
  totalItems: number;
  products: IProductData[];
}

export interface ISearchResults {
  phrase?: string;
  products?: IProductData[];
  totalItems?: number;
  token?: string;
}

export class ProductSearchResults implements ISearchSuccessResponse {
  public static Empty: ISearchSuccessResponse = {
    nextPageToken: null,
    totalItems: 0,
    products: [],
  };

  constructor(public totalItems: number, public products: IProductData[], public nextPageToken: string) {}
}

interface IDonate {
  show_button: boolean;
  title: string;
  url: string;
}

interface IReport {
  button_text: string;
  button_type: string;
  text: string;
}

export interface IManufacturer {
  name: string;
  description: string;
  is_friend: boolean;
  plCapital: number;
  plCapital_notes: string;
  plNotGlobEnt: number;
  plNotGlobEnt_notes: string;
  plRegistered: number;
  plRegistered_notes: string;
  plRnD: number;
  plRnD_notes: string;
  plScore: number;
  plWorkers: number;
  plWorkers_notes: string;
  sources: Dictionary<string>;
}

export interface IProductEAN {
  product_id: number;
  name: string;
  altText: string;
  card_type: string;
  code: EAN;
  donate: IDonate;
  companies: IManufacturer[];
  report: IReport;
}

export class Product {
  public code: EAN;
  public manufacturer: IManufacturer;
  public donate: IDonate;
  public report: IReport;

  constructor(public name: string, productEntityEAN: IProductEAN) {
    this.code = productEntityEAN.code;
    this.manufacturer = productEntityEAN.companies[0];
    this.donate = productEntityEAN.donate;
    this.report = productEntityEAN.report;
  }
}
