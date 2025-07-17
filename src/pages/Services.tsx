import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Sparkles, Shield, Zap, Crown, ArrowRight, CheckCircle } from 'lucide-react';
import PriceCalculator from '../components/PriceCalculator';

const Services = () => {
  const services = [
    {
      icon: <Car className="h-12 w-12 text-blue-600" />,
      title: "Exterior Wash",
      price: "From TZSH 10000",
      description: "Complete exterior cleaning with premium soap and protective wax",
      features: [
        "Pre-wash rinse",
        "Hand wash with premium soap",
        "Wheel and tire cleaning",
        "Protective wax application",
        "Final rinse and dry"
      ],
      popular: false
    },
    {
      icon: <Sparkles className="h-12 w-12 text-blue-600" />,
      title: "Interior Cleaning",
      price: "From TZSH 15000",
      description: "Deep interior cleaning for a fresh and comfortable ride",
      features: [
        "Vacuum all surfaces",
        "Dashboard and console cleaning",
        "Seat cleaning and conditioning",
        "Window cleaning (interior)",
        "Air freshener application"
      ],
      popular: false
    },
    {
      icon: <Zap className="h-12 w-12 text-blue-600" />,
      title: "Engine Wash",
      price: "From TZSH 15000",
      description: "Professional engine bay cleaning and degreasing",
      features: [
        "Engine degreasing",
        "Pressure washing",
        "Component protection",
        "Final inspection",
        "Engine bay dressing"
      ],
      popular: false
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Waxing & Polishing",
      price: "From TZSH 15000",
      description: "Premium paint protection and shine enhancement",
      features: [
        "Paint inspection",
        "Clay bar treatment",
        "Machine polishing",
        "Premium wax application",
        "Final buffing"
      ],
      popular: true
    },
    {
      icon: <Crown className="h-12 w-12 text-blue-600" />,
      title: "VIP Complete Package",
      price: "From TZSH 100000",
      description: "The ultimate car care experience with all services included",
      features: [
        "Full exterior wash & wax",
        "Complete interior detailing",
        "Engine bay cleaning",
        "Tire shine & dressing",
        "Paint protection",
        "Air freshener",
        "Quality guarantee"
      ],
      popular: true
    },
    {
      icon: <Sparkles className="h-12 w-12 text-blue-600" />,
      title: "Express Wash",
      price: "From TZSH 5000",
      description: "Quick and efficient wash for busy schedules",
      features: [
        "Exterior rinse",
        "Soap application",
        "Basic wheel cleaning",
        "Quick dry",
        "15-minute service"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Premium Services
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Choose from our comprehensive range of professional car care services, 
            each designed to keep your vehicle looking and performing at its best.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20" id="services-list">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Service
            </h2>
            <p className="text-xl text-gray-600">
              Professional car care services tailored to your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  service.popular ? 'ring-2 ring-blue-500 relative' : ''
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6 mx-auto">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                    {service.title}
                  </h3>
                  
                  <p className="text-3xl font-bold text-blue-600 mb-4 text-center">
                    {service.price}
                  </p>
                  
                  <p className="text-gray-600 mb-6 text-center">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link
                    to="/booking"
                    state={{ selectedService: service.title }}
                    className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
                      service.popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    <span>Book This Service</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price Calculator */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Calculate Your Price
            </h2>
            <p className="text-xl text-gray-600">
              Get an instant estimate for your car wash service
            </p>
          </div>
          <PriceCalculator />
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Our Services Stand Out
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Eco-Friendly Products
                    </h3>
                    <p className="text-gray-600">
                      We use biodegradable, environmentally safe cleaning products that are gentle on your car and the planet.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Professional Equipment
                    </h3>
                    <p className="text-gray-600">
                      State-of-the-art equipment and tools ensure thorough cleaning without damaging your vehicle's surfaces.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Satisfaction Guarantee
                    </h3>
                    <p className="text-gray-600">
                      We stand behind our work with a 100% satisfaction guarantee. Not happy? We'll make it right.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <Crown className="h-24 w-24 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-blue-900 mb-2">Premium Quality</h3>
                <p className="text-blue-700">Every service delivered with excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Book Your Service?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Choose your preferred service and schedule an appointment that fits your schedule.
          </p>
          <Link
            to="/booking"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300"
          >
            <span>Book Now</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;