import { getAddress } from '@ethersproject/address';
import { ethers, BigNumber } from 'ethers';

/**
 * adjust commify
 * @param amount value
 * @returns commified value
 */
export function toCommify(amount: any): string {
  return ethers.utils.commify(amount.toString());
}

/**
 * bytes32 to string
 * @param bytes32  bytes32
 * @returns  string
 */
export function bytes32ToString(bytes32: string): string {
  return ethers.utils.parseBytes32String(bytes32);
}

/**
 * string to bytes32
 * @param string  string
 * @returns  bytes32
 */
export function stringToBytes32(string: string): string {
  return ethers.utils.formatBytes32String(string);
}

/**
 * to hex string
 * @param value  value
 * @returns hex string
 */
export function toHexString(value: any): string {
  return ethers.utils.hexStripZeros(BigNumber.from(value).toHexString());
}

export const insertSpace = (str: string): string => {
  return str.split('').join(' ');
};

export const shortenAddress = (address: string, chars: number = 4): string => {
  try {
    const parsed = getAddress(address);
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(
      42 - chars,
    )}`;
  } catch (e) {
    throw Error(`Invalid 'address', params '${address}'.`);
  }
};
