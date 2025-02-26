import React from 'react';
import { useAppContext } from '../context/AppContext';
import { format, parseISO } from 'date-fns';
import { AlertTriangle, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Notifications: React.FC = () => {
  const { expiringItems, addToShoppingList } = useAppContext();

  const handleAddToShoppingList = (name: string) => {
    addToShoppingList({
      name,
      quantity: 1,
      unit: 'item',
      category: 'Other' as any,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <Link to="/" className="mr-4 text-gray-600 hover:text-gray-800">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
      </div>

      {expiringItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <AlertTriangle size={48} className="mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No Expiring Items</h3>
          <p className="text-gray-500">
            You don't have any items expiring soon. Great job managing your inventory!
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  You have {expiringItems.length} item{expiringItems.length > 1 ? 's' : ''} expiring soon.
                </p>
              </div>
            </div>
          </div>
          
          <ul className="divide-y divide-gray-200">
            {expiringItems.map((item) => (
              <li key={item.id} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-800">{item.name}</div>
                    <div className="text-sm text-gray-500">
                      {item.quantity} {item.unit} · {item.category}
                    </div>
                    <div className="text-xs text-red-500">
                      Expires: {format(parseISO(item.expiryDate), 'MMM d, yyyy')}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleAddToShoppingList(item.name)}
                      className="flex items-center text-sm text-green-600 hover:text-green-800"
                    >
                      <ShoppingCart size={16} className="mr-1" />
                      Add to List
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-green-800 mb-2">Tips to Reduce Food Waste</h2>
        <ul className="list-disc list-inside text-green-700 space-y-1">
          <li>Use expiring items in recipes first</li>
          <li>Freeze items before they expire to extend their life</li>
          <li>Share food with neighbors or donate to food banks</li>
          <li>Turn overripe fruits into smoothies or baked goods</li>
        </ul>
      </div>
    </div>
  );
};

export default Notifications;