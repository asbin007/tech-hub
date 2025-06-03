import { ArrowRight, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-0 px-3 py-1 rounded-md flex items-center">
                <Zap className="h-3 w-3 mr-1" aria-hidden="true" />
                New Year Sale
              </span>
              <span className="bg-white/20 text-white border border-white/30 px-3 py-1 rounded-md">
                Up to 30% OFF
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Find Your
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Perfect Laptop
              </span>
            </h1>

            <p className="text-xl text-blue-100 leading-relaxed max-w-lg">
              Discover cutting-edge laptops from top brands. Whether you're gaming, creating, or working – we have the
              perfect machine for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="bg-white text-slate-900 hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl flex items-center justify-center"
                aria-label="Shop now"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </button>
              <button
                className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-8 py-3 rounded-xl"
                aria-label="View deals"
              >
                View Deals
              </button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-blue-200">Models Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-blue-200">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.9★</div>
                <div className="text-sm text-blue-200">Customer Rating</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Featured Laptop Collection"
                className="rounded-2xl shadow-2xl w-full max-w-[700px] h-auto"
              />
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-bold text-lg shadow-lg">
                Save up to 30%
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
