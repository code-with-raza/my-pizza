import { motion } from 'framer-motion';

export function LoadingSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden bg-[#1a1614] border border-white/5 animate-pulse">
          <div className="h-44 bg-[#221e1e]" />
          <div className="p-4 space-y-3">
            <div className="h-3.5 bg-[#221e1e] rounded-full w-3/4" />
            <div className="h-3 bg-[#221e1e] rounded-full w-full" />
            <div className="h-3 bg-[#221e1e] rounded-full w-2/3" />
            <div className="flex justify-between items-center pt-1">
              <div className="h-4 bg-[#221e1e] rounded-full w-1/3" />
              <div className="w-9 h-9 bg-[#221e1e] rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ icon, title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      {icon && (
        <div className="w-20 h-20 rounded-full bg-[#1a1614] border border-white/5 flex items-center justify-center mb-6 text-4xl">
          {icon}
        </div>
      )}
      <h3 className="font-heading font-bold text-xl text-white mb-2">{title}</h3>
      {description && <p className="text-gray-500 max-w-sm mb-6">{description}</p>}
      {action}
    </motion.div>
  );
}

export function ErrorState({ message, retry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-red-900/20 border border-red-500/20 flex items-center justify-center mb-6 text-4xl">
        ⚠️
      </div>
      <h3 className="font-heading font-bold text-xl text-white mb-2">Something went wrong</h3>
      <p className="text-gray-500 max-w-sm mb-6">{message || 'Please try again.'}</p>
      {retry && <button onClick={retry} className="btn-outline">Try Again</button>}
    </motion.div>
  );
}

export default function SectionHeading({ tag, title, subtitle, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={center ? 'text-center' : ''}
    >
      {tag && <div className="section-tag">{tag}</div>}
      <h2 className="section-heading text-white mb-3">{title}</h2>
      {subtitle && <p className="text-gray-500 max-w-2xl mx-auto">{subtitle}</p>}
    </motion.div>
  );
}
