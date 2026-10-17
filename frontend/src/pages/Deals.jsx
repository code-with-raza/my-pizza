import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { fetchDeals } from '../services/api';
import DealCard from '../components/menu/DealCard';
import { LoadingSkeleton } from '../components/common/UI';

export default function Deals() {
  const { data: deals = [], isLoading } = useQuery({ queryKey: ['deals'], queryFn: fetchDeals });

  const grouped = {
    promotion: deals.filter((d) => d.type === 'promotion'),
    combo:     deals.filter((d) => d.type === 'combo'),
    family:    deals.filter((d) => d.type === 'family'),
    deal:      deals.filter((d) => d.type === 'deal'),
  };

  const sections = [
    { key: 'promotion', label: 'Pizza 1+1 Offers',  tag: '🎉 Hot Promotions' },
    { key: 'combo',     label: 'Combo Deals',        tag: '🍱 Great Value' },
    { key: 'family',    label: 'Family Deals',       tag: '👨‍👩‍👧‍👦 Feed the Family' },
    { key: 'deal',      label: 'Value Deals',        tag: '🔥 Unbeatable Prices' },
  ];

  return (
    <div className="min-h-screen bg-[#0e0c0c] pt-24 pb-20">
      <div className="max-w-7xl mx-auto container-px">

        {/* Hero banner */}
        <div className="relative rounded-3xl overflow-hidden mb-16 p-10 sm:p-14 bg-gradient-to-br from-[#1a0a08] to-[#0e0c0c] border border-brand-red/20">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-brand-red/20 blur-[80px] pointer-events-none"
          />
          <div className="relative">
            <span className="section-tag">💰 Deals &amp; Combos</span>
            <h1 className="section-heading text-white mb-3">Today's Best Deals</h1>
            <div className="glow-divider mx-0 mt-2 mb-4" />
            <p className="text-gray-400 max-w-xl leading-relaxed">
              Incredible value combos, family packs, and pizza 1+1 promotions. More food, less money!
            </p>
          </div>
        </div>

        {isLoading ? (
          <LoadingSkeleton count={6} />
        ) : (
          <div className="space-y-16">
            {sections.map(({ key, label, tag }) =>
              grouped[key]?.length > 0 ? (
                <section key={key}>
                  <div className="flex items-center gap-4 mb-8">
                    <div>
                      <span className="section-tag">{tag}</span>
                      <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">{label}</h2>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {grouped[key].map((deal, i) => (
                      <motion.div
                        key={deal._id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                      >
                        <DealCard deal={deal} />
                      </motion.div>
                    ))}
                  </div>
                </section>
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
}
