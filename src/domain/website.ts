export enum PageType {
  HOME = 'home',
  NEWS = 'news',
  ARTICLE = 'article',
  ABOUT = 'about',
  SUPPORT = 'support',
  FRIENDS = 'friends',
  PARTNERS = 'partners',
  BUSINESS = 'business',
  TEAM = 'team',
  CONTACT = 'contact',
  PRODUCTS = 'products',
  ERROR_404 = '404',
}

export interface PageLinkData {
  type: PageType;
  label: string;
  url: string;
}

const hashableUrl = (pageName: string) => (sectionId?: FriendHash | AboutHash | HomeHash) =>
  sectionId ? `/${pageName}#${sectionId}` : `/${pageName}`;

const slugableUrl = (pageName: string) => (sectionId?: FriendHash | AboutHash | HomeHash, slug?: string) => {
  if (slug) {
    return sectionId ? `/${pageName}?value=${slug}#${sectionId}` : `/${pageName}?value=${slug}`;
  } else {
    return sectionId ? `/${pageName}#${sectionId}` : `/${pageName}`;
  }
};

export const urls = {
  pola: {
    home: hashableUrl(''),
    news: '/news',
    about: hashableUrl('about'),
    support: '/support',
    friends: slugableUrl('friends'),
    partners: '/partners',
    business: '/business',
    team: '/join',
    products: '/products',
  },
  external: {
    openFoods: new URL('https://pl.openfoodfacts.org/'),
    polaSupport: new URL('https://klubjagiellonski.pl/zbiorka/wspieraj-aplikacje-pola/'),
    polaGooglePlay: new URL('https://play.google.com/store/apps/details?id=pl.pola_app'),
    polaAppStore: new URL('https://itunes.apple.com/us/app/pola.-zabierz-ja-na-zakupy/id1038401148?ls=1&amp;mt=8'),
    openSearch: new URL('https://openresearch.pl/91-polakow-chce-znac-pochodzenie-produktow-ktore-kupuje/'),
    polaGitHub: new URL('https://github.com/KlubJagiellonski'),
    polaPrivacyPolicy: new URL('https://pola-app.s3.amazonaws.com/docs/polityka_prywatnosci.pdf'),
    klubJagiellonski: new URL('https://klubjagiellonski.pl/projekty/centrum-analiz/'),
    instytutLogistyki: new URL('https://ilim.lukasiewicz.gov.pl/'),
    mojePanstwo: new URL('https://mojepanstwo.pl/'),
    githubAndroid: new URL('https://github.com/KlubJagiellonski/pola-android/issues'),
    githubIos: new URL('https://github.com/KlubJagiellonski/pola-ios/issues'),
    githubWeb: new URL('https://github.com/KlubJagiellonski/pola-backend/issues'),
    form: new URL(
      'https://docs.google.com/forms/d/e/1FAIpQLSfJ14U66y_Z_thn9wiUHaBGOfKlZNhL4BGYuHjO2tJuzXi9gQ/viewform'
    ),
    fundraising: new URL('https://klubjagiellonski.pl/zbiorka/wspieraj-aplikacje-pola/'),
    polaSocialMedia: {
      facebook: new URL('https://www.facebook.com/app.pola'),
      twitter: new URL('https://twitter.com/pola_app'),
      instagram: new URL('https://www.instagram.com/pola_skanuj_zakupy/'),
    },
    mail: {
      Perowicz: new URL('mailto:mateusz.perowicz@klubjagiellonski.pl'),
      Klub: new URL('mailto:Pola@klubjagiellonski.pl'),
    },
  },
};

export const pageLinks: PageLinkData[] = [
  { type: PageType.ABOUT, label: 'O Poli', url: urls.pola.about() },
  { type: PageType.NEWS, label: 'Aktualności', url: urls.pola.news },
  { type: PageType.FRIENDS, label: 'Klub przyjaciół Poli', url: urls.pola.friends() },
  { type: PageType.PARTNERS, label: 'Partnerzy', url: urls.pola.partners },
  { type: PageType.BUSINESS, label: 'Oferta biznesowa', url: urls.pola.business },
  { type: PageType.TEAM, label: 'Dołącz do zespołu', url: urls.pola.team },
  { type: PageType.CONTACT, label: 'Kontakt', url: urls.pola.home('contact') },
  { type: PageType.SUPPORT, label: 'Wesprzyj aplikację', url: urls.external.polaSupport.href },
];

type FriendHash = 'profit' | 'friend';
type AboutHash = 'faq';
type HomeHash = 'contact';
