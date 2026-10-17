import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Phone, MapPin, ExternalLink } from 'lucide-react';
import { fetchBranches } from '../services/api';
import { LoadingSkeleton, ErrorState } from '../components/common/UI';

export default function Branches() {
  const { data: branches = [], isLoading, error } = useQuery({
    queryKey: ['branches'],
    queryFn: fetchBranches,
  });

  return (
    <div className="min-h-screen bg-brand-black pt-24 pb-20">
      <div className="max-w-5xl mx-auto container-px">
        <div className="mb-12 text-center">
          <span className="section-tag">📍 Find Us</span>
          <h1 className="section-heading text-white mb-3">Our Locations</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Two branches serving Lahore. Call your nearest branch to place an order or inquire about delivery in your area.
          </p>
        </div>

        {error ? (
          <ErrorState message={error.message} />
        ) : isLoading ? (
          <LoadingSkeleton count={2} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {branches.map((branch, i) => (
              <motion.div
                key={branch._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card-dark border border-white/10 p-8 rounded-3xl hover:border-brand-yellow/30 transition-all duration-300"
              >
                {/* Branch number badge */}
                <div className="w-12 h-12 rounded-2xl bg-brand-yellow flex items-center justify-center font-heading font-900 text-brand-black text-xl mb-6">
                  {i + 1}
                </div>

                <h2 className="font-heading font-800 text-2xl text-white mb-3">{branch.name}</h2>

                <div className="flex items-start gap-3 mb-6">
                  <MapPin size={18} className="text-brand-yellow mt-0.5 shrink-0" />
                  <p className="text-gray-300">{branch.address}</p>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl">
                    <div>
                      <div className="text-gray-500 text-xs mb-0.5">Order Phone</div>
                      <div className="font-heading font-700 text-white">{branch.phones?.order}</div>
                    </div>
                    <a
                      href={`tel:${branch.phones?.order?.replace(/\s/g, '')}`}
                      className="btn-secondary py-2.5 px-5 text-sm"
                      aria-label={`Call ${branch.name} to order`}
                    >
                      <Phone size={14} /> Call to Order
                    </a>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl">
                    <div>
                      <div className="text-gray-500 text-xs mb-0.5">Branch Phone</div>
                      <div className="font-heading font-700 text-white">{branch.phones?.branch}</div>
                    </div>
                    <a
                      href={`tel:${branch.phones?.branch?.replace(/\s/g, '')}`}
                      className="btn-ghost border border-gray-700 rounded-xl py-2.5 px-4 text-sm"
                    >
                      <Phone size={14} /> Call Branch
                    </a>
                  </div>
                </div>

                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(branch.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full"
                >
                  <ExternalLink size={16} /> Get Directions
                </a>

                <p className="text-gray-600 text-xs mt-4 text-center">
                  Delivery coverage and hours — please confirm with the branch directly.
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
