//import { hello } from '@InPerceptic/web-utils';
import { Validator } from '@App/state';

export const isNotEmpty = (value: string) => !!value && value.length && value.length > 0;

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 *
 * @param email
 * @returns undefined for valid email; otherwise error message (string)
 */
export const validateEmail: Validator<string | undefined> = (email: string | undefined): string | undefined => {
  if (!email || email.length === 0) {
    return 'brakuje adresu email';
  }

  const isValid = email ? emailRegex.test(email) : false;
  if (!isValid) {
    return 'nieprawidłowy adres email';
  }
  return;
};


export const decodeHtml = (html: string) => {
  var entities = [
    ['amp', '&'],
    ['apos', '\''],
    ['#x27', '\''],
    ['#x2F', '/'],
    ['#39', '\''],
    ['#47', '/'],
    ['lt', '<'],
    ['gt', '>'],
    ['nbsp', ' '],
    ['quot', '"']
  ];

  for (var i = 0, max = entities.length; i < max; ++i) 
  html = html.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);

  return html;
}