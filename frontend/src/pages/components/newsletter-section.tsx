import { useState } from 'react';
import { Award, Clock, Zap } from 'lucide-react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribed with email:', email);
    setEmail('');
  };

  return (
    <section
      className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden"
      aria-label="Newsletter Signup"
    >
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] bg-cover bg-center opacity-10"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Stay Ahead of the Tech Curve</h2>
          <p className="text-blue-100 mb-8 text-lg leading-relaxed">
            Join 50,000+ tech enthusiasts and get exclusive deals, early access to new products, and expert insights
            delivered to your inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8"
            aria-label="Newsletter subscription form"
          >
            <label htmlFor="email-input" className="sr-only">
              Enter your email address
            </label>
            <input
              id="email-input"
              type="email"
              placeholder="Enter your email address"
              className="bg-white/10 border border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm rounded-xl px-4 py-2 focus:outline-none w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-2 rounded-xl"
              aria-label="Subscribe to newsletter"
            >
              Subscribe
            </button>
          </form>

          <div className="flex items-center justify-center gap-8 text-sm text-blue-100">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span>Weekly Tech Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" aria-hidden="true" />
              <span>Exclusive Deals</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" aria-hidden="true" />
              <span>Expert Reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;