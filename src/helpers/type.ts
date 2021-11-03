import { getAddress } from '@ethersproject/address';
import _ from 'lodash';

export const isAddress = (address: any): boolean => {
  try {
    getAddress(address);
    return true;
  } catch (e) {
    return false;
  }
};

export const isUndefined = (value: any): boolean => {
  try {
    return _.isUndefined(value);
  } catch (e) {
    return false;
  }
};

export const isNull = (value: any): boolean => {
  try {
    return _.isNull(value);
  } catch (e) {
    return false;
  }
};
