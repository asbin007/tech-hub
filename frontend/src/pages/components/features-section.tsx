import { Award, Shield, Truck } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-slate-900 text-white" aria-label="Why Choose TechHub">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose TechHub?</h2>
          <p className="text-slate-300 text-lg">Experience the difference with our premium service</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Truck className="h-10 w-10 text-white" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-xl mb-3">Free Express Shipping</h3>
            <p className="text-slate-300 leading-relaxed">
              Lightning-fast delivery on all orders over $500. Get your laptop in 24-48 hours.
            </p>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Shield className="h-10 w-10 text-white" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-xl mb-3">Extended Warranty</h3>
            <p className="text-slate-300 leading-relaxed">
              Comprehensive protection with up to 3 years extended warranty on all laptops.
            </p>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Award className="h-10 w-10 text-white" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-xl mb-3">Expert Support</h3>
            <p className="text-slate-300 leading-relaxed">
              24/7 technical support from certified professionals. We're here when you need us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;