import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Using placeholder images from Pexels for demonstration
  const galleryImages = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/3354648/pexels-photo-3354648.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Professional car washing service",
      category: "Service"
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Clean luxury car after wash",
      category: "Results"
    },
    {
      id: 3,
      src: "https://images.pexels.com/photos/3354651/pexels-photo-3354651.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Car detailing process",
      category: "Process"
    },
    {
      id: 4,
      src: "https://images.pexels.com/photos/6872166/pexels-photo-6872166.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Interior cleaning service",
      category: "Interior"
    },
    {
      id: 5,
      src: "https://images.pexels.com/photos/3354649/pexels-photo-3354649.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Professional team at work",
      category: "Team"
    },
    {
      id: 6,
      src: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Shiny clean car exterior",
      category: "Results"
    },
    {
      id: 7,
      src: "https://images.pexels.com/photos/3354650/pexels-photo-3354650.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Car wash equipment",
      category: "Equipment"
    },
    {
      id: 8,
      src: "https://images.pexels.com/photos/6872167/pexels-photo-6872167.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Before and after comparison",
      category: "Results"
    },
    {
      id: 9,
      src: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Premium car after detailing",
      category: "Results"
    }
  ];

  const categories = ["All", "Service", "Results", "Process", "Interior", "Team", "Equipment"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Camera className="h-16 w-16 mx-auto mb-6 text-blue-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Work Gallery
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            See the quality of our work through these photos showcasing our services, 
            satisfied customers, and the amazing transformations we deliver.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => openModal(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <span className="inline-block bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">
                    {image.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="h-8 w-8" />
            </button>
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
            
            <img
              src={filteredImages[selectedImage].src}
              alt={filteredImages[selectedImage].alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-white text-lg font-medium">
                {filteredImages[selectedImage].alt}
              </p>
              <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mt-2">
                {filteredImages[selectedImage].category}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to See Your Car Transform?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Book your appointment today and experience the same quality service showcased in our gallery.
          </p>
          <p className="text-lg text-blue-200 mb-6">
            Follow us on Instagram 
            <a 
              href="https://instagram.com/2star_car_wash" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold hover:text-white transition-colors ml-1"
            >
              @2star_car_wash
            </a> 
            {" "}for more photos and updates!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/booking"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300"
            >
              Book Your Service
            </a>
            <a
              href="/services"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300"
            >
              View Services
            </a>
            <a
              href="https://instagram.com/2star_car_wash"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300"
            >
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;