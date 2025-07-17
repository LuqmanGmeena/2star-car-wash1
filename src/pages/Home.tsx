import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Shield, Clock, Users, ArrowRight, CheckCircle } from 'lucide-react';
import ServiceTracker from '../components/ServiceTracker';

const Home = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Premium Quality",
      description: "Professional-grade equipment and eco-friendly products"
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "Quick Service",
      description: "Fast and efficient service without compromising quality"
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Expert Team",
      description: "Trained professionals who care about your vehicle"
    }
  ];

  const services = [
    "Exterior Wash & Wax",
    "Interior Deep Cleaning",
    "Engine Bay Cleaning",
    "Paint Protection",
    "VIP Detailing Packages"
  ];

  const testimonials = [
    {
      name: "Mwijaku Mwalimu",
      text: "Exceptional service! My car looks brand new every time.",
      rating: 5
    },
    {
      name: "Amina Juma",
      text: "Professional team and great attention to detail. Highly recommended!",
      rating: 5
    },
    {
      name: "Hassan Mwinyimkuu",
      text: "Best car wash in Dar es Salaam. Quality service at fair prices.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img 
                src="/2star logo.jpg" 
                alt="2Star Car Wash" 
                className="h-20 w-20 object-contain border-4 border-white rounded-lg shadow-lg bg-white p-2"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Premium Car Wash &<br />
              <span className="text-blue-300">Auto Services</span> in Dar es Salaam
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Experience the difference with our professional car care services. 
              Your vehicle deserves nothing but the best.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Book Now</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/services"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose 2Star Car Wash?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine years of experience with modern techniques to deliver exceptional results
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white" id="services-overview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Complete Auto Care Services
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                From basic washes to premium detailing, we offer comprehensive car care solutions 
                tailored to your vehicle's needs.
              </p>
              <div className="space-y-4 mb-8">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{service}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/services"
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                <span>Explore All Services</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-16 w-16 text-white" />
                  </div>
                  <p className="text-blue-800 font-semibold text-lg">Premium Service Guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Tracker */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Track Your Service
            </h2>
            <p className="text-xl text-gray-600">
              Stay updated on your car wash appointment status
            </p>
          </div>
          <ServiceTracker />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Give Your Car the Star Treatment?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Book your appointment today and experience the difference professional car care makes.
          </p>
          <Link
            to="/booking"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300"
          >
            <span>Book Your Service</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;