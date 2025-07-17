import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/2star logo.jpg" 
                alt="2Star Car Wash" 
                className="h-10 w-10 object-contain"
              />
              <span className="text-xl font-bold">2Star Car Wash</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Premium car wash and auto services providing exceptional quality and customer satisfaction. 
              Your car deserves the best care, and we deliver it with passion and precision.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/2star_car_wash"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="https://facebook.com/2star_car_wash"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="https://wa.me/255713366464" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Phone className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">+255 713 366464</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">bimoga77@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">Dar es Salaam, Tanzania</span>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Working Hours</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-gray-300">Mon - Fri: 8:00 AM - 6:00 PM</p>
                  <p className="text-gray-300">Sat - Sun: 9:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 2Star Car Wash. All rights reserved. Built with excellence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;