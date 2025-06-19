import BrandsSection from "../components/brands-section";
import CategoriesSection from "../components/categoreis-section";
import FeaturesSection from "../components/features-section";
import Footer from "../components/footer";
import Hero from "../components/Hero";
import NewsletterSection from "../components/newsletter-section";
import { brands, categories } from "../datas/data";
import FeaturedProductsSection from "../products/ProductFilter";

const Home = () => {
  return (
    <div>
      <Hero />
      <BrandsSection brands={brands} />
      <CategoriesSection categories={categories} />
      <FeaturedProductsSection  />
      <FeaturesSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Home;
