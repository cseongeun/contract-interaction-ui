import replace from 'lodash';
import numeral from 'numeral';
import { getAddress } from '@ethersproject/address';
import { toBigNumber } from 'helpers/bignumber';
import { ethers } from 'ethers';

export const shortenAddress = (address: string, chars: number = 4): string => {
  try {
    const parsed = getAddress(address);
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
  } catch (e) {
    throw Error(`Invalid 'address', params '${address}'.`);
  }
};

export const shortenNumberByUnit = (value: number | string): string => {
  try {
    return replace(numeral(toBigNumber(value).toNumber()).format('0.00a')).toString();
  } catch (e) {
    return '0';
  }
};

export const insertSpace = (str: string): string => {
  return str.split('').join(' ');
};

export const commify = (value: string | number): string => {
  return ethers.utils.commify(value.toString());
};
