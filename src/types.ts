export type ItemType = 'product' | 'service' | 'account';

export interface BaseCatalogItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price?: number; // Price in ETB (if applicable)
  priceLabel?: string; // Optional custom price display
  image: string; // URL or representation
  images?: string[]; // Multiple images for slider gallery
  tags?: string[];
}

export interface PhoneSpecs {
  brand: string;
  model: string;
  storage?: string;
  ram?: string;
  battery?: string;
  camera?: string;
  colors?: string[];
}

export interface ProductItem extends BaseCatalogItem {
  type: 'product';
  brand: string;
  specs?: PhoneSpecs;
  availability: 'In Stock' | 'Out of Stock' | 'Pre-order';
  specsList?: { label: string; value: string }[];
}

export interface ServiceItem extends BaseCatalogItem {
  type: 'service';
  estimatedTime?: string;
  features?: string[];
}

export type CatalogItem = ProductItem | ServiceItem;

export interface BankAccount {
  id: string;
  holder: 'Yishak Eyasu Tesema' | 'Tigilu Eyasu Tesema';
  bankName: string;
  accountNumber: string;
  colorTheme: string; // Tailwind class background
  textColor: string; // Tailwind class text
  logoHex: string; // Hex color for bank logo banner
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ReviewItem {
  id: string;
  username: string;
  rating: number;
  comment: string;
  serviceUsed: string;
  date: string;
}

export interface ActiveViewState {
  view: 'home' | 'category' | 'detail' | 'bookmarks' | 'search';
  categorySlug?: string;
  itemId?: string;
}
