import { Token } from '@app/interface/token';
import { Customer } from '@app/interface/customer';

export interface CommonState {
  token: null | Token;
  customer: null | Customer;
}
