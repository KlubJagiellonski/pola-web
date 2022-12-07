import axios, { AxiosError, AxiosResponse, AxiosStatic } from 'axios';
import 'jest';
import 'jest-expect-message';
import { EAN, IProductEAN } from 'search';

import { mockGETRequest } from '@Utils/tests/mocks';

import { ProductEANService } from './ean-service';

jest.mock('axios');
const axiosGet = axios.get as jest.Mock;
/*
 * Example of mocking a function that was imported into the system under test.
 * The mock must be declared before importing the SUT file, hence the two test fies.
 */
// jest.mock('./ean-service', () => ({
//   getInstance: () => ({
//     getProduct: (code: EAN) => {
//       return Promise.reject(mockFailureResponse);
//     },
//   }),
// }));

const mockEANProduct: IProductEAN = {
  product_id: 1,
  name: 'mock product',
  altText: 'mock description',
  card_type: 'unknown card type',
  code: '4006985902304',
  donate: {
    show_button: true,
    title: 'mock button',
    url: 'product.url',
  },
  companies: [
    {
      name: 'mock company',
      description: 'mock description',
      is_friend: false,
      plCapital: 75,
      plCapital_notes: 'mock notes',
      plNotGlobEnt: 50,
      plNotGlobEnt_notes: 'mock notes',
      plRegistered: 100,
      plRegistered_notes: 'mock notes',
      plRnD: 0,
      plRnD_notes: 'mock notes',
      plScore: 67,
      plWorkers: 100,
      plWorkers_notes: 'mock notes',
      sources: { '1': 'source #1', '2': 'source #2' },
    },
  ],
  report: {
    button_text: 'button label',
    button_type: 'main button',
    text: 'report name',
  },
};

const mockEANResponse = (headers?: any): AxiosResponse => ({
  data: mockEANProduct,
  status: 200,
  statusText: 'OK',
  headers,
  config: mockGETRequest(),
  request: {},
});

describe('Product EAN service', () => {
  beforeEach(() => {
    axiosGet.mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('for correct EAN code', () => {
    test('should return valid product details', async () => {
      axiosGet.mockResolvedValue(mockEANResponse());
      const responseData = await ProductEANService.getInstance().getProduct('4006985902304');

      expect(responseData, 'response data should be an object').not.toBeUndefined;
      expect(responseData?.product_id, 'incorrect product id').toEqual(1);
      expect(responseData?.code, `incorrect EAN code`).toEqual('4006985902304');
    });
  });
});
