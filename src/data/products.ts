import { Product } from '@/store/useStore';

export const CATEGORIES = [
  'All',
  'Furniture',
  'Lighting',
  'Home',
  'Accessories',
  'Kitchen',
  'Audio',
  'Office',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'name-asc', label: 'Name: A → Z' },
  { value: 'name-desc', label: 'Name: Z → A' },
  { value: 'newest', label: 'Newest' },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]['value'];

export const PRICE_RANGES = [
  { value: 'all', label: 'All Prices' },
  { value: '0-100', label: 'Under $100', min: 0, max: 100 },
  { value: '100-300', label: '$100 – $300', min: 100, max: 300 },
  { value: '300-500', label: '$300 – $500', min: 300, max: 500 },
  { value: '500+', label: '$500+', min: 500, max: Infinity },
] as const;

export type PriceRange = (typeof PRICE_RANGES)[number]['value'];

export const PRODUCTS: Product[] = [
  // Furniture
  { id: '1', name: 'Monochrome Chair', price: 890, category: 'Furniture', description: 'Molded plywood shell with matte lacquer finish. Solid ash wood legs with brass ferrules. Stackable design.', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800', onSale: false },
  { id: '2', name: 'Walnut Side Table', price: 340, category: 'Furniture', description: 'Solid American black walnut with hand-rubbed oil finish. Mortise and tenon joinery. 45cm diameter.', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800', onSale: false },
  { id: '3', name: 'Arc Floor Mirror', price: 520, category: 'Furniture', description: 'Full-length arched mirror with powder-coated steel frame. Wall-mountable or freestanding. 180×60cm.', image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800', onSale: true, salePrice: 420 },
  { id: '4', name: 'Lounge Daybed', price: 1450, category: 'Furniture', description: 'Oak frame with Danish cord weaving. Includes linen cushion set in stone grey. Built for long afternoons.', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800', onSale: false },
  { id: '5', name: 'Floating Shelf Set', price: 180, category: 'Furniture', description: 'Set of 3 solid oak shelves with concealed mounting brackets. Beveled edges. Available in natural and ebonized.', image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=800', onSale: true, salePrice: 145 },

  // Lighting
  { id: '6', name: 'Brushed Aluminum Lamp', price: 210, category: 'Lighting', description: 'CNC-machined aluminum body with integrated LED. Three-stage touch dimmer. 2700K warm white.', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800', onSale: false },
  { id: '7', name: 'Paper Pendant Light', price: 165, category: 'Lighting', description: 'Hand-folded washi paper shade over steel frame. E27 socket. Creates a warm ambient diffusion.', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=800', onSale: false },
  { id: '8', name: 'Concrete Table Lamp', price: 135, category: 'Lighting', description: 'Cast concrete base with linen drum shade. Weighted for stability. Inline dimmer switch.', image: 'https://images.unsplash.com/photo-1573790388645-f56ddc59d035?auto=format&fit=crop&q=80&w=800', onSale: true, salePrice: 99 },
  { id: '9', name: 'Linear Track Light', price: 380, category: 'Lighting', description: 'Extruded aluminum track with 3 adjustable spotlights. Matte black finish. 120cm length.', image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&q=80&w=800', onSale: false },

  // Home
  { id: '10', name: 'Ceramic Vessel 01', price: 120, category: 'Home', description: 'Hand-thrown stoneware vessel with a matte glaze finish. Each piece is unique.', image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800', onSale: false },
  { id: '11', name: 'Linen Throw Blanket', price: 95, category: 'Home', description: 'Stone-washed French linen in natural ecru. Pre-shrunk. 140×200cm. Gets softer with every wash.', image: 'https://images.unsplash.com/photo-1616627561950-9f746e330187?auto=format&fit=crop&q=80&w=800', onSale: false },
  { id: '12', name: 'Matte Black Carafe', price: 55, category: 'Home', description: 'Borosilicate glass with matte exterior coating. Heat-resistant to 130°C. 1L capacity.', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800', onSale: true, salePrice: 42 },
  { id: '13', name: 'Stoneware Planter', price: 78, category: 'Home', description: 'Unglazed terracotta with drainage tray. Interior sealed for moisture protection. 20cm diameter.', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800', onSale: false },
  { id: '14', name: 'Scented Candle Trio', price: 65, category: 'Home', description: 'Set of 3 soy wax candles: Cedar, Vetiver, Tobacco. 40-hour burn time each. Reusable ceramic cups.', image: 'https://images.unsplash.com/photo-1602607912066-d1e0ea46cf12?auto=format&fit=crop&q=80&w=800', onSale: false },

  // Accessories
  { id: '15', name: 'Steel Analog Watch', price: 450, category: 'Accessories', description: 'Brushed 316L surgical steel case with sapphire crystal. Swiss automatic movement. 40mm.', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800', onSale: false },
  { id: '16', name: 'Concrete Desk Organizer', price: 68, category: 'Accessories', description: 'Cast concrete with sealed matte finish. Three compartments. Non-scratch rubber base.', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800', onSale: false },
  { id: '17', name: 'Leather Card Wallet', price: 85, category: 'Accessories', description: 'Full-grain vegetable-tanned leather. 4 card slots, 1 center pocket. Burnished edges.', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800', onSale: true, salePrice: 65 },
  { id: '18', name: 'Titanium Keychain', price: 38, category: 'Accessories', description: 'Grade 5 titanium with quick-release mechanism. Holds up to 6 keys. Weighs just 12g.', image: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&q=80&w=800', onSale: false },

  // Kitchen
  { id: '19', name: 'Pour-Over Coffee Set', price: 125, category: 'Kitchen', description: 'Ceramic dripper with walnut stand and borosilicate server. Brews 2-4 cups. Includes 100 filters.', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800', onSale: false },
  { id: '20', name: 'Chef\'s Knife 8"', price: 195, category: 'Kitchen', description: 'VG-10 stainless steel blade with pakkawood handle. 58 HRC hardness. Lifetime warranty.', image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&q=80&w=800', onSale: false },
  { id: '21', name: 'Ceramic Mug Set', price: 72, category: 'Kitchen', description: 'Set of 4 hand-thrown mugs in matte white. 300ml capacity. Microwave and dishwasher safe.', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=800', onSale: true, salePrice: 55 },
  { id: '22', name: 'Olive Wood Board', price: 88, category: 'Kitchen', description: 'Sustainably harvested Mediterranean olive wood. Each board has unique grain patterns. 40×25cm.', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=800', onSale: false },

  // Audio
  { id: '23', name: 'Wireless Speaker', price: 280, category: 'Audio', description: 'Aluminum unibody with 360° sound. 12-hour battery. Bluetooth 5.3. IPX4 splash resistant.', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800', onSale: false },
  { id: '24', name: 'Studio Headphones', price: 350, category: 'Audio', description: 'Over-ear closed-back design. 40mm beryllium drivers. Detachable cable. Memory foam pads.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800', onSale: true, salePrice: 275 },

  // Office
  { id: '25', name: 'Brass Pen', price: 45, category: 'Office', description: 'Solid brass body that develops a natural patina. Schmidt P8126 refill. Magnetic cap closure.', image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&q=80&w=800', onSale: false },
  { id: '26', name: 'Linen Notebook', price: 28, category: 'Office', description: '160 pages of 100gsm cream paper. Linen hardcover with lay-flat binding. Dot grid. A5 size.', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=800', onSale: false },
  { id: '27', name: 'Monitor Stand', price: 160, category: 'Office', description: 'Solid walnut with integrated cable management. Supports up to 15kg. 10cm height elevation.', image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&q=80&w=800', onSale: true, salePrice: 128 },
];

export const SALE_PRODUCTS = PRODUCTS.filter(p => p.onSale);
