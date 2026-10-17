// ─── MOCK DATA ─────────────────────────────────────────────────────────────
// Used when the backend is not running so the site always displays products.

export const MOCK_CATEGORIES = [
  { _id: 'cat-1', name: 'Pizza', slug: 'pizza', sortOrder: 1, isActive: true },
  { _id: 'cat-2', name: 'From The Fryer', slug: 'from-the-fryer', sortOrder: 2, isActive: true },
  { _id: 'cat-3', name: 'Roll & Wrap', slug: 'roll-and-wrap', sortOrder: 3, isActive: true },
  { _id: 'cat-4', name: 'Grill Corner', slug: 'grill-corner', sortOrder: 4, isActive: true },
  { _id: 'cat-5', name: 'Sandwich', slug: 'sandwich', sortOrder: 5, isActive: true },
  { _id: 'cat-6', name: 'Potato Corner', slug: 'potato-corner', sortOrder: 6, isActive: true },
  { _id: 'cat-7', name: 'Pasta', slug: 'pasta', sortOrder: 7, isActive: true },
  { _id: 'cat-8', name: 'Beverages', slug: 'beverages', sortOrder: 8, isActive: true },
];

const pizzaCat = { _id: 'cat-1', name: 'Pizza', slug: 'pizza' };
const fryerCat = { _id: 'cat-2', name: 'From The Fryer', slug: 'from-the-fryer' };
const wrapCat  = { _id: 'cat-3', name: 'Roll & Wrap', slug: 'roll-and-wrap' };
const grillCat = { _id: 'cat-4', name: 'Grill Corner', slug: 'grill-corner' };
const sandCat  = { _id: 'cat-5', name: 'Sandwich', slug: 'sandwich' };
const potCat   = { _id: 'cat-6', name: 'Potato Corner', slug: 'potato-corner' };
const pastaCat = { _id: 'cat-7', name: 'Pasta', slug: 'pasta' };
const bevCat   = { _id: 'cat-8', name: 'Beverages', slug: 'beverages' };

export const MOCK_PRODUCTS = [
  // ── PIZZA ───────────────────────────────────────────────────────────────
  {
    _id: 'p-1', name: 'Mexicana Pizza', slug: 'mexicana-pizza',
    description: 'Loaded with jalapeños, beef mince, onions, capsicum & spicy salsa',
    imageUrl: '/img-pizza.jpg',
    categoryId: pizzaCat, isFeatured: true, isAvailable: true,
    variants: [
      { code: 'S', name: 'Small 7"', price: 699 },
      { code: 'M', name: 'Medium 11"', price: 1199 },
      { code: 'L', name: 'Large 14"', price: 1799 },
      { code: 'XL', name: 'X-Large 18"', price: 2499 },
    ], addOns: [],
  },
  {
    _id: 'p-2', name: 'BBQ Chicken Pizza', slug: 'bbq-chicken-pizza',
    description: 'Smoky BBQ sauce, grilled chicken, red onions, mozzarella',
    imageUrl: '/img-pizza.jpg',
    categoryId: pizzaCat, isFeatured: true, isAvailable: true,
    variants: [
      { code: 'S', name: 'Small 7"', price: 749 },
      { code: 'M', name: 'Medium 11"', price: 1249 },
      { code: 'L', name: 'Large 14"', price: 1849 },
      { code: 'XL', name: 'X-Large 18"', price: 2599 },
    ], addOns: [],
  },
  {
    _id: 'p-3', name: 'Beef Supreme Pizza', slug: 'beef-supreme-pizza',
    description: 'Seasoned beef, mushrooms, olives, onions, green peppers',
    imageUrl: '/img-pizza.jpg',
    categoryId: pizzaCat, isFeatured: true, isAvailable: true,
    variants: [
      { code: 'S', name: 'Small 7"', price: 799 },
      { code: 'M', name: 'Medium 11"', price: 1349 },
      { code: 'L', name: 'Large 14"', price: 1999 },
      { code: 'XL', name: 'X-Large 18"', price: 2799 },
    ], addOns: [],
  },
  {
    _id: 'p-4', name: 'Veggie Delight Pizza', slug: 'veggie-delight-pizza',
    description: 'Fresh mushrooms, olives, capsicum, tomatoes, corn & herbs',
    imageUrl: '/img-pizza.jpg',
    categoryId: pizzaCat, isFeatured: false, isAvailable: true,
    variants: [
      { code: 'S', name: 'Small 7"', price: 599 },
      { code: 'M', name: 'Medium 11"', price: 1099 },
      { code: 'L', name: 'Large 14"', price: 1599 },
      { code: 'XL', name: 'X-Large 18"', price: 2199 },
    ], addOns: [],
  },
  {
    _id: 'p-5', name: 'Chicken Tikka Pizza', slug: 'chicken-tikka-pizza',
    description: 'Marinated tikka chicken, onions, green chilli, yogurt sauce',
    imageUrl: '/img-pizza.jpg',
    categoryId: pizzaCat, isFeatured: true, isAvailable: true,
    variants: [
      { code: 'S', name: 'Small 7"', price: 749 },
      { code: 'M', name: 'Medium 11"', price: 1299 },
      { code: 'L', name: 'Large 14"', price: 1899 },
      { code: 'XL', name: 'X-Large 18"', price: 2699 },
    ], addOns: [],
  },
  {
    _id: 'p-6', name: 'Cheese Lovers Pizza', slug: 'cheese-lovers-pizza',
    description: 'Triple cheese blend: mozzarella, cheddar, parmesan',
    imageUrl: '/img-pizza.jpg',
    categoryId: pizzaCat, isFeatured: false, isAvailable: true,
    variants: [
      { code: 'S', name: 'Small 7"', price: 649 },
      { code: 'M', name: 'Medium 11"', price: 1149 },
      { code: 'L', name: 'Large 14"', price: 1699 },
      { code: 'XL', name: 'X-Large 18"', price: 2399 },
    ], addOns: [],
  },

  // ── FRYER ────────────────────────────────────────────────────────────────
  {
    _id: 'p-7', name: 'My Pizza Burger', slug: 'my-pizza-burger',
    description: 'Signature double patty, special sauce, lettuce, tomato, pickles',
    imageUrl: '/img-burger.jpg',
    categoryId: fryerCat, isFeatured: true, isAvailable: true,
    price: 499, variants: [], addOns: [],
  },
  {
    _id: 'p-8', name: 'Zinger Burger', slug: 'zinger-burger',
    description: 'Crispy fried chicken fillet, coleslaw, spicy mayo',
    imageUrl: '/img-burger.jpg',
    categoryId: fryerCat, isFeatured: true, isAvailable: true,
    price: 449, variants: [], addOns: [],
  },
  {
    _id: 'p-9', name: 'Smash Burger', slug: 'smash-burger',
    description: 'Smashed beef patties, American cheese, caramelised onions',
    imageUrl: '/img-burger.jpg',
    categoryId: fryerCat, isFeatured: true, isAvailable: true,
    price: 549, variants: [], addOns: [],
  },
  {
    _id: 'p-10', name: 'Crispy Chicken Wings', slug: 'crispy-chicken-wings',
    description: '6 pieces of crispy seasoned wings with dipping sauce',
    imageUrl: '/img-burger.jpg',
    categoryId: fryerCat, isFeatured: false, isAvailable: true,
    price: 599, variants: [], addOns: [],
  },

  // ── ROLLS & WRAPS ─────────────────────────────────────────────────────────
  {
    _id: 'p-11', name: 'Chicken Shawarma Roll', slug: 'chicken-shawarma-roll',
    description: 'Grilled chicken, garlic sauce, pickles, fresh veggies in soft bread',
    imageUrl: '/img-shawarma.jpg',
    categoryId: wrapCat, isFeatured: true, isAvailable: true,
    price: 349, variants: [], addOns: [],
  },
  {
    _id: 'p-12', name: 'Beef Shawarma Roll', slug: 'beef-shawarma-roll',
    description: 'Tender beef strips, tahini, fresh salad, wrapped in flatbread',
    imageUrl: '/img-shawarma.jpg',
    categoryId: wrapCat, isFeatured: false, isAvailable: true,
    price: 399, variants: [], addOns: [],
  },
  {
    _id: 'p-13', name: 'Chicken Tikka Roll', slug: 'chicken-tikka-roll',
    description: 'Charcoal tikka chicken, mint chutney, onions, naan roll',
    imageUrl: '/img-shawarma.jpg',
    categoryId: wrapCat, isFeatured: false, isAvailable: true,
    price: 379, variants: [], addOns: [],
  },

  // ── GRILL ────────────────────────────────────────────────────────────────
  {
    _id: 'p-14', name: 'Chicken Seekh Kebab', slug: 'chicken-seekh-kebab',
    description: '4 pieces seekh kebab with raita and naan',
    imageUrl: '/img-grill.jpg',
    categoryId: grillCat, isFeatured: false, isAvailable: true,
    price: 499, variants: [], addOns: [],
  },
  {
    _id: 'p-15', name: 'Mix Grill Platter', slug: 'mix-grill-platter',
    description: 'Assorted grill: tikka, seekh, boti served with bread & salad',
    imageUrl: '/img-grill.jpg',
    categoryId: grillCat, isFeatured: true, isAvailable: true,
    price: 899, variants: [], addOns: [],
  },

  // ── POTATO CORNER ─────────────────────────────────────────────────────────
  {
    _id: 'p-16', name: 'Loaded Fries', slug: 'loaded-fries',
    description: 'Crispy fries topped with cheese sauce, jalapeños, sour cream',
    imageUrl: '/img-fries.jpg',
    categoryId: potCat, isFeatured: true, isAvailable: true,
    price: 349, variants: [], addOns: [],
  },
  {
    _id: 'p-17', name: 'Tornado Potato', slug: 'tornado-potato',
    description: 'Spiral cut potato on a stick, seasoned with your choice of flavour',
    imageUrl: '/img-fries.jpg',
    categoryId: potCat, isFeatured: true, isAvailable: true,
    price: 299, variants: [], addOns: [],
  },
  {
    _id: 'p-18', name: 'Wedge Fries', slug: 'wedge-fries',
    description: 'Thick-cut potato wedges with herbed seasoning & dipping sauce',
    imageUrl: '/img-fries.jpg',
    categoryId: potCat, isFeatured: false, isAvailable: true,
    price: 249, variants: [], addOns: [],
  },

  // ── SANDWICH ────────────────────────────────────────────────────────────
  {
    _id: 'p-19', name: 'Club Sandwich', slug: 'club-sandwich',
    description: 'Triple layered with chicken, egg, cheese, lettuce and tomato',
    imageUrl: '/img-sandwich.jpg',
    categoryId: sandCat, isFeatured: false, isAvailable: true,
    price: 399, variants: [], addOns: [],
  },
  {
    _id: 'p-20', name: 'Grilled Chicken Sub', slug: 'grilled-chicken-sub',
    description: 'Foot-long sub with grilled chicken, fresh veggies, special sauce',
    imageUrl: '/img-sandwich.jpg',
    categoryId: sandCat, isFeatured: false, isAvailable: true,
    price: 449, variants: [], addOns: [],
  },

  // ── PASTA ───────────────────────────────────────────────────────────────
  {
    _id: 'p-21', name: 'Penne Arrabiata', slug: 'penne-arrabiata',
    description: 'Spicy tomato sauce with garlic, red chilli, parmesan',
    imageUrl: '/img-pasta.jpg',
    categoryId: pastaCat, isFeatured: false, isAvailable: true,
    price: 449, variants: [], addOns: [],
  },
  {
    _id: 'p-22', name: 'Chicken Alfredo', slug: 'chicken-alfredo',
    description: 'Creamy alfredo sauce with grilled chicken and fettuccine',
    imageUrl: '/img-pasta.jpg',
    categoryId: pastaCat, isFeatured: false, isAvailable: true,
    price: 549, variants: [], addOns: [],
  },

  // ── BEVERAGES ────────────────────────────────────────────────────────────
  {
    _id: 'p-23', name: 'Soft Drink (Can)', slug: 'soft-drink-can',
    description: 'Pepsi, 7UP, Mirinda or Mountain Dew',
    imageUrl: '/coca-cola-can.jpg',
    categoryId: bevCat, isFeatured: false, isAvailable: true,
    price: 99, variants: [], addOns: [],
  },
  {
    _id: 'p-24', name: 'Fresh Lemonade', slug: 'fresh-lemonade',
    description: 'Freshly squeezed lemonade with mint and ice',
    imageUrl: '/img-beverage.jpg',
    categoryId: bevCat, isFeatured: false, isAvailable: true,
    price: 149, variants: [], addOns: [],
  },
];

export const MOCK_DEALS = [
  {
    _id: 'd-1',
    name: 'Pizza 1+1 Offer',
    description: 'Buy any Medium pizza and get a second Medium pizza FREE! Available on selected flavours.',
    imageUrl: '/img-pizza.jpg',
    type: 'promotion',
    price: 1199,
    isAvailable: true,
    sortOrder: 1,
    items: [
      { quantity: 2, productNameSnapshot: 'Medium Pizza (Any Flavour)' },
    ],
  },
  {
    _id: 'd-2',
    name: 'Burger Combo Deal',
    description: 'Any burger + Loaded Fries + Soft Drink at a special combo price!',
    imageUrl: '/img-deal-combo.jpg',
    type: 'combo',
    price: 849,
    isAvailable: true,
    sortOrder: 2,
    items: [
      { quantity: 1, productNameSnapshot: 'Burger (Any)' },
      { quantity: 1, productNameSnapshot: 'Loaded Fries' },
      { quantity: 1, productNameSnapshot: 'Soft Drink' },
    ],
  },
  {
    _id: 'd-3',
    name: 'Family Feast',
    description: 'Feed the whole family! 1 Large Pizza + 2 Burgers + 2 Rolls + 4 Drinks.',
    imageUrl: '/img-deal-family.jpg',
    type: 'family',
    price: 3499,
    isAvailable: true,
    sortOrder: 3,
    items: [
      { quantity: 1, productNameSnapshot: 'Large Pizza (Any Flavour)' },
      { quantity: 2, productNameSnapshot: 'Burger (Any)' },
      { quantity: 2, productNameSnapshot: 'Shawarma Roll' },
      { quantity: 4, productNameSnapshot: 'Soft Drink' },
    ],
  },
  {
    _id: 'd-4',
    name: 'Student Saver',
    description: 'Small Pizza + Wedge Fries + Soft Drink — perfect for one!',
    imageUrl: '/img-fries.jpg',
    type: 'deal',
    price: 999,
    isAvailable: true,
    sortOrder: 4,
    items: [
      { quantity: 1, productNameSnapshot: 'Small Pizza (Any Flavour)' },
      { quantity: 1, productNameSnapshot: 'Wedge Fries' },
      { quantity: 1, productNameSnapshot: 'Soft Drink' },
    ],
  },
  {
    _id: 'd-5',
    name: 'Date Night Special',
    description: '2 Medium Pizzas + Pasta + 2 Fresh Lemonades — perfect for two!',
    imageUrl: '/img-pasta.jpg',
    type: 'combo',
    price: 3199,
    isAvailable: true,
    sortOrder: 5,
    items: [
      { quantity: 2, productNameSnapshot: 'Medium Pizza (Any Flavour)' },
      { quantity: 1, productNameSnapshot: 'Chicken Alfredo Pasta' },
      { quantity: 2, productNameSnapshot: 'Fresh Lemonade' },
    ],
  },
  {
    _id: 'd-6',
    name: 'Shawarma Party Pack',
    description: '4 Chicken Shawarma Rolls + 4 Soft Drinks — party sorted!',
    imageUrl: '/img-shawarma.jpg',
    type: 'deal',
    price: 1799,
    isAvailable: true,
    sortOrder: 6,
    items: [
      { quantity: 4, productNameSnapshot: 'Chicken Shawarma Roll' },
      { quantity: 4, productNameSnapshot: 'Soft Drink' },
    ],
  },
];

export const MOCK_BRANCHES = [
  {
    _id: 'b-1',
    name: 'Wasan Pura Branch',
    address: 'Umer Din Road, Near Iftikhar Optical, Wasan Pura, Lahore',
    city: 'Lahore',
    phones: { order: '0309 940 8899', branch: '0304 890 1341' },
    isActive: true,
  },
  {
    _id: 'b-2',
    name: 'Riwaz Garden Branch',
    address: 'M.A.Q College Road, Near Haq Orthopedic Hospital, Riwaz Garden, Lahore',
    city: 'Lahore',
    phones: { order: '0317 454 4884', branch: '0310 483 4236' },
    isActive: true,
  },
];
