import { Dictionary } from "./generics";

export enum PageType {
  HOME = "home",
  NEWS = "news",
  ARTICLE = "article",
  ABOUT = "about",
  SUPPORT = "support",
  COMPANY_FORM = "company-form",
  FRIENDS = "friends",
  PARTNERS = "partners",
  BUSINESS = "business",
  SUPPLIERS = "suppliers",
  TEAM = "team",
  CONTACT = "contact",
  PRODUCTS = "products",
  ERROR_404 = "404",
  PRIVACY_POLICY = "privacyPolicy",
  NEWSLETTER = "newsletter",
  MATERIALS = "materials",
}

export const MobilePagesPrefix = "m";

type FriendHash = "profit" | "friend";
type AboutHash = "faq";
type HomeHash = "contact";
type HashSection = HomeHash | AboutHash | FriendHash;

type HrefFunction = (sectionId?: HashSection) => string;
type SlugFunction = (sectionId?: HashSection, slug?: string) => string;

export interface PageLinkData {
  type: PageType;
  label: string;
  url: string | HrefFunction;
}

export interface ExternalLinkData {
  type: PageType;
  label: string;
  url: string | HrefFunction;
}

const hashableUrl: (name?: string) => HrefFunction = (
  pageName: string = ""
) => (sectionId?: HashSection) =>
  sectionId ? `/${pageName}#${sectionId}` : `/${pageName}`;

const sluggableUrl: (name?: string) => SlugFunction = (pageName?: string) => (
  sectionId?: HashSection,
  slug?: string
) => {
  if (slug) {
    return sectionId
      ? `/${pageName}?value=${slug}#${sectionId}`
      : `/${pageName}?value=${slug}`;
  } else {
    return sectionId ? `/${pageName}#${sectionId}` : `/${pageName}`;
  }
};

type HrefDictionary = Dictionary<HrefFunction | SlugFunction>;
type UrlDictionary = Dictionary<URL>;

type WebsiteMap = {
  pola: HrefDictionary;
  external: {
    links: UrlDictionary;
    polaSocialMedia: UrlDictionary;
    mail: UrlDictionary;
  };
};

export const urls: WebsiteMap = {
  pola: {
    home: hashableUrl(),
    news: hashableUrl("news"),
    about: hashableUrl("about"),
    support: hashableUrl("support"),
    friends: sluggableUrl("friends"),
    partners: hashableUrl("partners"),
    business: sluggableUrl("business"),
    team: hashableUrl("join"),
    products: hashableUrl("products"),
    privacyPolicy: hashableUrl("privacy-policy"),
    newsletter: hashableUrl("newsletter"),
    materials: hashableUrl("materials"),
  },
  external: {
    links: {
      openFoods: new URL("https://pl.openfoodfacts.org/"),
      polaSupport: new URL(
        "https://klubjagiellonski.pl/zbiorka/wspieraj-aplikacje-pola/"
      ),
      polaGooglePlay: new URL(
        "https://play.google.com/store/apps/details?id=pl.pola_app"
      ),
      polaAppStore: new URL(
        "https://itunes.apple.com/us/app/pola.-zabierz-ja-na-zakupy/id1038401148?ls=1&amp;mt=8"
      ),
      polaHuaweiAppGallery: new URL(
        "https://appgallery.huawei.com/app/C105876503?fbclid=IwAR1ODHLJkpxMTkEgnigWNHaDeaQPOHNTf6kNrdoRT6UYhWkU6PQA7QL2Nq8"
      ),
      openSearch: new URL(
        "https://openresearch.pl/91-polakow-chce-znac-pochodzenie-produktow-ktore-kupuje/"
      ),
      polaGitHub: new URL("https://github.com/KlubJagiellonski"),
      polaPrivacyPolicy: new URL(
        "https://pola-app.s3.amazonaws.com/docs/polityka_prywatnosci.pdf"
      ),
      githubAndroid: new URL(
        "https://github.com/KlubJagiellonski/pola-android/issues"
      ),
      githubIos: new URL("https://github.com/KlubJagiellonski/pola-ios/issues"),
      githubWeb: new URL(
        "https://github.com/KlubJagiellonski/pola-backend/issues"
      ),
      github: new URL("https://github.com/KlubJagiellonski"),
      pge: new URL("https://www.gkpge.pl/"),
      polskieKupujeTo: new URL("https://polskiekupujeto.pl"),
      getresponsePrivacyPolicy: new URL(
        "https://www.getresponse.pl/email-marketing/Informacje-prawne/polityka-prywatnosci.html"
      ),
      amazonawsRegulamin: new URL(
        "https://s3.eu-central-1.amazonaws.com/secure-pliki/regulamin.pdf"
      ),
      newCompanyForm: new URL(
        "https://docs.google.com/forms/d/e/1FAIpQLSfJ14U66y_Z_thn9wiUHaBGOfKlZNhL4BGYuHjO2tJuzXi9gQ/viewform"
      ),
      fundraising: new URL(
        "https://klubjagiellonski.pl/zbiorka/wspieraj-aplikacje-pola/"
      ),
      biznesKlub: new URL(
        "https://klubjagiellonski.pl/projekty/oferta-biznesowa-centrum-analiz-klubu-jagiellonskiego/"
      ),
    },
    polaSocialMedia: {
      facebook: new URL("https://www.facebook.com/app.pola"),
      twitter: new URL("https://twitter.com/pola_app"),
      instagram: new URL("https://www.instagram.com/pola_skanuj_zakupy/"),
    },
    mail: {
      Perowicz: new URL("mailto:mateusz.perowicz@klubjagiellonski.pl"),
      Klub: new URL("mailto:Pola@klubjagiellonski.pl"),
      biuro: new URL("mailto:biuro@klubjagiellonski.pl"),
      Ociepka: new URL("mailto:tomasz.ociepka@klubjagiellonski.pl"),
    },
  },
};

export const pageLinks: (PageLinkData | ExternalLinkData)[] = [
  { type: PageType.ABOUT, label: "O Poli", url: urls.pola.about() },
  { type: PageType.NEWS, label: "Aktualności", url: urls.pola.news() },
  {
    type: PageType.FRIENDS,
    label: "Klub przyjaciół Poli",
    url: urls.pola.friends(),
  },
  { type: PageType.PARTNERS, label: "Partnerzy", url: urls.pola.partners() },
  {
    type: PageType.BUSINESS,
    label: "Oferta biznesowa",
    url: urls.pola.business(),
  },
  { type: PageType.TEAM, label: "Dołącz do zespołu", url: urls.pola.team() },
  { type: PageType.CONTACT, label: "Kontakt", url: urls.pola.home("contact") },
  {
    type: PageType.SUPPORT,
    label: "Wesprzyj aplikację",
    url: urls.external.links.polaSupport.href,
  },
  {
    type: PageType.COMPANY_FORM,
    label: "Dodaj firmę",
    url: urls.external.links.newCompanyForm.href,
  },
];
