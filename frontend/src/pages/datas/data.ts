import { Gamepad2, Laptop, Monitor, Smartphone } from 'lucide-react';
import { href } from 'react-router-dom';

export const featuredProducts = [
  {
    id: 1,
    name: "MacBook Pro 16-inch M3",
    brand: "Apple",
    price: 2399,
    originalPrice: 2599,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 324,
    badge: "Best Seller",
    specs: "M3 Pro • 18GB RAM • 512GB SSD",
    discount: 8,
  },
  {
    id: 2,
    name: "Dell XPS 13 Plus",
    brand: "Dell",
    price: 1299,
    originalPrice: 1599,
    image: "https://images.unsplash.com/photo-1587202372775-e3df9c4f6f4b?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviews: 189,
    badge: "Hot Deal",
    specs: "Intel i7 • 16GB RAM • 1TB SSD",
    discount: 19,
  },
  {
    id: 3,
    name: "ASUS ROG Strix G16",
    brand: "ASUS",
    price: 1899,
    originalPrice: 2199,
    image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 256,
    badge: "Gaming Beast",
    specs: "RTX 4070 • 32GB RAM • 1TB SSD",
    discount: 14,
  },
  {
    id: 4,
    name: "HP Spectre x360 14",
    brand: "HP",
    price: 1599,
    originalPrice: 1899,
    image: "https://images.unsplash.com/photo-1583121274602-bd09f240c02c?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    reviews: 167,
    badge: "2-in-1",
    specs: "Intel i7 • 16GB RAM • 512GB SSD",
    discount: 16,
  },
];

export const categories = [
  {
    name: "Gaming Laptops",
    icon: Gamepad2,
    count: "120+ models",
    image: "https://images.unsplash.com/photo-1611078489935-0cb964de46c5?auto=format&fit=crop&w=400&q=80",
    color: "from-red-500 to-orange-500",
  },
  {
    name: "Business Laptops",
    icon: Laptop,
    count: "85+ models",
    image: "https://images.unsplash.com/photo-1581090700227-1e8f62a3f4e1?auto=format&fit=crop&w=400&q=80",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Ultrabooks",
    icon: Monitor,
    count: "95+ models",
    image: "https://images.unsplash.com/photo-1618828662843-83a1d6c881aa?auto=format&fit=crop&w=400&q=80",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "2-in-1 Laptops",
    icon: Smartphone,
    count: "45+ models",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=400&q=80",
    color: "from-green-500 to-emerald-500",
  },
];

export const brands = [
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Dell", logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg" },
  { name: "HP", logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/HP_logo_2012.svg" },
  { name: "ASUS", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/ASUS_Logo.svg" },
  { name: "Lenovo", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Lenovo_logo.svg" },
  { name: "MSI", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/MSI_logo.svg" },
];
