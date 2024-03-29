export const AppSettings = {
  hosts: {
    test: 'http://testserver',
    prod: 'https://www.pola-app.pl',
  },
  searchEndpoint: 'https://www.pola-app.pl/a/v4/search',
  eanEndpoint: 'https://www.pola-app.pl/a/v4/get_by_code',
  newsletterEndpoint: 'https://www.pola-app.pl/a/v4/subscribe_newsletter',
  getResponseEndpoint: 'https://api.getresponse.com/v3/',
  search: {
    SHOW_SUBMIT_BUTTON: true,
    SHOW_BARCODE_ICON: false,
    SHOW_RESULT_BRAND: false,
    SHOW_RESULT_MANUFACTURER: true,
    SHOW_VOICE_INPUT_ICON: false,
    SEARCH_ON_INPUT_CHANGE: false,
  },
  mobile: {
    SHOW_APPLE_STORE_LINK: true,
    SHOW_GOOGLE_PLAY_LINK: true,
    SHOW_HUAWEI_GALLERY_LINK: true,
  },
  SHOW_POLISH_VALUE_NOTES: false,
};
