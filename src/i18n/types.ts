export type Lang = "en" | "th";

export type Color = {
  color: string;
  hex: string;
};

export type NavCard = {
  title: string;
  description: string;
  image: string;
  link: string;
  accent?: boolean;
};

export type HomeCard = {
  label: string;
  description: string;
  buttonText: string;
  bgColor: string;
  link?: string;
};

export type StatItem = {
  number: string;
  suffix: string;
  title: string;
  desc: string;
  wide: boolean;
};

export type LegacyItem = {
  img: string;
  title: string;
  decs: string;
};

export type ItemOption = {
  label: string;
  title?: string;
  imgDescription: string;
  url?: string;
};

export type ProtectionOption = {
  label: string;
  title: string;
  features: string[];
};

export type CustomizationStep = {
  step: string;
  title: string;
  image?: string;
  content?: string;
  items?: { name: string; desc: string }[];
};

export type RegItem = {
  title: string;
  description: string;
};

export type FooterLink = {
  label: string;
  href: string;
};

export type Translations = {
  // Layout
  "layout.skipToMain": string;

  // Navbar — nav items
  "nav.home": string;
  "nav.products": string;
  "nav.about": string;
  "nav.contact": string;
  "nav.langEn": string;
  "nav.langTh": string;

  // Navbar — mega menu cards (images/links stay in component)
  "nav.mega.home.title": string;
  "nav.mega.home.description": string;
  "nav.mega.armor.title": string;
  "nav.mega.armor.description": string;
  "nav.mega.helmet.title": string;
  "nav.mega.helmet.description": string;
  "nav.mega.plate.title": string;
  "nav.mega.plate.description": string;
  "nav.mega.company.title": string;
  "nav.mega.company.description": string;
  "nav.mega.quality.title": string;
  "nav.mega.quality.description": string;
  "nav.mega.contact.title": string;
  "nav.mega.contact.description": string;

  // Footer
  "footer.contactUs": string;
  "footer.office": string;
  "footer.factory": string;
  "footer.products": string;
  "footer.company": string;
  "footer.copyright": string;
  "footer.credit": string;
  "footer.products.list": string[];
  "footer.company.list": string[];

  // Shared
  "shared.contactBtn": string;
  "shared.exploreProducts": string;
  "shared.learnMore": string;
  "shared.sizesLabel": string;
  "shared.colorLabel": string;
  "shared.certifiedLabel": string;

  // Home page
  "home.hero.quote": string;
  "home.hero.title1": string;
  "home.hero.title2": string;
  "home.hero.ctaExplore": string;
  "home.hero.ctaLearn": string;
  "home.products.title": string;
  "home.products.description": string;
  "home.products.viewBtn": string;
  "home.products.customizeBtn": string;
  "home.cards": HomeCard[];
  "home.team.title": string;
  "home.team.description1": string;
  "home.team.description2": string;
  "home.team.ctaLearn": string;
  "home.partners.title": string;
  "home.partners.description": string;
  "home.carousel.title": string;
  "home.contact.title": string;
  "home.contact.description": string;
  
  // Company page
  "company.intro.title": string;
  "company.intro.description": string;
  "company.legacy.title": string;
  "company.legacy.description": string;
  "company.legacy.items": LegacyItem[];
  "company.aboutUsTitle": string;
  "company.cta.title": string;
  "company.cta.description": string;

  // Stat section
  "stat.title": string;
  "stat.items": StatItem[];

  // Contact page
  "contact.hero.title": string;
  "contact.hero.description": string;
  "contact.form.title": string;
  "contact.form.name": string;
  "contact.form.namePlaceholder": string;
  "contact.form.company": string;
  "contact.form.companyPlaceholder": string;
  "contact.form.email": string;
  "contact.form.emailPlaceholder": string;
  "contact.form.phone": string;
  "contact.form.phonePlaceholder": string;
  "contact.form.enquiry": string;
  "contact.form.enquiryPlaceholder": string;
  "contact.form.submit": string;
  "contact.form.sending": string;
  "contact.form.sent": string;
  "contact.cta.title": string;
  "contact.cta.description": string;
  "contact.cta.btnDescription": string;
  
  // Armour page
  "armour.hero.title": string;
  "armour.hero.description": string;
  "armour.optionsItem.title": string;
  "armour.optionsItem.description": string;
  "armour.options.title": string;
  "armour.options.description": string;
  "armour.customize.title": string;
  "armour.customize.description": string;
  "armour.cta.title": string;
  "armour.cta.description": string;
  "armour.optionsNav": { label: string; anchor: string }[];
  "armour.itemOptions": ItemOption[];
  "armour.protectionOptions": ProtectionOption[];
  "armour.customizationSteps": CustomizationStep[];

  // Helmet page
  "helmet.hero.title": string;
  "helmet.hero.description": string;
  "helmet.options.title": string;
  "helmet.options.description": string;
  "helmet.customize.title": string;
  "helmet.customize.description": string;
  "helmet.cta.title": string;
  "helmet.cta.description": string;
  "helmet.optionsNav": { label: string; anchor: string }[];
  "helmet.itemOptions": ItemOption[];
  "helmet.customizationSteps": CustomizationStep[];

  // Plate page
  "plate.hero.title": string;
  "plate.hero.description": string;
  "plate.options.title": string;
  "plate.options.description": string;
  "plate.reg.title": string;
  "plate.reg.description": string;
  "plate.reg.specTitle": string;
  "plate.reg.colClass": string;
  "plate.reg.colAmmo": string;
  "plate.reg.colWeight": string;
  "plate.reg.colMaterial": string;
  "plate.reg.colStandard": string;
  "plate.reg.colPremium": string;
  "plate.reg.theRegulation": string;
  "plate.reg.compliance": string;
  "plate.regItems": RegItem[];
  "plate.customize.title": string;
  "plate.customize.description": string;
  "plate.cta.title": string;
  "plate.cta.description": string;
  "plate.optionsNav": { label: string; anchor: string }[];
  "plate.itemOptions": ItemOption[];
  "plate.customizationSteps": CustomizationStep[];
};
