import { useContext } from 'react';
import { CartContext } from './cart/context.jsx';

export default function AsymmetricCard({ product, size, gradientFrom, gradientTo, isLight = false }) {
  const { addItem } = useContext(CartContext);

  const sizeClasses = {
    spotlight: "w-full lg:w-[30%] h-[46vh] lg:h-[80vh]",
    large: "w-full sm:w-3/5 h-[46vh] lg:h-[40vh]",
    medium: "w-full sm:w-2/5 h-[46vh] lg:h-[40vh]"
  };

  const bgClass = gradientFrom && gradientTo 
    ? `bg-gradient-to-br ${gradientFrom} ${gradientTo}`
    : "bg-stone-900/40 backdrop-blur";

  const textColor = isLight ? "text-white" : "text-stone-100";

  return (
    <div className={`${sizeClasses[size]} relative rounded-xl border border-stone-100/15 ${bgClass} p-4 overflow-hidden group`}>
      {/* Badge */}
      {product.tag && (
        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-bold ${
          isLight 
            ? "bg-white/15 text-white border border-white/25"
            : "bg-stone-100/10 text-stone-200 border border-stone-100/15"
        }`}>
          {product.tag}
        </span>
      )}

      {/* Product Info */}
      <div className={`relative z-20 max-w-[60%] pr-3 ${size === 'spotlight' ? 'text-center max-w-none pr-0' : ''}`}>
        <h3 className={`mt-2 font-serif text-lg leading-snug ${textColor} ${size === 'spotlight' ? 'text-xl' : ''}`}>
          {product.name}
        </h3>
        <p className={`text-sm mt-1 ${isLight ? 'text-white/80' : 'text-stone-400'} line-clamp-2`}>
          {product.description}
        </p>
      </div>

      {/* Image */}
      <div className={`absolute ${
        size === 'spotlight' 
          ? 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%]'
          : 'left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[80%] sm:left-auto sm:right-3 sm:translate-x-0 sm:w-[58%] md:right-5 md:w-[56%] lg:right-6 lg:w-[54%]'
      } z-10 transition-transform duration-700 ease-out group-hover:scale-105`}>
        <div className="w-full h-32 bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-lg flex items-center justify-center text-stone-500">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="9" cy="9" r="2"/>
            <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
          </svg>
        </div>
      </div>

      {/* CTA */}
      <div className="absolute left-4 bottom-4 z-30">
        <div className="flex flex-col gap-2">
          <span className={`text-lg font-semibold ${textColor}`}>
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addItem(product)}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
              isLight
                ? "bg-white/90 text-stone-900 hover:bg-white"
                : size === 'spotlight'
                  ? "bg-gradient-to-br from-amber-400 to-amber-600 text-stone-900 shadow-lg"
                  : "bg-amber-500/15 text-amber-200 border border-amber-500/25 hover:bg-amber-500/25"
            }`}
          >
            {size === 'spotlight' ? 'Shop now' : 'Add to Cart'}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}