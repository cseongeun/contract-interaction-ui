import { isGreaterThan } from 'helpers/bignumber';

/**
 *
 * 객체 안의 값을 기준으로 정렬
 * ex)
 * obj = {
 *   BNB: 1111,
 *   MATIC: 1,
 *   ETH: 123,
 *   UNI: 13,
 * }
 *
 * order = 1
 *
 * =>
 * return {
 *   BNB: 111,
 *   ETH: 123,
 *   UNI: 13,
 *   MATIC: 1,
 * }
 *
 * @param obj sorting obj
 * @param desc descending
 */
export const sortObjectByValue = (obj: any, desc: boolean = true) => {
  return Object.fromEntries(
    Object.entries(obj).sort(([, a], [, b]) => {
      if (desc) {
        return isGreaterThan(a, b) ? -1 : 1;
      }
      return isGreaterThan(a, b) ? 1 : -1;
    })
  );
};
