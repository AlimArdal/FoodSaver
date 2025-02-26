import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { FoodCategory, FoodItem } from '../types';
import { format, parseISO } from 'date-fns';
import { Plus, Edit, Trash2, AlertTriangle } from 'lucide-react';

const Inventory: React.FC = () => {
  const { inventory, addFoodItem, updateFoodItem, removeFoodItem } = useAppContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [newItem, setNewItem] = useState<Omit<FoodItem, 'id'>>({
    name: '',
    category: FoodCategory.OTHER,
    quantity: 1,
    unit: 'pcs',
    purchaseDate: new Date().toISOString(),
    expiryDate: new Date().toISOString(),
  });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    addFoodItem(newItem);
    setNewItem({
      name: '',
      category: FoodCategory.OTHER,
      quantity: 1,
      unit: 'pcs',
      purchaseDate: new Date().toISOString(),
      expiryDate: new Date().toISOString(),
    });
    setShowAddForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const filteredInventory = filter === 'all' 
    ? inventory 
    : inventory.filter(item => item.category === filter);

  const isExpiringSoon = (date: string) => {
    const expiryDate = parseISO(date);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  const isExpired = (date: string) => {
    const expiryDate = parseISO(date);
    const today = new Date();
    return expiryDate < today;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Food Inventory</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-600 text-white p-2 rounded-full shadow-md hover:bg-green-700 transition-colors"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* Category Filter */}
      <div className="overflow-x-auto pb-2">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              filter === 'all'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            All Items
          </button>
          {Object.values(FoodCategory).map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                filter === category
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {filteredInventory.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No items found. Add some items to your inventory!
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredInventory.map((item) => (
              <li key={item.id} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-800">{item.name}</span>
                      {isExpiringSoon(item.expiryDate) && (
                        <span className="ml-2 text-yellow-500">
                          <AlertTriangle size={16} />
                        </span>
                      )}
                      {isExpired(item.expiryDate) && (
                        <span className="ml-2 text-red-500">
                          <AlertTriangle size={16} />
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.quantity} {item.unit} · {item.category}
                    </div>
                    <div className="text-xs text-gray-400">
                      Expires: {format(parseISO(item.expiryDate), 'MMM d, yyyy')}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      <Edit size={18} />
                    </button>
                    <button 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeFoodItem(item.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add Item Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Add New Food Item</h2>
              <form onSubmit={handleAddItem} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newItem.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={newItem.category}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {Object.values(FoodCategory).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={newItem.quantity}
                      onChange={handleInputChange}
                      min="0"
                      step="0.1"
                      required
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit
                    </label>
                    <input
                      type="text"
                      name="unit"
                      value={newItem.unit}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Purchase Date
                  </label>
                  <input
                    type="date"
                    name="purchaseDate"
                    value={newItem.purchaseDate.split('T')[0]}
                    onChange={(e) => 
                      setNewItem({
                        ...newItem,
                        purchaseDate: new Date(e.target.value).toISOString()
                      })
                    }
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={newItem.expiryDate.split('T')[0]}
                    onChange={(e) => 
                      setNewItem({
                        ...newItem,
                        expiryDate: new Date(e.target.value).toISOString()
                      })
                    }
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Add Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;