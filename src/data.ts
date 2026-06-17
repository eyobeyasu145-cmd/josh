import { CatalogItem, BankAccount, FAQItem, ReviewItem } from './types';

export const CATEGORIES = [
  { slug: 'payment-accounts', name: 'Bank & Transfer', icon: 'CreditCard', description: 'Josh official payment accounts' },
  { slug: 'printing-services', name: 'Printing & Design', icon: 'Printer', description: 'Professional document and printing services' },
  { slug: 'button-phones', name: 'Button Phones', icon: 'Dialpad', description: 'Simple, durable, and reliable basic phones' },
  { slug: 'smartphones', name: 'Smartphones', icon: 'Smartphone', description: 'Latest standard smartphones with high specs' },
  { slug: 'repair-services', name: 'Phone Repairs', icon: 'Wrench', description: 'Expert hardware fixing and system software tuning' },
  { slug: 'electronics-accessories', name: 'Accessories', icon: 'Headphones', description: 'Chargers, adapters, earphones & electronics' },
  { slug: 'electrical-materials', name: 'Electrical Materials', icon: 'Zap', description: 'Premium electrical wires and switches' },
  { slug: 'movies-entertainment', name: 'Movies & Media', icon: 'Film', description: 'HD single and series movies translated into Amharic' },
  { slug: 'mobile-app-services', name: 'App & Custom Account Services', icon: 'AppWindow', description: 'Phone account setup, restore, and transfer' }
];

export const BANK_ACCOUNTS: BankAccount[] = [
  // Yishak Eyasu Tesema Accounts
  {
    id: 'ba-y1',
    holder: 'Yishak Eyasu Tesema',
    bankName: 'Abyssinia Bank',
    accountNumber: '206540648',
    colorTheme: 'from-amber-600 to-amber-800',
    textColor: 'text-amber-50',
    logoHex: '#E29712'
  },
  {
    id: 'ba-y2',
    holder: 'Yishak Eyasu Tesema',
    bankName: 'Awash Bank',
    accountNumber: '012320144859100',
    colorTheme: 'from-blue-700 to-indigo-900',
    textColor: 'text-blue-50',
    logoHex: '#084FA2'
  },
  {
    id: 'ba-y3',
    holder: 'Yishak Eyasu Tesema',
    bankName: 'Dashen Bank',
    accountNumber: '54003204479011',
    colorTheme: 'from-sky-700 to-sky-900',
    textColor: 'text-sky-50',
    logoHex: '#14B8A6'
  },
  {
    id: 'ba-y4',
    holder: 'Yishak Eyasu Tesema',
    bankName: 'Commercial Bank of Ethiopia',
    accountNumber: '1000536182601',
    colorTheme: 'from-purple-800 to-indigo-950',
    textColor: 'text-purple-50',
    logoHex: '#6B21A8'
  },
  {
    id: 'ba-y5',
    holder: 'Yishak Eyasu Tesema',
    bankName: 'Telebirr',
    accountNumber: '0964140000',
    colorTheme: 'from-emerald-600 to-teal-800',
    textColor: 'text-emerald-50',
    logoHex: '#10B981'
  },
  // Tigilu Eyasu Tesema Accounts
  {
    id: 'ba-t1',
    holder: 'Tigilu Eyasu Tesema',
    bankName: 'Commercial Bank of Ethiopia',
    accountNumber: '1000372365734',
    colorTheme: 'from-indigo-800 to-purple-950',
    textColor: 'text-indigo-50',
    logoHex: '#6B21A8'
  }
];

export const CATALOG_ITEMS: CatalogItem[] = [
  // Category 2: Printing & Editing Services
  {
    id: 'print-1',
    type: 'service',
    name: 'Black & White Printing',
    category: 'printing-services',
    description: 'High-speed, crisp black and white printing for assignments, books, documents, and reports.',
    price: 5,
    priceLabel: '5 ETB / page',
    image: 'https://images.unsplash.com/photo-1563223552-30d01fda3ea6?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1563223552-30d01fda3ea6?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=600&auto=format&fit=crop'
    ],
    features: ['Double-sided option available', '80gsm high quality paper', 'Instant pickup', 'PDF, Word, or Image source files accepted'],
    tags: ['B&W', 'Print', 'Documents']
  },
  {
    id: 'print-2',
    type: 'service',
    name: 'Color Printing',
    category: 'printing-services',
    description: 'Premium vibrantly-colored laser printing for graphics, photos, booklets, certificates, and school projects.',
    price: 25,
    priceLabel: '25 ETB / page',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=600&auto=format&fit=crop'
    ],
    features: ['Vivid laser ink technology', 'Glossy or matte photo paper option', 'Perfect calibration for photographs'],
    tags: ['Color', 'Premium', 'Graphics']
  },
  {
    id: 'print-3',
    type: 'service',
    name: 'Laminating',
    category: 'printing-services',
    description: 'Protect your valuable certificates, ID cards, agreements, and licenses from water, dirt, and aging.',
    price: 50,
    priceLabel: '50 ETB / document',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=600&auto=format&fit=crop'],
    features: ['Waterproof heat seals', 'Thick protective military-grade layers', 'Anti-tear design'],
    tags: ['Laminate', 'Certificate', 'Protection']
  },
  {
    id: 'print-4',
    type: 'service',
    name: 'Document Editing',
    category: 'printing-services',
    description: 'Complete text formulation, layout structure adjustment, and formatting in MS Word, PowerPoint, or Excel.',
    price: 150,
    priceLabel: 'From 150 ETB',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop'],
    features: ['CV/Resume design', 'Academic paper styling', 'Amharic keyboard typing and editing'],
    tags: ['Edit', 'Word', 'Typing']
  },
  {
    id: 'print-5',
    type: 'service',
    name: 'Birthday Card Writing',
    category: 'printing-services',
    description: 'Express your feelings with elegantly crafted, custom written messages and artistic greeting templates.',
    price: 100,
    priceLabel: '100 ETB / card',
    image: 'https://images.unsplash.com/photo-1513201099715-bc7297da23af?q=80&w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1513201099715-bc7297da23af?q=80&w=600&auto=format&fit=crop'],
    features: ['Customized warm greetings', 'Elegantly chosen font themes', 'Add personalized graphics/portraits'],
    tags: ['Birthday', 'Card', 'Wish']
  },
  {
    id: 'print-6',
    type: 'service',
    name: 'Invitation Card Design',
    category: 'printing-services',
    description: 'Elegant graphic designs for weddings, graduations, corporate gatherings, and spiritual events.',
    price: 350,
    priceLabel: 'From 350 ETB',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=600&auto=format&fit=crop'
    ],
    features: ['High-resolution digital templates', 'Print-ready formats', 'Theme coordination', 'Amharic & English texts'],
    tags: ['Invitation', 'Wedding', 'Graduation']
  },
  {
    id: 'print-7',
    type: 'service',
    name: 'Business Card Design',
    category: 'printing-services',
    description: 'Make a stellar first impression with a modern, high-contrast visual identity on your business card.',
    price: 250,
    priceLabel: '250 ETB (Design fee)',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2959d43?q=80&w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1521791136064-7986c2959d43?q=80&w=600&auto=format&fit=crop'],
    features: ['Modern minimalist layouts', 'Includes printable PDF and vector assets', 'QR Code integration optionally included'],
    tags: ['Business Card', 'Design', 'Corporate']
  },
  {
    id: 'print-8',
    type: 'service',
    name: 'Flyer Design',
    category: 'printing-services',
    description: 'High-impact advertising leaflets and social media posters to boost your retail store, event, or services.',
    price: 400,
    priceLabel: 'From 400 ETB',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop'],
    features: ['Highly eye-catching graphics', 'Fully formatted for print and digital distribution', 'Custom color themes matching brand logo'],
    tags: ['Flyer', 'Ads', 'Marketing']
  },
  {
    id: 'print-9',
    type: 'service',
    name: 'Certificate Editing & Design',
    category: 'printing-services',
    description: 'Modification, correction, or initial structure framing for training and honorary certificates.',
    price: 200,
    priceLabel: 'From 200 ETB',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop'],
    features: ['Font restoration', 'Lossless background edits', 'Corporate emblem layout fixes'],
    tags: ['Certificate', 'Edit', 'Design']
  },
  {
    id: 'print-10',
    type: 'service',
    name: 'Custom Text Writing',
    category: 'printing-services',
    description: 'Bespoke letter writing, application letter drafting, and text development services.',
    price: 150,
    priceLabel: 'From 150 ETB',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600&auto=format&fit=crop'],
    features: ['Official bureaucratic tone', 'Correct syntax & layout', 'Amharic & English composition'],
    tags: ['Letter', 'Typing', 'Official']
  },

  // Category 3: Button Phones
  {
    id: 'bp-1',
    type: 'product',
    name: 'Itel Super Dial',
    category: 'button-phones',
    brand: 'Itel',
    description: 'Legendary battery life with structural casing. Perfect as a primary calling companion or emergency standby device.',
    price: 1650,
    image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop'
    ],
    availability: 'In Stock',
    specs: {
      brand: 'Itel',
      model: 'Super Dial',
      battery: '1900 mAh with super power-saving chip (lasts up to 14 days)',
      camera: 'VGA Digital Camera with Flash',
      colors: ['Black', 'Navy Blue', 'Silver Gold']
    },
    specsList: [
      { label: 'Battery', value: '1900 mAh (14 days standby)' },
      { label: 'SIM Support', value: 'Dual SIM Standby' },
      { label: 'Flashlight', value: 'Bright Triple LED torch' },
      { label: 'Audio', value: 'Wireless FM Radio, MP3' }
    ],
    tags: ['Itel', 'Long Battery', 'Dual SIM']
  },
  {
    id: 'bp-2',
    type: 'product',
    name: 'Bontel Rock Star',
    category: 'button-phones',
    brand: 'Bontel',
    description: 'Fitted with giant premium back-facing acoustic speaker boxes. Built for music lovers who appreciate a crisp, loud sound everywhere.',
    price: 1450,
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=600&auto=format&fit=crop'],
    availability: 'In Stock',
    specs: {
      brand: 'Bontel',
      model: 'Rock Star Ultra',
      battery: '1600 mAh',
      colors: ['Classic Red', 'Black Chrome']
    },
    specsList: [
      { label: 'Speaker', value: 'Extremely Loud 3D Speaker' },
      { label: 'SIM Card', value: 'Dual SIM support' },
      { label: 'Special features', value: 'Bluetooth speaker mode' }
    ],
    tags: ['Bontel', 'Speaker', 'Music']
  },
  {
    id: 'bp-3',
    type: 'product',
    name: 'Infinix Mini Pro',
    category: 'button-phones',
    brand: 'Infinix',
    description: 'A stylish, sleek basic caller featuring keycaps with clean visual aesthetics and premium plastic build design.',
    price: 1950,
    image: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=600&auto=format&fit=crop'],
    availability: 'In Stock',
    specs: {
      brand: 'Infinix',
      model: 'Mini Pro Button',
      battery: '1800 mAh',
      colors: ['Deep Gold', 'Midnight Black']
    },
    specsList: [
      { label: 'Design', value: 'Ultra Slim Profile' },
      { label: 'Display', value: '2.4 inches High Contrast Screen' },
      { label: 'Storage', value: 'MicroSD expansion up to 32GB' }
    ],
    tags: ['Infinix', 'Sleek', 'Golden']
  },
  {
    id: 'bp-4',
    type: 'product',
    name: 'JS Warrior Rugged',
    category: 'button-phones',
    brand: 'JS',
    description: 'Heavy duty, impact resistant external structure frame. Crafted for constructors, outdoor adventurers, and heavy environments.',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1565538810844-16d133679152?q=80&w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1565538810844-16d133679152?q=80&w=600&auto=format&fit=crop'],
    availability: 'In Stock',
    specs: {
      brand: 'JS',
      model: 'Warrior P9',
      battery: '3000 mAh mega battery with Powerbank output port',
      colors: ['Arid Jungle Camo', 'Tactical Charcoal']
    },
    specsList: [
      { label: 'Battery', value: '3000 mAh (Acts as a Powerbank)' },
      { label: 'Durability', value: 'Rubber Shockproof frame' },
      { label: 'Torch', value: 'Searchlight-grade LED lens' }
    ],
    tags: ['JS', 'Rugged', 'Powerbank', 'Flashlight']
  },
  {
    id: 'bp-5',
    type: 'product',
    name: 'X-Oda Classic Gold',
    category: 'button-phones',
    brand: 'X-Oda',
    description: 'Gold metal plated keyboard trims. Gives the classic look of traditional premium vintage executive phones.',
    price: 1550,
    image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=600&auto=format&fit=crop'],
    availability: 'In Stock',
    specs: {
      brand: 'X-Oda',
      model: 'M8 Gold Line',
      battery: '1400 mAh',
      colors: ['Luxury Gold', 'Platinum Black']
    },
    specsList: [
      { label: 'Material', value: 'Aluminum details and durable plastic keys' },
      { label: 'Voice', value: 'Magic Voice Changer built-in' }
    ],
    tags: ['X-Oda', 'Gold', 'Classic']
  },
  {
    id: 'bp-6',
    type: 'product',
    name: 'Samhe Lite Easy',
    category: 'button-phones',
    brand: 'Samhe',
    description: 'Extra large layout keycaps with massive voice-narrating keypad. Specifically designed for senior citizens and visual ease.',
    price: 1400,
    image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=600&auto=format&fit=crop'],
    availability: 'In Stock',
    specs: {
      brand: 'Samhe',
      model: 'Senior Comfort S1',
      battery: '1500 mAh',
      colors: ['White Grey', 'Dark Blue']
    },
    specsList: [
      { label: 'Keypads', value: 'Jumbo Size Backlit Keys' },
      { label: 'Sound', value: 'Loud voice announcement for dial digits' },
      { label: 'SOS', value: 'One-touch rear SOS alarm button' }
    ],
    tags: ['Samhe', 'Senior Friendly', 'Large Keys']
  },
  {
    id: 'bp-7',
    type: 'product',
    name: 'Guava Pocket Mate',
    category: 'button-phones',
    brand: 'Guava',
    description: 'Super compact card-sized cell phone that easily slides into a minimal front pocket. Ideal secondary phone.',
    price: 1700,
    image: 'https://images.unsplash.com/photo-151174900202f-d6f1dd19fc82?q=80&w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-151174900202f-d6f1dd19fc82?q=80&w=600&auto=format&fit=crop'],
    availability: 'Pre-order',
    specs: {
      brand: 'Guava',
      model: 'Nano G1',
      battery: '1100 mAh',
      colors: ['Ice Mint', 'Dark Charcoal']
    },
    specsList: [
      { label: 'Size', value: 'Credit card size (Thickness only 9.5mm)' },
      { label: 'Display', value: '1.8 inches OLED color screen' }
    ],
    tags: ['Guava', 'Nano', 'Miniature']
  },

  // Category 4: Smartphones (Tecno, Samsung, Infinix)
  {
    id: 'sp-t1',
    type: 'product',
    name: 'Tecno Spark 10',
    category: 'smartphones',
    brand: 'Tecno',
    description: 'Stunning premium photography powerhouse with a high resolution rear lens sensor and beautiful circular rear glass camera array layout.',
    price: 9400,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop'
    ],
    availability: 'In Stock',
    specs: {
      brand: 'Tecno',
      model: 'Spark 10',
      storage: '128 GB ROM',
      ram: '8 GB (4GB Virtual expanded)',
      battery: '5000 mAh with 18W Fast Charge support',
      camera: '50 MP Dual Rear Camera with clear Night Mode, 8MP Front Selfie',
      colors: ['Meta Black', 'Blue Dream', 'Opal White']
    },
    specsList: [
      { label: 'Processer', value: 'MediaTek Helio G37 Gaming Octa-Core' },
      { label: 'Screen', value: '6.6 inches HD+ IPS screen with fluid 90Hz refresh rate' },
      { label: 'OS', value: 'HiOS 12 based on Android 13' }
    ],
    tags: ['Tecno', 'Spark 10', '50MP Camera']
  },
  {
    id: 'sp-t2',
    type: 'product',
    name: 'Tecno Spark 20',
    category: 'smartphones',
    brand: 'Tecno',
    description: 'Upgraded modern dynamic screen hole design module, powerful processors and outstanding sound technology.',
    price: 11800,
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=600&auto=format&fit=crop'],
    availability: 'In Stock',
    specs: {
      brand: 'Tecno',
      model: 'Spark 20',
      storage: '256 GB ROM',
      ram: '16 GB RAM (8GB+8GB Virtual)',
      battery: '5000 mAh, 18W USB-C pump',
      camera: '50MP Ultra-clear Main lens + Dual LED, 32MP Front Glow Selfie',
      colors: ['Gravity Black', 'Cyber White', 'Magic Skin Green']
    },
    specsList: [
      { label: 'Processor', value: 'MediaTek Helio G85 Turbo Gaming Chip' },
      { label: 'Audio', value: 'Stereo Dual Speaker with DTS 400% loudness booster' },
      { label: 'Security', value: 'Side fingerprint reader and face ID unlock' }
    ],
    tags: ['Tecno', 'Spark 20', '256GB Storage']
  },
  {
    id: 'sp-t3',
    type: 'product',
    name: 'Tecno Spark 30 Pro',
    category: 'smartphones',
    brand: 'Tecno',
    description: 'The latest ultimate next-generation design featuring an incredibly thin outline bezel, robust scratch glass, and ultra bright AMOLED screen technology.',
    price: 15400,
    image: 'https://images.unsplash.com/photo-1610940882244-aa9aa61a0180?q=80&w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1610940882244-aa9aa61a0180?q=80&w=600&auto=format&fit=crop'],
    availability: 'In Stock',
    specs: {
      brand: 'Tecno',
      model: 'Spark 30 Pro',
      storage: '256 GB NVMe Class',
      ram: '16 GB High Speed LPDDR4x (8GB+8GB)',
      battery: '5000 mAh with ultra-fast 33W charge standard',
      camera: '108 MP Ultra Portrait Lens with AI detail enhancer, 32MP Front',
      colors: ['Stellar Silver', 'Astral Dark', 'Transformers Limited Edition']
    },
    specsList: [
      { label: 'Screen', value: '6.78 inches FHD+ Eye-care AMOLED panel, fluid 120Hz refresh' },
      { label: 'Chipset', value: 'MediaTek Helio G100 (6nm energy-saving)' },
      { label: 'Sound', value: 'Dual High-Res audio certified stereo system' }
    ],
    tags: ['Tecno', 'Spark 30', '108MP Camera', 'AMOLED']
  },
  {
    id: 'sp-t4',
    type: 'product',
    name: 'Tecno Pop 8',
    category: 'smartphones',
    brand: 'Tecno',
    description: 'Budget-friendly masterpiece featuring standard essential features and a beautifully interactive upper notch bar.',
    price: 6800,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop'],
    availability: 'In Stock',
    specs: {
      brand: 'Tecno',
      model: 'Pop 8',
      storage: '64 GB ROM',
      ram: '4 GB (2GB+2GB)',
      battery: '5000 mAh',
      camera: '13MP Dual Al Lens with dual-flash light, 8MP Selfie Dual-lights',
      colors: ['Mystery White', 'Alpenglow Gold', 'Gravity Black']
    },
    specsList: [
      { label: 'Display', value: '6.6 inches 90Hz interactive dynamic port hole' },
      { label: 'Sound', value: 'Premium Dual-Speaker' },
      { label: 'Port', value: 'USB Type-C port standard' }
    ],
    tags: ['Tecno', 'Pop Series', 'Budget']
  },
  {
    id: 'sp-s1',
    type: 'product',
    name: 'Samsung Galaxy A10',
    category: 'smartphones',
    brand: 'Samsung',
    description: 'Reliable and durable entry tier model from Samsung. Trusted build, optimized battery, and intuitive UI.',
    price: 5200,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop'],
    availability: 'In Stock',
    specs: {
      brand: 'Samsung',
      model: 'Galaxy A10',
      storage: '32 GB ROM',
      ram: '2 GB',
      battery: '3400 mAh',
      camera: '13 MP Back Camera, 5 MP Front',
      colors: ['Charcoal Black', 'Ocean Blue', 'Ruby Red']
    },
    specsList: [
      { label: 'Screen', value: '6.2 inches Infinity-V HD+ display' },
      { label: 'OS', value: 'Android with upgradable Samsung One UI' }
    ],
    tags: ['Samsung', 'Entry Level', 'A10']
  },
  {
    id: 'sp-s2',
    type: 'product',
    name: 'Samsung Galaxy A16',
    category: 'smartphones',
    brand: 'Samsung',
    description: 'A stellar choice featuring superb triple cameras, clean structural backing, and ultra sharp Super AMOLED color fidelity.',
    price: 11000,
    image: 'https://images.unsplash.com/photo-1565630916779-e303be97b6f5?q=80&w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1565630916779-e303be97b6f5?q=80&w=600&auto=format&fit=crop'],
    availability: 'In Stock',
    specs: {
      brand: 'Samsung',
      model: 'Galaxy A16',
      storage: '128 GB ROM',
      ram: '6 GB LPDDR4x',
      battery: '5000 mAh with ultra 25W standard charging',
      camera: '50 MP High Res Triple-camera block, 13MP ultra selfie lens',
      colors: ['Light Green', 'Graphite Black', 'Gold Yellow']
    },
    specsList: [
      { label: 'Screen', value: '6.5 inches Full HD+ Super AMOLED, fluid 90Hz display' },
      { label: 'Main Chip', value: 'Samsung Exynos Octa Core' }
    ],
    tags: ['Samsung', 'A16', 'Super AMOLED']
  },
  {
    id: 'sp-s3',
    type: 'product',
    name: 'Samsung Galaxy A20',
    category: 'smartphones',
    brand: 'Samsung',
    description: 'Beloved classic mid-ranger with a wonderful ultra-wide rear camera secondary option and durable high-gloss glastic shell.',
    price: 6400,
    image: 'https://images.unsplash.com/photo-1573148195900-7845dcb9b127?q=80&w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1573148195900-7845dcb9b127?q=80&w=600&auto=format&fit=crop'],
    availability: 'In Stock',
    specs: {
      brand: 'Samsung',
      model: 'Galaxy A20',
      storage: '32 GB ROM',
      ram: '3 GB',
      battery: '4000 mAh',
      camera: '13MP Main + 5MP Ultra-Wide dual set, 8MP Selfie',
      colors: ['Midnight Black', 'Deep Navy Blue']
    },
    specsList: [
      { label: 'Screen', value: '6.4 inches Super AMOLED vibrant HD+ screen' },
      { label: 'Biometrics', value: 'Rear fingerprint sensor standard' }
    ],
    tags: ['Samsung', 'A20', 'Ultra-Wide Camera']
  },
  {
    id: 'sp-s4',
    type: 'product',
    name: 'Samsung Galaxy A30',
    category: 'smartphones',
    brand: 'Samsung',
    description: 'High resolution FHD screen standard and gorgeous thin bezel. Ideal for consuming high definition multimedia and streaming.',
    price: 7800,
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=600&auto=format&fit=crop'],
    availability: 'In Stock',
    specs: {
      brand: 'Samsung',
      model: 'Galaxy A30',
      storage: '64 GB ROM',
      ram: '4 GB',
      battery: '4000 mAh',
      camera: '16MP Main + 5MP Ultra-wide, 16MP High Detail Selfie',
      colors: ['Glacier White', 'Prism Black', 'Satin Blue']
    },
    specsList: [
      { label: 'Screen', value: '6.4 inches Full HD+ Super AMOLED screen' },
      { label: 'Charging', value: '15W Fast Charge technology supported' }
    ],
    tags: ['Samsung', 'A30', 'FHD Screen']
  },
  {
    id: 'sp-s5',
    type: 'product',
    name: 'Samsung Galaxy A50',
    category: 'smartphones',
    brand: 'Samsung',
    description: 'Features a luxurious in-display fingerprint unlock scanner, high-grade cinematic cameras and a metallic glossy finish.',
    price: 9800,
    image: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?q=80&w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1564466809058-bf4114d55352?q=80&w=600&auto=format&fit=crop'],
    availability: 'Out of Stock',
    specs: {
      brand: 'Samsung',
      model: 'Galaxy A50',
      storage: '128 GB ROM',
      ram: '6 GB',
      battery: '4000 mAh',
      camera: '25MP Main + 8MP Wide + 5MP Depth triple lenses, 25MP Front',
      colors: ['Satin Prism Blue', 'Prism Black', 'Prism White']
    },
    specsList: [
      { label: 'Unlock', value: 'Optical In-display fingerprint sensor' },
      { label: 'Chipset', value: 'Samsung Exynos 9610 High-Tier processor' }
    ],
    tags: ['Samsung', 'A50', 'Premium Midrange']
  },
  {
    id: 'sp-i1',
    type: 'product',
    name: 'Infinix Smart 8',
    category: 'smartphones',
    brand: 'Infinix',
    description: 'Highly competitive value entry phone featuring an interactive notifications portal and elegant crystal-texture back cover.',
    price: 7600,
    image: 'https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07?q=80&w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07?q=80&w=600&auto=format&fit=crop'],
    availability: 'In Stock',
    specs: {
      brand: 'Infinix',
      model: 'Smart 8 Pro',
      storage: '128 GB ROM',
      ram: '8 GB (4GB+4GB expanded)',
      battery: '5000 mAh with ultra-energy mode',
      camera: '50 MP Dual Al Camera with ring LED flash, 8MP Selfie',
      colors: ['Timber Black', 'Shiny Gold', 'Galaxy White']
    },
    specsList: [
      { label: 'Screen', value: '6.6 inches 90Hz fluid punch-hole display with Magic Ring' },
      { label: 'Sound', value: 'Volume booster up to 200% with DTS technology' }
    ],
    tags: ['Infinix', 'Smart 8', 'Value Champion']
  },
  {
    id: 'sp-i2',
    type: 'product',
    name: 'Infinix Hot 40 Pro',
    category: 'smartphones',
    brand: 'Infinix',
    description: 'Unbelievable gaming performer inside a entry flagship budget. Equipped with responsive touch triggers and customized cooling.',
    price: 13900,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop'],
    availability: 'In Stock',
    specs: {
      brand: 'Infinix',
      model: 'Hot 40 Pro Gaming',
      storage: '256 GB ROM',
      ram: '16 GB RAM (8GB+8GB Virtual)',
      battery: '5000 mAh with 33W Fast-charge standard adapter included',
      camera: '108 MP Ultra Portrait triple camera system, 32MP Front Glow',
      colors: ['Palm Blue', 'Horizon Gold', 'Starfall Green']
    },
    specsList: [
      { label: 'Processor', value: 'MediaTek Helio G99 Ultra Power Gaming chip (6nm)' },
      { label: 'Display', value: '6.78 inches FHD+ with super fluid 120Hz refresh speed' },
      { label: 'Motor', value: 'Custom X-axis linear motor vibe for realism' }
    ],
    tags: ['Infinix', 'Hot Series', '108MP Camera', 'Gaming']
  },
  {
    id: 'sp-i3',
    type: 'product',
    name: 'Infinix Note 40',
    category: 'smartphones',
    brand: 'Infinix',
    description: 'Ultimate tech milestone introducing magnetic wireless charging pads to the high value tier. Complete bezel-free curved experience.',
    price: 16800,
    image: 'https://images.unsplash.com/photo-1610940882244-aa9aa61a0180?q=80&w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1610940882244-aa9aa61a0180?q=80&w=600&auto=format&fit=crop'],
    availability: 'Pre-order',
    specs: {
      brand: 'Infinix',
      model: 'Note 40',
      storage: '256 GB ROM',
      ram: '16 GB RAM (LPDDR4x expanded)',
      battery: '5000 mAh with extreme 45W Safe Charge & 20W Wireless MagCharge',
      camera: '108 MP Super Zoom Triple Rear Camera system, 32MP Selfie',
      colors: ['Titan Gold', 'Obsidian Black']
    },
    specsList: [
      { label: 'Charging Chip', value: 'In-house Cheetah X1 power management unit' },
      { label: 'Screen', value: '120Hz flag-tier 3D Curved AMOLED with in-display fingerprint' },
      { label: 'Sound', value: 'Immersive sound professionally tuned by JBL' }
    ],
    tags: ['Infinix', 'Note Series', 'Wireless Charging', 'JBL Audio']
  },

  // Category 5: Phone Repair Services (Custom and specified with strict prices)
  {
    id: 'rep-h1',
    type: 'service',
    name: 'Charging Port Replacement',
    category: 'repair-services',
    description: 'Does your phone drop connection during charging? We replace loose or damaged charging sockets with original copper pins.',
    price: 150,
    priceLabel: '150 ETB',
    image: 'https://images.unsplash.com/photo-1601524909162-be87252be298?q=80&w=600&auto=format&fit=crop',
    estimatedTime: '30 - 45 mins',
    features: ['Original Type-C / Micro-USB pins used', 'Secure micro-soldered stability tests', 'Clean structural dust extraction included'],
    tags: ['Hardware', 'Port', 'Charging']
  },
  {
    id: 'rep-h2',
    type: 'service',
    name: 'Microphone Replacement',
    category: 'repair-services',
    description: 'Solve voice cutout issues completely. If callers cannot hear your voice clearly, we replace your analog or digital mic.',
    price: 100,
    priceLabel: '100 ETB',
    image: 'https://images.unsplash.com/photo-1540340144555-e6d3a707a9a1?q=80&w=600&auto=format&fit=crop',
    estimatedTime: '30 mins',
    features: ['Ultra-clear static-free micro modules', 'Thorough protective grid filter cleaning', 'Test call quality checks'],
    tags: ['Hardware', 'Microphone', 'Voice']
  },
  {
    id: 'rep-h3',
    type: 'service',
    name: 'Speaker Replacement',
    category: 'repair-services',
    description: 'Fix raspy, low-volume, or completely distorted audio outputs on your device receiver or primary speaker.',
    price: 200,
    priceLabel: '200 ETB',
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=600&auto=format&fit=crop',
    estimatedTime: '40 mins',
    features: ['High-decibel replacement drivers', 'Dual speaker balancing options', 'Debris filter mesh renewal'],
    tags: ['Hardware', 'Speaker', 'Audio']
  },
  {
    id: 'rep-h4',
    type: 'service',
    name: 'Screen Replacement',
    category: 'repair-services',
    description: 'Fix cracked covers, non-functioning touch panels, or completely blacked-out bleeding LCD/AMOLED screens.',
    price: 3000,
    priceLabel: 'From 3000 ETB',
    image: 'https://images.unsplash.com/photo-1601524909162-be87252be298?q=80&w=600&auto=format&fit=crop',
    estimatedTime: '1 - 2 hours',
    features: ['Vibrant color output calibration', 'Seamless adhesive bezel sealing', 'Complimentary tempered glass installed', 'Multi-touch accuracy tests'],
    tags: ['Hardware', 'Screen', 'Display']
  },
  {
    id: 'rep-h5',
    type: 'service',
    name: 'Board Repair (IC & Power Fix)',
    category: 'repair-services',
    description: 'Advanced logical repairs for dead circuits, shorted motherboard ICs, water damage, or immediate power failures.',
    priceLabel: 'Quotation-based',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop',
    estimatedTime: '1 - 2 days',
    features: ['Precision thermal motherboard mapping', 'SMD component hot-air microscope re-soldering', 'Detailed power intake logs'],
    tags: ['Hardware', 'Motherboard', 'IC', 'Water Damage']
  },
  {
    id: 'rep-h6',
    type: 'service',
    name: 'Keyboard Repair',
    category: 'repair-services',
    description: 'Revive stuck, non-responsive, or physically missing keys on your vintage, simple, or button phone keypads.',
    priceLabel: 'From 150 ETB',
    image: 'https://images.unsplash.com/photo-1541140111813-8222e9d90981?q=80&w=600&auto=format&fit=crop',
    estimatedTime: '30 mins',
    features: ['Under-key rubber carbon dome restoration', 'Thorough tactile click cleaning', 'Entire keycap sheet replacement option'],
    tags: ['Hardware', 'Keypad', 'Buttons']
  },
  {
    id: 'rep-h7',
    type: 'service',
    name: 'Memory Card Slot Repair',
    category: 'repair-services',
    description: 'Fix card parsing problems. Repair broken microSD spring locks, loose pins, or fully replace the solder ports.',
    priceLabel: 'From 200 ETB',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop',
    estimatedTime: '1 hour',
    features: ['Spring socket alignment', 'Micro pin clean-up', 'Instant mounting read-write speed verify'],
    tags: ['Hardware', 'Storage', 'microSD']
  },
  {
    id: 'rep-s1',
    type: 'service',
    name: 'App Installation & System Setup',
    category: 'repair-services',
    description: 'Complete loading of utility, learning, banking, and amusement applications onto your new or formatted smartphone.',
    price: 150,
    priceLabel: '150 ETB',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=600&auto=format&fit=crop',
    estimatedTime: '20 mins',
    features: ['Certified APK binaries downloaded offline to save your internet data', 'Essential social suites pre-optimized', 'No viruses or intrusive advertisements'],
    tags: ['Software', 'Setup', 'Apps']
  },
  {
    id: 'rep-s2',
    type: 'service',
    name: 'Data Transfer & Secure Backup',
    category: 'repair-services',
    description: 'Seamless migration of your entire catalog of contacts, photo gallery albums, SMS texts, and personal documents from old phones to new ones.',
    price: 200,
    priceLabel: '200 ETB',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop',
    estimatedTime: '30 mins',
    features: ['Cross-platform transition support (iOS to Android, Button to Smart)', 'No compression of original camera snaps', 'We create offline backups optionally encrypting your folders'],
    tags: ['Software', 'Backup', 'Contacts']
  },
  {
    id: 'rep-s3',
    type: 'service',
    name: 'Device Hard Reset',
    category: 'repair-services',
    description: 'Stuck on the boot logo screen? Forgotten password lock block? We cleanly wipe cash stacks to restore standard native out-of-box speeds.',
    price: 300,
    priceLabel: '300 ETB',
    image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=600&auto=format&fit=crop',
    estimatedTime: '20 mins',
    features: ['Recovery mode hardware overrides', 'Entire virus layer sanitization', 'System refresh parameters'],
    tags: ['Software', 'Reset', 'Unlock']
  },
  {
    id: 'rep-s4',
    type: 'service',
    name: 'System Software Update',
    category: 'repair-services',
    description: 'Download and safely flash the newest official firmware patches, system optimizations, and secure security frameworks.',
    priceLabel: 'From 250 ETB',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=600&auto=format&fit=crop',
    estimatedTime: '1 hour',
    features: ['Official manufacturer factory flash files', 'Safe system checks to prevent bricking', 'Complete stability diagnostics post-install'],
    tags: ['Software', 'Update', 'Flash']
  },
  {
    id: 'rep-a1',
    type: 'service',
    name: 'Phone Cover Installation & Perfect Fit',
    category: 'repair-services',
    description: 'Premium shockproof phone cases carefully sized, formatted, and snap-aligned to suit your exact phone chassis layout.',
    price: 200,
    priceLabel: '200 ETB',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=600&auto=format&fit=crop',
    estimatedTime: '5 mins',
    features: ['Heavy-duty drop-protection bumpers', 'Perfect physical cutout holes for charging ports', 'Smooth button press keypads'],
    tags: ['Accessories', 'Installation', 'Case']
  },
  {
    id: 'rep-a2',
    type: 'service',
    name: 'Tempered Glass Installation',
    category: 'repair-services',
    description: 'Keep your expensive main glass crackproof. We clean the display to static perfection, applying high-gloss 9H-tempered armor slides.',
    price: 250,
    priceLabel: '250 ETB',
    image: 'https://images.unsplash.com/photo-1610940882244-aa9aa61a0180?q=80&w=600&auto=format&fit=crop',
    estimatedTime: '10 mins',
    features: ['Micro-dust particle vacuuming before placement', 'Zero air bubbles guaranteed', 'Oleophobic coating to repel fingers'],
    tags: ['Accessories', 'Glass', 'Protection']
  },

  // Category 6: Electronics Accessories (Chargers, Cables, etc.)
  {
    id: 'acc-1',
    type: 'product',
    name: 'Josh Super Fast Charger Set',
    category: 'electronics-accessories',
    brand: 'Generic Premium',
    description: 'Safe dual-port 45W adaptive charger. Automatically senses your device battery resistance to push maximum power output safely.',
    price: 450,
    image: 'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=600&auto=format&fit=crop',
    availability: 'In Stock',
    specsList: [
      { label: 'Outport', value: 'USB-C (45W max) + USB-A (18W max)' },
      { label: 'Protection', value: 'Over-volt thermal protection chip built-in' },
      { label: 'Color', value: 'Glistening White / Pure Dark' }
    ],
    tags: ['Charger', 'Fast Charge', 'Power Adaptor']
  },
  {
    id: 'acc-2',
    type: 'product',
    name: 'Braided Type-C Charging Cable',
    category: 'electronics-accessories',
    brand: 'Generic Premium',
    description: 'Tough, extra long, military-grade nylon braided copper wire cords. Resistant to bends, tangles, and structural pull tears.',
    price: 150,
    image: 'https://images.unsplash.com/photo-1541140111813-8222e9d90981?q=80&w=600&auto=format&fit=crop',
    availability: 'In Stock',
    specsList: [
      { label: 'Length', value: '1.5 meters thick core' },
      { label: 'Transmission Rate', value: 'High Speed 480 Mbps data transfers' },
      { label: 'Material', value: 'Reinforced PVC joint + Nylon cover' }
    ],
    tags: ['Cable', 'Type-C', 'Heavy Duty']
  },
  {
    id: 'acc-3',
    type: 'product',
    name: 'Adaptive Dual USB Adapter Box',
    category: 'electronics-accessories',
    brand: 'Generic Premium',
    description: 'Compact adapter block which fits nicely on standard extension boards, regulating stable power current distribution.',
    price: 300,
    image: 'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=600&auto=format&fit=crop',
    availability: 'In Stock',
    specsList: [
      { label: 'Ports', value: 'Dual USB ports charging simultaneously' },
      { label: 'Standard output', value: 'DC 5V / 2.4A balanced load' }
    ],
    tags: ['Adapter', 'Power Box', 'Charger']
  },
  {
    id: 'acc-4',
    type: 'product',
    name: 'Wired Sports Earphones',
    category: 'electronics-accessories',
    brand: 'Generic Premium',
    description: 'Bass-boosted comfortable acoustic buds with clear dedicated inline noise-canceling physical calling mic.',
    price: 350,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
    availability: 'In Stock',
    specsList: [
      { label: 'Jack connector', value: '3.5mm standard gold plated port' },
      { label: 'Cable line', value: 'Anti-pull flat wire layout' },
      { label: 'Remote', value: 'Volume sliders, Pause/Receive call button' }
    ],
    tags: ['Earphones', 'Bass', 'Music']
  },
  {
    id: 'acc-5',
    type: 'product',
    name: 'Cinema-Bass Bluetooth Headphones',
    category: 'electronics-accessories',
    brand: 'Generic Premium',
    description: 'Padded soundproof cups with outstanding cushion wear. Perfect for long commutes, gaming, or distraction-free movie listening.',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=600&auto=format&fit=crop',
    availability: 'In Stock',
    specsList: [
      { label: 'Wireless Range', value: 'Stable Bluetooth 5.3 up to 10 meters' },
      { label: 'Battery Capacity', value: 'Up to 24 hours playback on a full pump' },
      { label: 'Aux backup', value: 'Includes optional 3.5mm input socket' }
    ],
    tags: ['Headphones', 'Bluetooth', 'Over Ear']
  },
  {
    id: 'acc-6',
    type: 'product',
    name: 'Eco-Speed Wired Optical Mouse',
    category: 'electronics-accessories',
    brand: 'Generic Premium',
    description: 'Lightweight ergonomic design layout built to support computer operations, document sorting, and offices.',
    price: 250,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop',
    availability: 'In Stock',
    specsList: [
      { label: 'DPI settings', value: '1200 DPI high-precision scanning' },
      { label: 'Buttons', value: '3 silent click layouts with scrolling wheel' },
      { label: 'Cable length', value: '1.2 meters robust standard cord' }
    ],
    tags: ['Mouse', 'PC Accessory', 'Office']
  },
  {
    id: 'acc-7',
    type: 'product',
    name: 'Multi-Outlet extension Board with USB',
    category: 'electronics-accessories',
    brand: 'Generic Premium',
    description: '4 heavy duty universal socket inputs coupled with 2 auto-sensing smart USB charging outputs. Protect your electronics from overload spikes.',
    price: 650,
    image: 'https://images.unsplash.com/photo-1558538337-a994250a273b?q=80&w=600&auto=format&fit=crop',
    availability: 'In Stock',
    specsList: [
      { label: 'Cord distance', value: '3 meters thick heavy rubberized cord' },
      { label: 'Output rate', value: '2500 Watts max load capability' },
      { label: 'Fuse breaker', value: 'Red LED safety toggle toggle with automatic trip' }
    ],
    tags: ['Extension', 'Power Board', 'Sockets']
  },
  {
    id: 'acc-8',
    type: 'product',
    name: 'Energy Saver LED Bulb',
    category: 'electronics-accessories',
    brand: 'Generic Premium',
    description: 'Ultra bright Cool Daylight illuminating globe offering massive saving benefits compared to old standard incandescent loops.',
    price: 150,
    image: 'https://images.unsplash.com/photo-1550985616-10810253b84d?q=80&w=600&auto=format&fit=crop',
    availability: 'In Stock',
    specsList: [
      { label: 'Luminous rating', value: '15 Watts (equivalent to old 100W light outputs)' },
      { label: 'Cap type', value: 'Universal B22 bayonet / E27 screw models available' },
      { label: 'Lifespan', value: 'Tested to last over 15,000 hours continuous' }
    ],
    tags: ['LED', 'Bulb', 'Lighting', 'Energy Saving']
  },

  // Category 7: Electrical Materials (Wire 1.5mm / 4mm and specified)
  {
    id: 'ele-1',
    type: 'product',
    name: 'Electrical Wire 1.5 mm',
    category: 'electrical-materials',
    brand: 'Generic Premium',
    description: 'Highly conductive single-core pure copper wire wrapped in fire-resistant insulation PVC. Standard wiring choice for ceiling light routes.',
    price: 80,
    priceLabel: '80 ETB / meter',
    image: 'https://images.unsplash.com/photo-1601524909162-be87252be298?q=80&w=600&auto=format&fit=crop',
    availability: 'In Stock',
    specsList: [
      { label: 'Thickness', value: '1.5 mm thickness index' },
      { label: 'Insulation', value: 'Flame retardant PVC grade coating' },
      { label: 'Conductor material', value: '99.9% Electrolytic Clean Copper' }
    ],
    tags: ['Wire', '1.5mm', 'Lighting Wiring']
  },
  {
    id: 'ele-2',
    type: 'product',
    name: 'Electrical Wire 4 mm',
    category: 'electrical-materials',
    brand: 'Generic Premium',
    description: 'Thick, heavy load-resistant copper core wire. Created specifically for high power-draw sockets, geysers, or stove kitchen loops.',
    price: 140,
    priceLabel: '140 ETB / meter',
    image: 'https://images.unsplash.com/photo-1558538337-a994250a273b?q=80&w=600&auto=format&fit=crop',
    availability: 'In Stock',
    specsList: [
      { label: 'Thickness', value: '4.0 mm core size' },
      { label: 'Application', value: 'Heavy Duty power outlets' },
      { label: 'Voltage rating', value: 'Sustains 450/750 Volts easily' }
    ],
    tags: ['Wire', '4mm', 'Heavy Outlet']
  },
  {
    id: 'ele-3',
    type: 'product',
    name: 'Premium Dual Accent Switch',
    category: 'electrical-materials',
    brand: 'Generic Premium',
    description: 'Chic modern flush-wall mounting switch plate. Fluid click response with a premium glossy scratchproof exterior.',
    price: 200,
    image: 'https://images.unsplash.com/photo-1558538337-a994250a273b?q=80&w=600&auto=format&fit=crop',
    availability: 'In Stock',
    specsList: [
      { label: 'Load capacity', value: '10 Amps standard rating' },
      { label: 'Plating', value: 'Fireproof polycarbonate trim' }
    ],
    tags: ['Switch', 'Wall plate', 'Light switch']
  },
  {
    id: 'ele-4',
    type: 'product',
    name: 'Durable Universal Wall Socket',
    category: 'electrical-materials',
    brand: 'Generic Premium',
    description: 'Supports UK, EU, and US type dual plug modules simultaneously. Fits with protective safety shutter boxes to keep children safe.',
    price: 250,
    image: 'https://images.unsplash.com/photo-1558538337-a994250a273b?q=80&w=600&auto=format&fit=crop',
    availability: 'In Stock',
    specsList: [
      { label: 'Rated load', value: '13 Amps continuous drain capacity' },
      { label: 'Features', value: 'Child safety interior shutters' }
    ],
    tags: ['Socket', 'Universal Plug', 'Outlets']
  },

  // Category 8: Movies & Entertainment
  {
    id: 'mov-1',
    type: 'product',
    name: 'Admas Love (Amharic Cinema)',
    category: 'movies-entertainment',
    brand: 'Amharic Movies',
    description: 'High-definition local Ethiopian cinematic release. Captivating domestic drama, romance, and modern Addis Comedy.',
    price: 50,
    priceLabel: '50 ETB Copy',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop',
    availability: 'In Stock',
    specsList: [
      { label: 'Language', value: 'Pure Amharic Native Audio' },
      { label: 'Resolution', value: 'Full HD 1080P clarity' },
      { label: 'Type', value: 'Single Movie' }
    ],
    tags: ['Amharic Movie', 'HD Film', 'Drama']
  },
  {
    id: 'mov-2',
    type: 'product',
    name: 'Gladiator Redux (English Action Hero)',
    category: 'movies-entertainment',
    brand: 'English Movies',
    description: 'Thrilling action cinematic epic. Clear sound layout with complete Amharic subtitle translations overlays.',
    price: 40,
    priceLabel: '40 ETB Copy',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop',
    availability: 'In Stock',
    specsList: [
      { label: 'Language', value: 'English with optional Amharic Subtitle track' },
      { label: 'Format', value: 'Direct high-speed USB flash copy' },
      { label: 'Rating', value: 'Action / Adventure' }
    ],
    tags: ['English Movie', 'Action', 'HD Film']
  },
  {
    id: 'mov-3',
    type: 'product',
    name: 'Bahubali Returns (Hindi Epic Series)',
    category: 'movies-entertainment',
    brand: 'Hindi Movies',
    description: 'Famed colorful legendary action romance saga. Perfectly localized with expert vocal voice acting and Amharic translation dub layers.',
    price: 60,
    priceLabel: '60 ETB Copy',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600&auto=format&fit=crop',
    availability: 'In Stock',
    specsList: [
      { label: 'Translation', value: 'Amharic Dubbed Over Voice' },
      { label: 'Length', value: 'Full theatrical collection' }
    ],
    tags: ['Hindi Movie', 'Amharic Dubbed', 'Epic Action']
  },
  {
    id: 'mov-4',
    type: 'product',
    name: 'Wushu Legend (Chinese Martial Arts)',
    category: 'movies-entertainment',
    brand: 'Chinese Movies',
    description: 'Classic high fidelity martial arts dynasty action. Staggering action choreographies translated seamlessly with clean voiceovers.',
    price: 50,
    priceLabel: '50 ETB Copy',
    image: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=600&auto=format&fit=crop',
    availability: 'In Stock',
    specsList: [
      { label: 'Category', value: 'Martial Arts / Wuxia' },
      { label: 'Voiceover', value: 'Expert Amharic Dub' }
    ],
    tags: ['Chinese Movie', 'Dubbed', 'Martial Arts']
  },
  {
    id: 'mov-5',
    type: 'product',
    name: 'Ertugrul Season 5 (Turkish Series Box)',
    category: 'movies-entertainment',
    brand: 'Turkish Movies',
    description: 'The monumental historical drama series. Contains all 60 localized high-definition episodes, translated to fluent Amharic audio.',
    price: 250,
    priceLabel: '250 ETB Series Pack',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop',
    availability: 'In Stock',
    specsList: [
      { label: 'Scope', value: 'Complete Series Season Box (60 Episodes)' },
      { label: 'Acoustics', value: 'Vibrant Stereo Audio' }
    ],
    tags: ['Turkish Series', 'Amharic Dub', 'Complete Season']
  },

  // Category 9: Mobile Applications & Account Services
  {
    id: 'mas-1',
    type: 'service',
    name: 'Facebook Account Creation & Guide',
    category: 'mobile-app-services',
    description: 'Setup a secure, virus-protected Facebook profile. We verify phone codes, configure profile layouts, and setup advanced backup triggers.',
    price: 100,
    priceLabel: '100 ETB',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=600&auto=format&fit=crop',
    estimatedTime: '15 mins',
    features: ['Strong personalized secure key layout', 'Privacy config preventing unwanted tracking tag spams', 'Two-Factor auth setup advisory'],
    tags: ['Account Setup', 'Facebook', 'Social Media']
  },
  {
    id: 'mas-2',
    type: 'service',
    name: 'TikTok Account Creation & Creator Setup',
    category: 'mobile-app-services',
    description: 'Jumpstart your digital popularity. We configure username handles, link payment lines, and adjust video rendering parameters.',
    price: 150,
    priceLabel: '150 ETB',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=600&auto=format&fit=crop',
    estimatedTime: '20 mins',
    features: ['Creator metrics analytics interface toggled', 'Link integration to Telegram/Instagram profiles', 'Optimal rendering stream tweaks'],
    tags: ['Account Setup', 'TikTok', 'Creator Mode']
  },
  {
    id: 'mas-3',
    type: 'service',
    name: 'Telegram Channel & Bot Setup',
    category: 'mobile-app-services',
    description: 'Organize your commercial business. We register professional channels, configure greeting auto-replies, and layout safe file groups.',
    price: 200,
    priceLabel: '200 ETB',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2959d43?q=80&w=600&auto=format&fit=crop',
    estimatedTime: '30 mins',
    features: ['Channel cover graphic alignment', 'Auto-delete user spam bot activation', 'Instant admin management guides'],
    tags: ['Account Setup', 'Telegram', 'Business Channel']
  },
  {
    id: 'mas-4',
    type: 'service',
    name: 'IMO Messenger Setup',
    category: 'mobile-app-services',
    description: 'Connect with family abroad easily. Smooth audio-video setup with optimized bandwidth limits suited for standard Ethiopian cellular data.',
    price: 100,
    priceLabel: '100 ETB',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop',
    estimatedTime: '10 mins',
    features: ['HD sound filters active', 'Data-saving video presets', 'Address book backup sync with dual SIM channels'],
    tags: ['Account Setup', 'IMO', 'Calling Sync']
  },
  {
    id: 'mas-5',
    type: 'service',
    name: 'Account Recovery Assistance',
    category: 'mobile-app-services',
    description: 'Forgotten email strings, locked Telegram channels, or lost recovery security files? We retrieve and unlock access safely.',
    price: 300,
    priceLabel: 'From 300 ETB',
    image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=600&auto=format&fit=crop',
    estimatedTime: '30 - 60 mins',
    features: ['Email authentication resets', 'Security question verification loops', 'Backup terminal key extraction'],
    tags: ['Support', 'Security Restore', 'Unlocks']
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Where is Josh Electronics physically located?',
    answer: 'We are situated in the main electronic retail strip in Addis Ababa, Ethiopia. We provide accurate Google Maps pin guidance below or you can call us directly via one tap for instant routing instructions!',
    category: 'General'
  },
  {
    id: 'faq-2',
    question: 'How do I complete payments for orders or repair tasks?',
    answer: 'We accept Commercial Bank of Ethiopia (CBE), Bank of Abyssinia, Awash, Dashen, and Telebirr. You can quickly view our verified payment accounts in the "Bank & Transfer" tab, where our Copy Account button makes transfer quick!',
    category: 'Billing'
  },
  {
    id: 'faq-3',
    question: 'How long do phone hardware repair tasks usually take?',
    answer: 'Microphone, Speaker, and Charging Port replacements can be finalized in 30-45 minutes. Screen replacements may take 1-2 hours depending on frame preparation. Board diagnostics might require 1-2 working days.',
    category: 'Repairs'
  },
  {
    id: 'faq-4',
    question: 'Do you translate and install English or Turkish series movies?',
    answer: 'Yes! We host an immense drive catalog of cinematic releases, English blockbusters translated with subtitles, Turkish series dubbed beautifully into Amharic, and Indian and Chinese cinema files ready to transfer to your device or flash disk.',
    category: 'Entertainment'
  }
];

export const TESTIMONIALS: ReviewItem[] = [
  {
    id: 'test-1',
    username: 'Dawit Solomon',
    rating: 5,
    comment: 'Resolved my Samsung screen issue in under an hour. The colors look original and they even applied a screen protector and case for a great price. Outstanding service!',
    serviceUsed: 'Samsung screen repair',
    date: '2026-05-12'
  },
  {
    id: 'test-2',
    username: 'Ruth Hailu',
    rating: 5,
    comment: 'The copy account button is so helpful. I paid for my flyers design printing via CBE online transfer, sent the screenshot on Telegram, and picked up beautiful color brochures. Highly recommend!',
    serviceUsed: 'Flyer Design & Printing',
    date: '2026-06-03'
  },
  {
    id: 'test-3',
    username: 'Yared Tesfaye',
    rating: 5,
    comment: 'I bought an Itel button phone for my father and a customized extension cable board. Genuine parts, friendly conversation, and the lowest rates in town.',
    serviceUsed: 'Button Phone + Accessories Purchase',
    date: '2026-06-15'
  }
];
