
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                UM
              </span>
              <span className="font-semibold text-lg">UserManage</span>
            </Link>
            <p className="text-gray-600 text-sm max-w-xs">
              Streamlined user management platform for businesses, with elegant design and powerful features.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary text-sm">Home</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-primary text-sm">Services</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary text-sm">About Us</Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-600 hover:text-primary text-sm">Features</Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-600 hover:text-primary text-sm">Testimonials</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-primary text-sm">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-primary text-sm">Terms of Service</Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-600 hover:text-primary text-sm">Cookie Policy</Link>
              </li>
              <li>
                <Link to="/gdpr" className="text-gray-600 hover:text-primary text-sm">GDPR Compliance</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 text-sm">123 Innovation St, Tech City, TC 10101</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary" />
                <span className="text-gray-600 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <span className="text-gray-600 text-sm">contact@usermanage.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} UserManage. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/contact" className="text-gray-500 hover:text-primary text-sm">
              Support
            </Link>
            <Link to="/faq" className="text-gray-500 hover:text-primary text-sm">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
