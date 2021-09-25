import Sinon from 'sinon';
import { expect } from 'chai';
import { ProductService } from './search-service';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { IProductData, IProductSearchSuccess } from '.';

const mockProduct = (): IProductData => ({
  code: 'EAN4534',
  name: 'test product',
  score: 55,
  polishCapital: 55,
  company: {
    name: 'test company',
  },
  brand: {
    name: 'test brand',
  },
});

const mockSearchResult = (): IProductSearchSuccess => ({
  nextPageToken: 'bcvsag456345345',
  totalItems: 13,
  products: [mockProduct(), mockProduct(), mockProduct(), mockProduct()],
});

const mockSearchRequest = (headers?: any, params?: any): AxiosRequestConfig => ({
  url: 'mock.server.com',
  method: 'GET',
  headers,
  params,
});

const mockSearchResponse = (data?: any, headers?: any): AxiosResponse => ({
  data,
  status: 200,
  statusText: 'OK',
  headers,
  config: mockSearchRequest(),
  request: {},
});

const mockAxiosError = (status: number, statusText: string, data?: any): AxiosError => ({
  config: mockSearchRequest(),
  code: status.toString(),
  response: {
    status,
    statusText,
    headers: {
      xFrameOptions: 'DENY',
      contentLength: 167,
      contentLanguage: 'pl',
      vary: 'Accept-Language',
      referrerPolicy: 'same-origin',
      via: '1.1 vegur',
    },
    config: mockSearchRequest(),
    data,
  },
  isAxiosError: false,
  name: 'test name',
  message: statusText,
  toJSON: () => ({}),
});

const mockSearchError = (): AxiosError =>
  mockAxiosError(400, 'Bad request', {
    type: 'about:blank',
    title: 'Request validation failed',
    detail: '1 errors encountered',
    status: 400,
    errors: ['Value of parameter cannot be empty: query'],
  });

const mockServiceUnreachableError = (): AxiosError =>
  mockAxiosError(503, 'Service unavailable', {
    type: 'about:blank',
    title: 'Request validation failed',
    detail: '1 errors encountered',
    status: 400,
    errors: ['Value of parameter cannot be empty: query'],
  });

describe('Product search service', () => {
  let getProducts: Sinon.SinonStub;

  beforeEach(() => {
    getProducts = Sinon.stub(axios, 'get');
  });

  afterEach(() => {
    getProducts.restore();
  });

  it('should return page items', async () => {
    const expectedResult = mockSearchResult();
    getProducts.resolves(mockSearchResponse(expectedResult));

    const result = await ProductService.getInstance().searchProducts('some query');

    expect(result.totalItems).equals(13, 'icorrect total number of items');
    expect(result.products.length).equals(4, `incorrect number of page's items`);
    expect(result.nextPageToken, 'next page token should be defined').not.undefined;
  });

  it('should return an empty collection for empty query', async () => {
    getProducts.throws(mockSearchError());

    const result = await ProductService.getInstance().searchProducts('');

    expect(result.totalItems).equals(0, 'should not be items for empty query');
    expect(result.products.length).equals(0, 'should not be products for empty query');
    expect(result.nextPageToken, 'should not be next page token for empty query').null;
  });

  it('should throw an error when search service in unreachable', async () => {
    getProducts.throws(mockServiceUnreachableError());

    const result = await ProductService.getInstance().searchProducts('some correct query');

    expect(result.totalItems).equals(0, 'should not be items for empty query');
    expect(result.products.length).equals(0, 'should not be products for empty query');
    expect(result.nextPageToken, 'should not be next page token for empty query').null;
  });
  it('should throw an error when request timeout exeeds');
  it('should throw an error when request structure is broken');
});
