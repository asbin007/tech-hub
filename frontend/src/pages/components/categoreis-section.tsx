import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface Category {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  count: string;
  image: string;
  color: string;
  slug?: string;  // optional slug if you want a URL-safe param
}

const CategoriesSection = ({ categories }: { categories: Category[] }) => {
  return (
    <section className="py-20" aria-label="Shop by Category">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Discover laptops tailored to your specific needs and preferences
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const categorySlug = category.slug || category.name.toLowerCase().replace(/\s+/g, '-');
            const categoryLink = `/${categorySlug}`;

            return (
              <div
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden bg-white rounded-lg"
              >
                <Link to={categoryLink} className="block">
                  <div className="relative h-48 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90`}></div>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <category.icon className="h-16 w-16 text-white group-hover:scale-110 transition-transform" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-500 mb-4">{category.count}</p>
                    <div className="border border-gray-300 text-gray-700 bg-white font-medium px-4 py-1 rounded-md transition-all flex items-center justify-center mx-auto w-max">
                      Explore
                      <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
