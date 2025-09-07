import AsymmetricCard from './AsymmetricCard';

export default function AsymmetricGrid({ products }) { 
  const [spotlightProduct, topLeft, topRight, bottomLeft, bottomRight] = products;

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-6 lg:gap-8 max-w-7xl mx-auto">
      {/* Left Spotlight */}
      <AsymmetricCard 
        product={spotlightProduct} 
        size="spotlight"
      />

      {/* Right Grid (2 rows) */}
      <div className="w-full lg:w-[70%] flex flex-col gap-6 lg:gap-8">
        {/* Top Row */}
        <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 h-[46vh] lg:h-[40vh]">
          <AsymmetricCard 
            product={topLeft} 
            size="large"
          />
          <AsymmetricCard 
            product={topRight} 
            size="medium"
            gradientFrom="from-violet-300"
            gradientTo="to-purple-900"
            isLight={true}
          />
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 h-[46vh] lg:h-[40vh]">
          <AsymmetricCard 
            product={bottomLeft} 
            size="medium"
          />
          <AsymmetricCard 
            product={bottomRight} 
            size="large"
            gradientFrom="from-emerald-900"
            gradientTo="to-emerald-400"
            isLight={true}
          />
        </div>
      </div>
    </div>
  );
}
