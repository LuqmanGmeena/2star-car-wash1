import React from 'react';
import { Users, Award, Clock, Heart, Target, Shield } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Quality First",
      description: "We never compromise on quality. Every service is delivered with meticulous attention to detail."
    },
    {
      icon: <Heart className="h-8 w-8 text-blue-600" />,
      title: "Customer Care",
      description: "Your satisfaction is our priority. We treat every vehicle as if it were our own."
    },
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from service delivery to customer experience."
    }
  ];

  const stats = [
    { number: "5000+", label: "Happy Customers" },
    { number: "3+", label: "Years Experience" },
    { number: "15+", label: "Services Offered" },
    { number: "100%", label: "Satisfaction Rate" }
  ];

  const team = [
    {
      name: "Goodluck Meena",
      role: "Founder & CEO",
      description: "Passionate about automotive care with over 5 years of industry experience."
    },
    {
      name: "Mchuga",
      role: "Operations Manager",
      description: "Ensures smooth operations and maintains our high service standards."
    },
    {
      name: "Bigi",
      role: "Lead Technician",
      description: "Expert in vehicle detailing with specialized training in paint protection."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img 
                src="/2star logo.jpg" 
                alt="2Star Car Wash" 
                className="h-20 w-20 object-contain border-4 border-white rounded-lg shadow-lg bg-white p-2"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About 2Star Car Wash
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We're more than just a car wash - we're your trusted partner in keeping your vehicle 
              looking its best while providing exceptional customer service.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-gray-600">
                <p>
                  Founded in 2022, 2Star Car Wash began with a simple mission: to provide 
                  premium car care services that exceed customer expectations. What started 
                  as a small operation has grown into Dar es salaam where you find as at Kigamboni as trusted name in automotive care.
                </p>
                <p>
                  Our founder, Goodluck Meena, recognized the need for professional, reliable, 
                  and eco-friendly car wash services in the city. With a background in automotive 
                  care and a passion for excellence, he assembled a team of dedicated professionals 
                  who share the same commitment to quality.
                </p>
                <p>
                  Today, we're proud to serve thousands of satisfied customers, offering everything 
                  from quick express washes to comprehensive detailing services. Our success is 
                  built on trust, quality, and the relationships we've formed with our community.
                </p>
                <div className="flex items-center space-x-4 pt-4">
                  <span className="text-gray-700 font-medium">Follow our journey:</span>
                  <a
                    href="https://instagram.com/2star_car_wash"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <span>@2star_car_wash</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <Award className="h-24 w-24 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-blue-900 mb-2">Excellence Award</h3>
                <p className="text-blue-700">Recognized for outstanding service quality</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission & Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're driven by our commitment to excellence and our dedication to providing 
              exceptional service to every customer.
            </p>
          </div>

          <div className="mb-16">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                To provide premium car wash and detailing services that not only clean and protect 
                vehicles but also deliver an exceptional customer experience. We strive to be the 
                most trusted and reliable car care service in Kigamboni, setting new standards for 
                quality, convenience, and environmental responsibility.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-blue-100">
              Numbers that reflect our commitment to excellence
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              The passionate professionals behind our exceptional service
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Working Hours */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Working Hours
              </h2>
              <p className="text-lg text-gray-600">
                We're here when you need us most
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Weekdays</h3>
                <p className="text-lg text-gray-600">Monday - Friday</p>
                <p className="text-2xl font-bold text-blue-600">8:00 AM - 6:00 PM</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Weekends</h3>
                <p className="text-lg text-gray-600">Saturday - Sunday</p>
                <p className="text-2xl font-bold text-blue-600">9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;