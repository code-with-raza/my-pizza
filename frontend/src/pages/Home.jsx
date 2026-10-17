import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Phone, Star, MapPin, Flame, Clock, Zap } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchDeals, fetchBranches } from '../services/api';
import ProductCard from '../components/menu/ProductCard';
import ProductModal from '../components/menu/ProductModal';
import DealCard from '../components/menu/DealCard';
import SectionHeading from '../components/common/UI';
import { LoadingSkeleton } from '../components/common/UI';

const CATEGORIES = [
  { img: '/img-pizza.jpg',    name: 'Pizza',     slug: 'pizza' },
  { img: '/img-burger.jpg',   name: 'Burgers',   slug: 'from-the-fryer' },
  { img: '/img-shawarma.jpg', name: 'Wraps',     slug: 'roll-and-wrap' },
  { img: '/img-grill.jpg',    name: 'Grill',     slug: 'grill-corner' },
  { img: '/img-sandwich.jpg', name: 'Sandwich',  slug: 'sandwich' },
  { img: '/img-fries.jpg',    name: 'Fries',     slug: 'potato-corner' },
  { img: '/img-pasta.jpg',    name: 'Pasta',     slug: 'pasta' },
  { img: '/img-beverage.jpg', name: 'Drinks',    slug: 'beverages' },
];

const STATS = [
  { icon: Star, value: '4.9★', label: 'Customer Rating' },
  { icon: Clock, value: '30min', label: 'Avg Delivery' },
  { icon: Flame, value: '50+', label: 'Menu Items' },
  { icon: Zap, value: '2', label: 'Locations' },
];

export default function Home() {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const { data: featuredProducts = [], isLoading: loadingProducts } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => fetchProducts({ featured: 'true' }),
  });

  const { data: deals = [], isLoading: loadingDeals } = useQuery({
    queryKey: ['deals'],
    queryFn: fetchDeals,
  });

  const { data: branches = [] } = useQuery({
    queryKey: ['branches'],
    queryFn: fetchBranches,
  });

  return (
    <div className="min-h-screen bg-[#0e0c0c] overflow-x-hidden">

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">

        {/* BG image with parallax */}
        <motion.div style={{ scale: imgScale }} className="absolute inset-0 z-0">
          <img
            src="/hero-pizza.jpg"
            alt="My Pizza"
            className="w-full h-full object-cover object-center"
          />
          {/* Multi-layer gradients for left text area */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0c0c] via-[#0e0c0ccc] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0c] via-transparent to-[#0e0c0c]/60" />
        </motion.div>

        {/* Animated red flare */}
        <motion.div
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute right-1/4 top-1/3 w-[600px] h-[600px] rounded-full bg-brand-red/20 blur-[120px] z-0 pointer-events-none"
        />

        {/* Hero content */}
        <motion.div
          style={{ y: textY, opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto container-px w-full pt-28 sm:pt-32 pb-16"
        >
          <div className="max-w-2xl">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-tag">
                <Flame size={13} className="text-brand-orange" />
                Lahore's Favourite Pizza Place
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading font-black text-6xl sm:text-7xl lg:text-8xl leading-[0.9] mb-2"
            >
              <span className="text-white block">Little</span>
              <span className="text-white block">Place</span>
              <span className="text-gradient-yellow block">Big Taste!</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-gray-300 text-base sm:text-lg mt-5 mb-8 max-w-lg leading-relaxed"
            >
              Handcrafted pizzas, juicy burgers, shawarma rolls, loaded fries &amp; more —
              freshly made and delivered hot.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link to="/menu" className="btn-primary text-base px-8 py-4 text-[15px]" id="hero-order-btn">
                Order Now <ArrowRight size={18} />
              </Link>
              <Link to="/deals" className="btn-outline text-base px-8 py-4 text-[15px]" id="hero-deals-btn">
                🔥 Hot Deals
              </Link>
            </motion.div>

            {/* Phone links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              {[
                { label: 'Wasan Pura', num: '0309 940 8899', tel: '+923099408899' },
                { label: 'Riwaz Garden', num: '0317 454 4884', tel: '+923174544884' },
              ].map((b) => (
                <a
                  key={b.tel}
                  href={`tel:${b.tel}`}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-brand-yellow transition-colors"
                >
                  <Phone size={13} />
                  <span className="text-gray-600">{b.label}:</span> {b.num}
                </a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-gray-600"
        >
          <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-gray-600" />
          <span className="text-xs tracking-widest uppercase">Scroll</span>
        </motion.div>
      </section>

      {/* ══ STATS BAR ═════════════════════════════════════════════════════ */}
      <section className="bg-brand-yellow py-5">
        <div className="max-w-7xl mx-auto container-px">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-3"
              >
                <Icon size={20} className="text-brand-black/60 shrink-0" />
                <div>
                  <div className="font-heading font-black text-brand-black text-lg leading-none">{value}</div>
                  <div className="text-brand-black/60 text-xs font-body">{label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CATEGORY GRID ═════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto container-px">
          <div className="text-center mb-12">
            <span className="section-tag">🍽️ What Are You Craving?</span>
            <h2 className="section-heading text-white">Browse by Category</h2>
            <div className="glow-divider mt-4" />
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4">
            {CATEGORIES.map((cat, i) => (
              <motion.button
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -6, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/menu?category=${cat.slug}`)}
                className="flex flex-col items-center gap-2 group"
                id={`home-cat-${cat.slug}`}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shadow-card group-hover:shadow-glow-yellow transition-all duration-300">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-gray-500 group-hover:text-brand-yellow text-xs font-heading font-semibold transition-colors text-center leading-tight">
                  {cat.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DEAL BANNER ═══════════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0c0c] via-[#1a0a08] to-[#0e0c0c]" />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-brand-red/25 blur-[100px]"
          />
        </div>

        <div className="relative max-w-7xl mx-auto container-px">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text side */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-tag">🎉 Limited Time</span>
              <h2 className="font-heading font-black text-5xl sm:text-6xl text-white leading-tight mb-4">
                Super Deals
                <span className="block text-gradient-yellow">Today Only!</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Unbeatable combos, family packs, and 1+1 pizza offers. 
                More food, less money — order now before it's gone!
              </p>
              <div className="flex gap-4">
                <Link to="/deals" className="btn-primary text-base px-8 py-4">
                  See All Deals <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>

            {/* Deal badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative"
              >
                <div className="w-56 h-56 rounded-full overflow-hidden flex flex-col items-center justify-center text-center shadow-glow-red border-4 border-brand-red-light/30 relative">
                  <img src="/img-pizza.jpg" alt="Pizza Deal" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 rounded-full" />
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="font-heading font-black text-white text-4xl leading-none drop-shadow-lg">1+1</div>
                    <div className="font-heading font-bold text-brand-yellow text-lg drop-shadow-lg">PIZZA DEAL</div>
                    <div className="text-white/80 text-xs mt-1 drop-shadow">On Medium Pizzas</div>
                  </div>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-brand-yellow flex items-center justify-center shadow-glow-yellow"
                >
                  <span className="font-heading font-black text-brand-black text-xs text-center leading-tight">HOT<br/>DEAL</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ FEATURED DEALS ════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#111010]">
        <div className="max-w-7xl mx-auto container-px">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="section-tag">🔥 Hot Deals</span>
              <h2 className="section-heading text-white">Today's Specials</h2>
              <div className="glow-divider mt-3 mx-0" />
            </div>
            <Link to="/deals" className="btn-outline hidden sm:flex text-sm">
              All Deals <ArrowRight size={15} />
            </Link>
          </div>

          {loadingDeals ? (
            <LoadingSkeleton count={3} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {deals.slice(0, 3).map((deal, i) => (
                <motion.div
                  key={deal._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <DealCard deal={deal} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══ FEATURED PRODUCTS ═════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto container-px">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="section-tag">⭐ Best Sellers</span>
              <h2 className="section-heading text-white">Fan Favourites</h2>
              <div className="glow-divider mt-3 mx-0" />
            </div>
            <Link to="/menu" className="btn-outline hidden sm:flex text-sm">
              Full Menu <ArrowRight size={15} />
            </Link>
          </div>

          {loadingProducts ? (
            <LoadingSkeleton count={8} />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {featuredProducts.slice(0, 8).map((product, i) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.06 }}
                >
                  <ProductCard product={product} onOpenModal={setSelectedProduct} />
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Link to="/menu" className="btn-outline">Full Menu <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* ══ PIZZA SIZES ═══════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#111010] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-red/5 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto container-px">
          <div className="text-center mb-14">
            <span className="section-tag">🍕 Every Size</span>
            <h2 className="section-heading text-white">Choose Your Size</h2>
            <div className="glow-divider mt-3" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { size: 'Small', inch: '7"', emoji: '🍕', price: 'From Rs. 550' },
              { size: 'Medium', inch: '11"', emoji: '🍕', price: 'From Rs. 1,000' },
              { size: 'Large', inch: '14"', emoji: '🍕', price: 'From Rs. 1,500' },
              { size: 'X-Large', inch: '18"', emoji: '🍕', price: 'From Rs. 2,000' },
            ].map((s, i) => (
              <motion.button
                key={s.size}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/menu?category=pizza')}
                className="card p-6 text-center group cursor-pointer bg-[#1a1614] hover:border-brand-yellow/40 transition-all duration-300"
              >
              <motion.div
                  animate={{ scale: [1, 1 + i * 0.04, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  className="mb-4 block mx-auto rounded-full overflow-hidden"
                  style={{ width: `${2.5 + i * 0.4}rem`, height: `${2.5 + i * 0.4}rem` }}
                >
                  <img src="/pizza.jpg" alt="pizza" className="w-full h-full object-cover" />
                </motion.div>
                <div className="font-heading font-bold text-white text-lg mb-0.5">{s.size}</div>
                <div className="text-gray-500 text-sm mb-2">{s.inch}</div>
                <div className="price-tag text-sm">{s.price}</div>
              </motion.button>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/menu?category=pizza" className="btn-secondary text-base px-10 py-4">
              Order Pizza Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ BRANCHES ══════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto container-px">
          <div className="text-center mb-12">
            <span className="section-tag">📍 Find Us</span>
            <h2 className="section-heading text-white">Two Lahore Locations</h2>
            <div className="glow-divider mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {branches.map((branch, i) => (
              <motion.div
                key={branch._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6 group"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center shrink-0 group-hover:bg-brand-yellow/20 transition-colors">
                    <MapPin size={18} className="text-brand-yellow" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white text-lg leading-tight">{branch.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">{branch.address}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <a href={`tel:${branch.phones?.order?.replace(/\s/g, '')}`} className="btn-secondary py-2.5 px-5 text-sm flex-1 justify-center">
                    <Phone size={13} /> {branch.phones?.order}
                  </a>
                  <a href={`tel:${branch.phones?.branch?.replace(/\s/g, '')}`} className="btn-ghost border border-gray-700/50 rounded-xl text-sm flex-1 justify-center">
                    <Phone size={13} /> {branch.phones?.branch}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ═════════════════════════════════════════════════════ */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow-dark via-brand-yellow to-brand-orange" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
        />
        <div className="relative max-w-3xl mx-auto container-px text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-brand-black mb-4">
              Ready to Order?
            </h2>
            <p className="text-brand-black/70 text-lg mb-10">
              Browse our full menu and place your order — we'll take care of the rest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/menu"
                id="final-cta-btn"
                className="inline-flex items-center justify-center gap-2 bg-brand-black text-brand-yellow font-heading font-bold px-10 py-4 rounded-full hover:bg-gray-900 transition-all duration-200 text-lg shadow-lg"
              >
                Browse Menu <ArrowRight size={20} />
              </Link>
              <a
                href="tel:03099408899"
                className="inline-flex items-center justify-center gap-2 border-2 border-brand-black text-brand-black font-heading font-bold px-10 py-4 rounded-full hover:bg-brand-black/10 transition-all duration-200 text-lg"
              >
                <Phone size={20} /> Call to Order
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}
