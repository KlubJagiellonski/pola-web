import { v4 } from 'uuid';

/**
 * Gets random number from min-max scope
 * @param min Minimal value
 * @param max Maxmimal value
 * @returns float value between min and max
 */
export function getNumber(min: number = 0, max: number = 1000): number {
  const value = Math.floor(Math.random() * max);
  return value > min ? value : min;
}

export type guid = string;

export function getGuid(): guid {
  return v4();
}
