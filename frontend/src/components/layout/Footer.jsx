import { Link } from 'react-router-dom';
import { Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const BRANCHES = [
  {
    name: 'Wasan Pura Branch',
    address: 'Umer Din Road, Near Iftikhar Optical, Wasan Pura, Lahore',
    phone: '0309 940 8899',
    tel: '+923099408899',
  },
  {
    name: 'Riwaz Garden Branch',
    address: 'M.A.Q College, Near Haq Orthopedic Hospital, Riwaz Garden, Lahore',
    phone: '0317 454 4884',
    tel: '+923174544884',
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto container-px py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-brand-yellow flex items-center justify-center font-heading font-900 text-brand-black text-xl">
                MP
              </div>
              <div>
                <div className="font-heading font-800 text-white text-lg">My Pizza</div>
                <div className="text-brand-yellow text-xs font-body">Little Place Big Taste!</div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Lahore's favourite pizza place. Fresh ingredients, bold flavours, fast delivery.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-brand-yellow hover:text-brand-black text-gray-400 flex items-center justify-center transition-all duration-200"
                  aria-label="Social media"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-700 text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/menu', label: 'Menu' },
                { to: '/deals', label: 'Deals' },
                { to: '/branches', label: 'Branches' },
                { to: '/cart', label: 'Cart' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-400 hover:text-brand-yellow transition-colors text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches */}
          {BRANCHES.map((branch) => (
            <div key={branch.name}>
              <h3 className="font-heading font-700 text-white mb-4">{branch.name}</h3>
              <div className="space-y-3">
                <div className="flex gap-2 text-gray-400 text-sm">
                  <MapPin size={14} className="text-brand-yellow mt-0.5 shrink-0" />
                  <span>{branch.address}</span>
                </div>
                <a
                  href={`tel:${branch.tel}`}
                  className="flex items-center gap-2 text-brand-yellow hover:text-brand-yellow-light font-semibold text-sm transition-colors"
                >
                  <Phone size={14} />
                  {branch.phone}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} My Pizza, Lahore. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Prices and availability may vary. Please verify at time of order.
          </p>
        </div>
      </div>
    </footer>
  );
}
