import React from 'react';
import { useAppContext } from '../context/AppContext';
import { BarChart3, TrendingDown, Leaf, DollarSign } from 'lucide-react';

const Analytics: React.FC = () => {
  const { inventory } = useAppContext();
  
  // Mock data for analytics
  const wasteReduction = 68; // percentage
  const moneySaved = 124.50; // dollars
  const co2Reduced = 15.3; // kg
  
  // Calculate category distribution
  const categoryDistribution = inventory.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = 0;
    }
    acc[item.category]++;
    return acc;
  }, {} as Record<string, number>);
  
  // Sort categories by count
  const sortedCategories = Object.entries(categoryDistribution)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5); // Top 5 categories
  
  // Calculate total items
  const totalItems = inventory.length;
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Waste Reduction</h3>
            <TrendingDown className="text-green-600" size={20} />
          </div>
          <p className="text-2xl font-bold text-gray-800">{wasteReduction}%</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Money Saved</h3>
            <DollarSign className="text-green-600" size={20} />
          </div>
          <p className="text-2xl font-bold text-gray-800">${moneySaved}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">CO₂ Emissions Reduced</h3>
            <Leaf className="text-green-600" size={20} />
          </div>
          <p className="text-2xl font-bold text-gray-800">{co2Reduced} kg</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Items</h3>
            <BarChart3 className="text-blue-600" size={20} />
          </div>
          <p className="text-2xl font-bold text-gray-800">{totalItems}</p>
        </div>
      </div>
      
      {/* Category Distribution */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Food Category Distribution</h2>
        {sortedCategories.length > 0 ? (
          <div className="space-y-3">
            {sortedCategories.map(([category, count]) => {
              const percentage = Math.round((count / totalItems) * 100);
              return (
                <div key={category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{category}</span>
                    <span>{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-green-600 h-2.5 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No data available</p>
        )}
      </div>
      
      {/* Usage Trends */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Usage Trends</h2>
        <div className="flex justify-center items-center h-40 text-gray-500">
          <p>Historical data will appear here as you use the app</p>
        </div>
      </div>
      
      {/* Tips */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-green-800 mb-2">Sustainability Tips</h2>
        <ul className="list-disc list-inside text-green-700 space-y-1">
          <li>Store fruits and vegetables properly to extend their shelf life</li>
          <li>Freeze leftovers instead of throwing them away</li>
          <li>Plan your meals ahead to reduce impulse buying</li>
          <li>Use the "first in, first out" method when organizing your fridge</li>
        </ul>
      </div>
    </div>
  );
};

export default Analytics;