
interface Brand {
  name: string;
  logo: string;
}

const BrandsSection = ({ brands }: { brands: Brand[] }) => {
  return (
    <section className="py-12 bg-gray-50" aria-label="Trusted Brands">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-gray-500 font-medium">Trusted by leading brands worldwide</p>
        </div>
        <div className="flex items-center justify-center gap-12 flex-wrap opacity-60 hover:opacity-100 transition-opacity">
          {brands.map((brand, index) => (
            <div key={index} className="grayscale hover:grayscale-0 transition-all">
              <img
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                className="h-8 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;