import React, { useState, useEffect } from 'react';
import { Calculator, Car, Sparkles, Crown } from 'lucide-react';

const PriceCalculator = () => {
  const [selectedService, setSelectedService] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [addOns, setAddOns] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const services = {
    'Express Wash': { price: 5000, icon: <Car className="h-6 w-6" /> },
    'Exterior Wash': { price: 10000, icon: <Car className="h-6 w-6" /> },
    'Interior Cleaning': { price: 15000, icon: <Sparkles className="h-6 w-6" /> },
    'Engine Wash': { price: 15000, icon: <Car className="h-6 w-6" /> },
    'Waxing & Polishing': { price: 15000, icon: <Sparkles className="h-6 w-6" /> },
    'VIP Complete Package': { price: 100000, icon: <Crown className="h-6 w-6" /> }
  };

  const vehicleMultipliers = {
    'Sedan': 1.0,
    'Hatchback': 0.9,
    'SUV': 1.3,
    'Pickup Truck': 1.4,
    'Van': 1.5,
    'Motorcycle': 0.6
  };

  const addOnServices = {
    'Air Freshener': 2000,
    'Tire Shine': 3000,
    'Paint Protection': 8000
  };

  useEffect(() => {
    if (selectedService && vehicleType) {
      const basePrice = services[selectedService as keyof typeof services].price;
      const multiplier = vehicleMultipliers[vehicleType as keyof typeof vehicleMultipliers];
      const addOnTotal = addOns.reduce((sum, addOn) => sum + addOnServices[addOn as keyof typeof addOnServices], 0);
      
      setTotalPrice(Math.round(basePrice * multiplier + addOnTotal));
    } else {
      setTotalPrice(0);
    }
  }, [selectedService, vehicleType, addOns]);

  const handleAddOnChange = (addOn: string) => {
    setAddOns(prev => 
      prev.includes(addOn) 
        ? prev.filter(item => item !== addOn)
        : [...prev, addOn]
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Calculator className="h-8 w-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Price Calculator</h2>
      </div>

      <div className="space-y-6">
        {/* Service Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Service
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(services).map(([service, details]) => (
              <label key={service} className="relative">
                <input
                  type="radio"
                  name="service"
                  value={service}
                  checked={selectedService === service}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="sr-only"
                />
                <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedService === service
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className="text-blue-600">{details.icon}</div>
                    <div>
                      <span className="font-medium text-gray-900 block">{service}</span>
                      <span className="text-sm text-gray-600">TZSH {details.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Vehicle Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Vehicle Type
          </label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select vehicle type</option>
            {Object.entries(vehicleMultipliers).map(([type, multiplier]) => (
              <option key={type} value={type}>
                {type} {multiplier !== 1.0 && `(${multiplier > 1 ? '+' : ''}${Math.round((multiplier - 1) * 100)}%)`}
              </option>
            ))}
          </select>
        </div>

        {/* Add-ons */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Add-on Services (Optional)
          </label>
          <div className="space-y-2">
            {Object.entries(addOnServices).map(([addOn, price]) => (
              <label key={addOn} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={addOns.includes(addOn)}
                  onChange={() => handleAddOnChange(addOn)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">{addOn}</span>
                <span className="text-gray-500 text-sm">+TZSH {price.toLocaleString()}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Total Price */}
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Estimated Total:</span>
            <span className="text-3xl font-bold text-blue-600">
              {totalPrice > 0 ? `TZSH ${totalPrice.toLocaleString()}` : 'Select options above'}
            </span>
          </div>
          {totalPrice > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              *Final price may vary based on vehicle condition and specific requirements
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;