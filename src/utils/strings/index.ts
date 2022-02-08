import { Validator } from '../../state/types';

export const isNotEmpty = (value: string) => !!value && value.length && value.length > 0;

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 *
 * @param email
 * @returns undefined for valid email; otherwise error message (string)
 */
export const validateEmail: Validator<string> = (email: string): string | undefined => {
  const isValid = email ? emailRegex.test(email) : false;
  if (!isValid) {
    return 'email does not match email pattern';
  }
  return;
};
