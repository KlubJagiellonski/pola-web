import { mockAxiosErrorResponse, mockGETRequest, mockProduct } from '../../utils/tests/mocks';
import axios, { AxiosError, AxiosResponse, AxiosStatic } from 'axios';
import 'jest';
import 'jest-expect-message';
import { ISearchSuccessResponse } from 'search';

import { ProductService } from './search-service';

jest.mock('axios');

const mockSearchResult = (): ISearchSuccessResponse => ({
  nextPageToken: 'bcvsag456345345',
  totalItems: 13,
  products: [mockProduct(), mockProduct(), mockProduct(), mockProduct()],
});

const mockSearchResponse = (headers?: any): AxiosResponse => ({
  data: mockSearchResult(),
  status: 200,
  statusText: 'OK',
  headers,
  config: mockGETRequest(),
  request: {},
});

const mockEmptyQueryErrorResponse = (): AxiosError =>
  mockAxiosErrorResponse(400, 'Bad request', {
    type: 'about:blank',
    title: 'Request validation failed',
    detail: '1 errors encountered',
    status: 400,
    errors: ['Value of parameter cannot be empty: query'],
  });

const mockNetworkErrorResponse = (): AxiosError => {
  const error = mockAxiosErrorResponse(503, 'Service unavailable', {
    type: 'connection:failed',
    title: 'Service connecition failed',
    detail: '1 errors encountered',
    status: 503,
  });

  delete error.request;
  delete error.response;

  return error;
};

const mockServiceErrorResponse = (): AxiosError => {
  const error = mockAxiosErrorResponse(500, 'Internal service error', {
    type: 'service:fail',
    title: 'Service internal failure',
    detail: '1 errors encountered',
    status: 500,
  });

  return error;
};

const axiosGet = axios.get as jest.Mock;

describe('Product search service', () => {
  beforeEach(() => {
    axiosGet.mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('for correct query', () => {
    test('should response valid search results object', async () => {
      axiosGet.mockResolvedValue(mockSearchResponse());
      const responseData = await ProductService.getInstance().searchProducts('some query');

      expect(responseData, 'response data should be an object').not.toBeUndefined;
      expect(responseData?.totalItems, 'icorrect total number of items').toEqual(13);
      expect(responseData?.products.length, `incorrect number of page's items`).toEqual(4);
      expect(responseData?.nextPageToken, 'next page token should be defined').not.toBeUndefined;
    });
  });

  describe('for empty query', () => {
    test('should return a valid empty collection', async () => {
      axiosGet.mockResolvedValue(mockEmptyQueryErrorResponse());

      const responseData = await ProductService.getInstance().searchProducts('');

      expect(responseData, 'response data should be an object').not.toBeUndefined;
      expect(responseData?.totalItems, 'should not be items for empty query').toBeUndefined;
      expect(responseData?.products.length, 'should not be products for empty query').toBeUndefined;
      expect(responseData?.nextPageToken, 'should not be next page token for empty query').toBeUndefined;
    });
  });

  describe('for invalid search result', () => {
    test('should throw an invalid data error', async () => {
      axiosGet.mockResolvedValue({ invalidProperty: 1 });

      try {
        await ProductService.getInstance().searchProducts('some valid query');
      } catch (e: any) {
        expect(e instanceof Error).toBeTruthy;
        expect(e.name).toEqual('Invalid search result');
      }
    });
  });

  describe('for network error', () => {
    test('should throw a network error when search service in unreachable', async () => {
      axiosGet.mockResolvedValue(mockNetworkErrorResponse());

      try {
        await ProductService.getInstance().searchProducts('some valid query');
      } catch (e: any) {
        expect(e instanceof Error).toBeTruthy;
        expect(e.name).toEqual('Network error');
      }
    });
  });

  describe('for error response', () => {
    test('should throw an internal service error', async () => {
      axiosGet.mockResolvedValue(mockServiceErrorResponse());

      try {
        await ProductService.getInstance().searchProducts('some valid query');
      } catch (e: any) {
        expect(e instanceof Error).toBeTruthy;
        expect(e.name).toEqual('Internal service error');
      }
    });
  });
});
