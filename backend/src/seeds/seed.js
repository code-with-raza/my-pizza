require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const slugify = require('slugify');

const connectDB = require('../config/db');
const Admin = require('../models/Admin');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Deal = require('../models/Deal');
const Branch = require('../models/Branch');

const seed = async () => {
  await connectDB();

  console.log('🌱 Starting seed...');

  // Clear collections
  await Promise.all([
    Admin.deleteMany({}),
    Category.deleteMany({}),
    Product.deleteMany({}),
    Deal.deleteMany({}),
    Branch.deleteMany({}),
  ]);

  // ─── Admin ─────────────────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || 'admin123',
    12
  );
  await Admin.create({
    name: 'Admin',
    email: process.env.ADMIN_EMAIL || 'admin@mypizza.com',
    passwordHash,
    role: 'admin',
  });
  console.log('✅ Admin created');

  // ─── Branches ──────────────────────────────────────────────────────────────
  const [branch1, branch2] = await Branch.insertMany([
    {
      name: 'Wasan Pura Branch',
      address: 'Umer Din Road, Near Iftikhar Optical, Wasan Pura, Lahore',
      city: 'Lahore',
      phones: { branch: '0304 890 1341', order: '0309 940 8899' },
      isActive: true,
    },
    {
      name: 'Riwaz Garden Branch',
      address: 'M.A.Q College, Near Haq Orthopedic Hospital, Riwaz Garden, Lahore',
      city: 'Lahore',
      phones: { branch: '0310 483 4236', order: '0317 454 4884' },
      isActive: true,
    },
  ]);
  console.log('✅ Branches created');

  // ─── Categories ────────────────────────────────────────────────────────────
  const categoryData = [
    { name: 'Pizza', slug: 'pizza', sortOrder: 1 },
    { name: 'From The Fryer', slug: 'from-the-fryer', sortOrder: 2 },
    { name: 'Roll & Wrap', slug: 'roll-and-wrap', sortOrder: 3 },
    { name: 'Grill Corner', slug: 'grill-corner', sortOrder: 4 },
    { name: 'Sandwich', slug: 'sandwich', sortOrder: 5 },
    { name: 'Potato Corner', slug: 'potato-corner', sortOrder: 6 },
    { name: 'Pasta', slug: 'pasta', sortOrder: 7 },
    { name: 'Beverages', slug: 'beverages', sortOrder: 8 },
    { name: 'Deals', slug: 'deals', sortOrder: 9 },
  ];

  const categories = await Category.insertMany(categoryData);
  const catMap = {};
  categories.forEach((c) => { catMap[c.slug] = c._id; });
  console.log('✅ Categories created');

  // ─── Helper to make slug unique by appending counter if needed ─────────────
  const usedSlugs = new Set();
  const makeSlug = (name) => {
    let base = slugify(name, { lower: true, strict: true });
    let slug = base;
    let i = 2;
    while (usedSlugs.has(slug)) {
      slug = `${base}-${i}`;
      i++;
    }
    usedSlugs.add(slug);
    return slug;
  };

  // ─── Products ──────────────────────────────────────────────────────────────
  const pizzaVariants = (s, m, l, xl) => [
    { name: 'Small (7")', code: 'S', price: s },
    { name: 'Medium (11")', code: 'M', price: m },
    { name: 'Large (14")', code: 'L', price: l },
    { name: 'X-Large (18")', code: 'XL', price: xl },
  ];

  const standardPizzaNames = [
    'Chicken Tikka', 'Chicken Fajita', 'Chicken Supreme', 'Cheese Lover',
    'Pepperoni', 'Sausages', 'Makhni', 'Tandoori', 'Signature',
    'Kabab Pizza', 'Afghani', 'Cheese Stuff Pizza', 'Malai Boti Pizza',
  ];
  const premiumPizzaNames = [
    'Kabab Crust Pizza', 'Cheese Stuff With Makhni', 'Lazania',
    'Peri Peri Pizza', 'Crown Crust Pizza',
  ];

  const extraToppingAddOn = [
    { name: 'Extra Topping (S)', price: 80 },
    { name: 'Extra Topping (M)', price: 100 },
    { name: 'Extra Topping (L)', price: 150 },
    { name: 'Extra Topping (XL)', price: 200 },
  ];

  const pizzaProducts = [
    ...standardPizzaNames.map((name, i) => ({
      categoryId: catMap['pizza'],
      name,
      slug: makeSlug(name),
      description: `Delicious ${name} pizza available in 4 sizes.`,
      variants: pizzaVariants(550, 1000, 1500, 2000),
      addOns: extraToppingAddOn,
      isFeatured: i < 4,
      sortOrder: i + 1,
    })),
    ...premiumPizzaNames.map((name, i) => ({
      categoryId: catMap['pizza'],
      name,
      slug: makeSlug(name),
      description: `Premium ${name} pizza available in 4 sizes.`,
      variants: pizzaVariants(600, 1200, 1700, 2200),
      addOns: extraToppingAddOn,
      sortOrder: standardPizzaNames.length + i + 1,
    })),
  ];

  const fryerProducts = [
    { name: 'Crunch Burger', price: 320, isFeatured: true },
    { name: 'Crunch Burger with Fries', price: 370 },
    { name: 'Cheesy Crunch Burger', price: 450, isFeatured: true },
    { name: 'Zinger Patty Burger', price: 500, isFeatured: true },
    { name: 'Tower Burger', price: 600 },
    { name: 'Patty Burger', price: 240 },
    { name: 'Patty Burger with Fries', price: 300 },
    { name: 'Cheesy Patty Burger', price: 350 },
    { name: 'Fried Chicken 1 Pc', price: 240 },
    { name: 'Nuggets 5 Pcs', price: 260 },
    { name: 'Hot Wings 5 Pcs', price: 300 },
    { name: 'Hot Wings 10 Pcs', price: 580 },
    { name: 'Cheese Slice', price: 50 },
  ].map((p, i) => ({
    categoryId: catMap['from-the-fryer'],
    name: p.name,
    slug: makeSlug(p.name),
    price: p.price,
    isFeatured: p.isFeatured || false,
    sortOrder: i + 1,
  }));

  const rollWrapProducts = [
    { name: 'Chicken Shawarma', variants: [{ name: 'Small', code: 'S', price: 220 }, { name: 'Medium', code: 'M', price: 250 }, { name: 'Large', code: 'L', price: 300 }], isFeatured: true },
    { name: 'Zinger Shawarma', price: 320, isFeatured: true },
    { name: 'Cheesy Shawarma', price: 320 },
    { name: 'Platter Shawarma', price: 500, description: 'With 2 breads' },
    { name: 'Cheesy Platter', price: 630, description: 'With 2 breads' },
    { name: 'Kabab Paratha Roll', price: 300 },
    { name: 'Chicken Paratha Roll', price: 300 },
    { name: 'Zinger Paratha Roll', price: 320 },
    { name: 'Pizza Paratha', price: 500, description: 'Tandoori + Mexican' },
    { name: 'Grill Wrap', price: 550 },
    { name: 'Zinger Wrap', price: 500 },
    { name: 'Grill Shawarma', price: 350 },
  ].map((p, i) => ({
    categoryId: catMap['roll-and-wrap'],
    name: p.name,
    slug: makeSlug(p.name),
    description: p.description || '',
    price: p.price || null,
    variants: p.variants || [],
    isFeatured: p.isFeatured || false,
    sortOrder: i + 1,
  }));

  const grillProducts = [
    { name: 'Cocktail Grill Burger', price: 420 },
    { name: 'Peri Peri Burger', price: 420 },
    { name: 'Jalapeno Burger', price: 420 },
    { name: 'My Pizza Special', price: 480, isFeatured: true },
    { name: 'Grilled Wings 5 Pcs', price: 350 },
    { name: 'Cheesy Grilled Wings 5 Pcs', price: 470 },
  ].map((p, i) => ({
    categoryId: catMap['grill-corner'],
    name: p.name,
    slug: makeSlug(p.name),
    price: p.price,
    isFeatured: p.isFeatured || false,
    sortOrder: i + 1,
  }));

  const sandwichProducts = [
    { name: 'Chicken Sandwich', price: 400 },
    { name: 'Club Sandwich', price: 400 },
    { name: 'Zinger Sandwich', price: 430 },
    { name: 'Grill Sandwich', price: 480 },
  ].map((p, i) => ({
    categoryId: catMap['sandwich'],
    name: p.name,
    slug: makeSlug(p.name),
    price: p.price,
    sortOrder: i + 1,
  }));

  const potatoProducts = [
    { name: 'Loaded Fries S', price: 400, isFeatured: true },
    { name: 'Loaded Fries L', price: 600 },
    { name: 'Plain Fries S', price: 150 },
    { name: 'Plain Fries M', price: 250 },
    { name: 'Plain Fries Family Pack', price: 400 },
    { name: 'Garlic Mayo Fries Half', price: 300 },
    { name: 'Garlic Mayo Fries Full', price: 400 },
    { name: 'B.B.Q Masala Fries Half', price: 300 },
    { name: 'B.B.Q Masala Fries Full', price: 400 },
    { name: 'Cheesy Fries Half', price: 300 },
    { name: 'Cheesy Fries Full', price: 400 },
  ].map((p, i) => ({
    categoryId: catMap['potato-corner'],
    name: p.name,
    slug: makeSlug(p.name),
    price: p.price,
    isFeatured: p.isFeatured || false,
    sortOrder: i + 1,
  }));

  const pastaProducts = [
    { name: 'Alfredo Pasta', price: 700 },
    { name: 'Crunchy Chicken Pasta', price: 850, isFeatured: true },
  ].map((p, i) => ({
    categoryId: catMap['pasta'],
    name: p.name,
    slug: makeSlug(p.name),
    price: p.price,
    isFeatured: p.isFeatured || false,
    sortOrder: i + 1,
  }));

  const beverageProducts = [
    { name: 'Half Liter', price: 120 },
    { name: '1.5 Liter', price: 200 },
    { name: 'Jumbo Drink', price: 250 },
    { name: 'Mineral Water S', price: 70 },
    { name: 'Mineral Water L', price: 120 },
  ].map((p, i) => ({
    categoryId: catMap['beverages'],
    name: p.name,
    slug: makeSlug(p.name),
    price: p.price,
    sortOrder: i + 1,
  }));

  const allProducts = [
    ...pizzaProducts,
    ...fryerProducts,
    ...rollWrapProducts,
    ...grillProducts,
    ...sandwichProducts,
    ...potatoProducts,
    ...pastaProducts,
    ...beverageProducts,
  ];

  const insertedProducts = await Product.insertMany(allProducts);
  console.log(`✅ ${insertedProducts.length} products created`);

  // ─── Deals ─────────────────────────────────────────────────────────────────
  const dealsData = [
    {
      name: 'Pizza 1+1 Small',
      slug: 'pizza-1-1-small',
      description: 'Buy 1 Small Pizza, Get 1 Free!',
      type: 'promotion',
      price: 1000,
      items: [{ productNameSnapshot: 'Small Pizza x2', quantity: 2 }],
      sortOrder: 1,
    },
    {
      name: 'Pizza 1+1 Medium',
      slug: 'pizza-1-1-medium',
      description: 'Buy 1 Medium Pizza, Get 1 Free!',
      type: 'promotion',
      price: 1900,
      items: [{ productNameSnapshot: 'Medium Pizza x2', quantity: 2 }],
      sortOrder: 2,
    },
    {
      name: 'Pizza 1+1 Large',
      slug: 'pizza-1-1-large',
      description: 'Buy 1 Large Pizza, Get 1 Free!',
      type: 'promotion',
      price: 2800,
      items: [{ productNameSnapshot: 'Large Pizza x2', quantity: 2 }],
      sortOrder: 3,
    },
    {
      name: 'Pizza 1+1 X-Large',
      slug: 'pizza-1-1-xlarge',
      description: 'Buy 1 X-Large Pizza, Get 1 Free!',
      type: 'promotion',
      price: 3700,
      items: [{ productNameSnapshot: 'X-Large Pizza x2', quantity: 2 }],
      sortOrder: 4,
    },
    {
      name: 'Combo 1',
      slug: 'combo-1',
      description: '1 Small Pizza + Patty Burger + Regular Shawarma + Half Liter',
      type: 'combo',
      price: 1050,
      items: [
        { productNameSnapshot: '1 Small Pizza', quantity: 1 },
        { productNameSnapshot: 'Patty Burger', quantity: 1 },
        { productNameSnapshot: 'Regular Shawarma', quantity: 1 },
        { productNameSnapshot: 'Half Liter Drink', quantity: 1 },
      ],
      sortOrder: 5,
    },
    {
      name: 'Combo 2',
      slug: 'combo-2',
      description: '1 Medium Pizza + Crunch Burger + Patty Burger + Regular Fries + 1.5 Liter',
      type: 'combo',
      price: 1850,
      items: [
        { productNameSnapshot: '1 Medium Pizza', quantity: 1 },
        { productNameSnapshot: 'Crunch Burger', quantity: 1 },
        { productNameSnapshot: 'Patty Burger', quantity: 1 },
        { productNameSnapshot: 'Regular Fries', quantity: 1 },
        { productNameSnapshot: '1.5 Liter Drink', quantity: 1 },
      ],
      sortOrder: 6,
    },
    {
      name: 'Combo 3',
      slug: 'combo-3',
      description: '1 Large Pizza + Cheesy Patty Burger + Club Sandwich + Regular Fries + 1.5 Liter',
      type: 'combo',
      price: 2450,
      items: [
        { productNameSnapshot: '1 Large Pizza', quantity: 1 },
        { productNameSnapshot: 'Cheesy Patty Burger', quantity: 1 },
        { productNameSnapshot: 'Club Sandwich', quantity: 1 },
        { productNameSnapshot: 'Regular Fries', quantity: 1 },
        { productNameSnapshot: '1.5 Liter Drink', quantity: 1 },
      ],
      sortOrder: 7,
    },
    {
      name: 'Family Deal',
      slug: 'family-deal',
      description: '1 Large Pizza + 2 Zinger Burgers + 10 Hot Wings + Pizza Paratha + Jumbo Drink',
      type: 'family',
      price: 3300,
      items: [
        { productNameSnapshot: '1 Large Pizza', quantity: 1 },
        { productNameSnapshot: 'Zinger Burger', quantity: 2 },
        { productNameSnapshot: 'Hot Wings 10 Pcs', quantity: 1 },
        { productNameSnapshot: 'Pizza Paratha', quantity: 1 },
        { productNameSnapshot: 'Jumbo Drink', quantity: 1 },
      ],
      sortOrder: 8,
    },
    {
      name: 'Deal 1',
      slug: 'deal-1',
      description: '2 Zinger Burgers + 5 Nuggets + Half Liter',
      type: 'deal',
      price: 900,
      items: [
        { productNameSnapshot: 'Zinger Burger', quantity: 2 },
        { productNameSnapshot: 'Nuggets 5 Pcs', quantity: 1 },
        { productNameSnapshot: 'Half Liter', quantity: 1 },
      ],
      sortOrder: 9,
    },
    {
      name: 'Deal 2',
      slug: 'deal-2',
      description: '4 Zinger Burgers + 10 Hot Wings + 1.5 Liter',
      type: 'deal',
      price: 1850,
      items: [
        { productNameSnapshot: 'Zinger Burger', quantity: 4 },
        { productNameSnapshot: 'Hot Wings 10 Pcs', quantity: 1 },
        { productNameSnapshot: '1.5 Liter', quantity: 1 },
      ],
      sortOrder: 10,
    },
    {
      name: 'Deal 3',
      slug: 'deal-3',
      description: '3 Small Shawarma + Small Fries + Half Liter',
      type: 'deal',
      price: 850,
      items: [
        { productNameSnapshot: 'Small Shawarma', quantity: 3 },
        { productNameSnapshot: 'Plain Fries S', quantity: 1 },
        { productNameSnapshot: 'Half Liter', quantity: 1 },
      ],
      sortOrder: 11,
    },
    {
      name: 'Deal 4',
      slug: 'deal-4',
      description: '1 Small Pizza + 1 Zinger Burger + 1 Small Fries + Half Liter',
      type: 'deal',
      price: 1050,
      items: [
        { productNameSnapshot: '1 Small Pizza', quantity: 1 },
        { productNameSnapshot: 'Zinger Burger', quantity: 1 },
        { productNameSnapshot: 'Plain Fries S', quantity: 1 },
        { productNameSnapshot: 'Half Liter', quantity: 1 },
      ],
      sortOrder: 12,
    },
    {
      name: 'Deal 5',
      slug: 'deal-5',
      description: '1 Small Loaded Fries + 1 Club Sandwich + 1 Medium Shawarma + Half Liter',
      type: 'deal',
      price: 1100,
      items: [
        { productNameSnapshot: 'Loaded Fries S', quantity: 1 },
        { productNameSnapshot: 'Club Sandwich', quantity: 1 },
        { productNameSnapshot: 'Medium Shawarma', quantity: 1 },
        { productNameSnapshot: 'Half Liter', quantity: 1 },
      ],
      sortOrder: 13,
    },
    {
      name: 'Deal 6',
      slug: 'deal-6',
      description: '1 Zinger Patty Burger + 5 Wings + Half Liter',
      type: 'deal',
      price: 850,
      items: [
        { productNameSnapshot: 'Zinger Patty Burger', quantity: 1 },
        { productNameSnapshot: 'Hot Wings 5 Pcs', quantity: 1 },
        { productNameSnapshot: 'Half Liter', quantity: 1 },
      ],
      sortOrder: 14,
    },
    {
      name: 'Deal 7',
      slug: 'deal-7',
      description: '3 Fried Chicken Pieces + 1 Small Fries + Half Liter',
      type: 'deal',
      price: 900,
      items: [
        { productNameSnapshot: 'Fried Chicken 1 Pc', quantity: 3 },
        { productNameSnapshot: 'Plain Fries S', quantity: 1 },
        { productNameSnapshot: 'Half Liter', quantity: 1 },
      ],
      sortOrder: 15,
    },
    {
      name: 'Deal 8',
      slug: 'deal-8',
      description: '6 Fried Chicken Pieces + 10 Nuggets + 1.5 Liter',
      type: 'deal',
      price: 1950,
      items: [
        { productNameSnapshot: 'Fried Chicken 1 Pc', quantity: 6 },
        { productNameSnapshot: 'Nuggets 5 Pcs', quantity: 2 },
        { productNameSnapshot: '1.5 Liter', quantity: 1 },
      ],
      sortOrder: 16,
    },
  ];

  await Deal.insertMany(dealsData);
  console.log(`✅ ${dealsData.length} deals created`);

  console.log('\n🎉 Seed complete!');
  console.log(`Admin email: ${process.env.ADMIN_EMAIL || 'admin@mypizza.com'}`);
  console.log(`Admin password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
  process.exit(0);
};

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
