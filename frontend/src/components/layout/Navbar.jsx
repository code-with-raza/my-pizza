import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Phone, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '../../store/cartStore';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/deals', label: 'Deals' },
  { to: '/branches', label: 'Branches' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navBg = scrolled
    ? 'bg-[#0e0c0c]/98 backdrop-blur-md shadow-2xl border-b border-white/5'
    : 'bg-gradient-to-b from-[#0e0c0c]/90 to-transparent backdrop-blur-sm';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="max-w-7xl mx-auto container-px">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-brand-yellow flex items-center justify-center font-heading font-900 text-brand-black text-lg lg:text-xl group-hover:scale-110 transition-transform duration-200">
              MP
            </div>
            <div className="hidden sm:block">
              <div className="font-heading font-800 text-white text-lg leading-tight">My Pizza</div>
              <div className="font-body text-brand-yellow text-xs">Little Place Big Taste!</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl font-heading font-semibold text-sm transition-all duration-200 ${
                    isActive
                      ? 'text-brand-yellow bg-brand-yellow/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:03099408899"
              className="flex items-center gap-2 text-gray-300 hover:text-brand-yellow transition-colors font-body text-sm"
            >
              <Phone size={15} />
              Order: 0309 940 8899
            </a>
            <button
              onClick={() => navigate('/cart')}
              className="relative btn-primary py-2.5 px-5"
              id="navbar-cart-btn"
              aria-label={`Cart with ${itemCount} items`}
            >
              <ShoppingCart size={18} />
              <span>Cart</span>
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-brand-red text-white text-xs rounded-full flex items-center justify-center font-bold"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 text-white"
              aria-label={`Cart with ${itemCount} items`}
            >
              <ShoppingCart size={22} />
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-brand-red text-white text-[10px] rounded-full flex items-center justify-center font-bold"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-gray-900 border-t border-white/5 overflow-hidden"
          >
            <nav className="container-px py-4 space-y-1">
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl font-heading font-semibold transition-all ${
                      isActive
                        ? 'text-brand-yellow bg-brand-yellow/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <div className="pt-2 border-t border-white/5">
                <a
                  href="tel:03099408899"
                  className="flex items-center gap-2 px-4 py-3 text-brand-yellow font-heading font-semibold"
                >
                  <Phone size={16} />
                  Order: 0309 940 8899
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
