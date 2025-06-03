import { Laptop } from "lucide-react"
import {Link} from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <Laptop className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">TechHub</span>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Your premier destination for cutting-edge laptops and exceptional customer service. We bring you the
              latest technology at unbeatable prices.
            </p>
            <div className="flex gap-4">
              <div className="bg-slate-800 p-3 rounded-xl hover:bg-slate-700 transition-colors cursor-pointer">
                <div className="w-5 h-5 bg-blue-500 rounded"></div>
              </div>
              <div className="bg-slate-800 p-3 rounded-xl hover:bg-slate-700 transition-colors cursor-pointer">
                <div className="w-5 h-5 bg-pink-500 rounded"></div>
              </div>
              <div className="bg-slate-800 p-3 rounded-xl hover:bg-slate-700 transition-colors cursor-pointer">
                <div className="w-5 h-5 bg-blue-400 rounded"></div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Products</h3>
            <ul className="space-y-3 text-slate-300">
              <li>
                <Link to="/gaming" className="hover:text-white transition-colors">
                  Gaming Laptops
                </Link>
              </li>
              <li>
                <Link to="/business" className="hover:text-white transition-colors">
                  Business Laptops
                </Link>
              </li>
              <li>
                <Link to="/ultrabooks" className="hover:text-white transition-colors">
                  Ultrabooks
                </Link>
              </li>
              <li>
                <Link to="/workstations" className="hover:text-white transition-colors">
                  Workstations
                </Link>
              </li>
              <li>
                <Link to="/accessories" className="hover:text-white transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-3 text-slate-300">
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-white transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="hover:text-white transition-colors">
                  Warranty
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Company</h3>
            <ul className="space-y-3 text-slate-300">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/press" className="hover:text-white transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-slate-400">&copy; {new Date().getFullYear()} TechHub. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0 text-slate-400">
            <span>Secure payments powered by</span>
            <div className="flex gap-2">
              <div className="bg-slate-800 px-3 py-1 rounded text-xs">VISA</div>
              <div className="bg-slate-800 px-3 py-1 rounded text-xs">MC</div>
              <div className="bg-slate-800 px-3 py-1 rounded text-xs">AMEX</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
