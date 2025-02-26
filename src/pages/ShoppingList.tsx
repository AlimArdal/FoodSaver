import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { FoodCategory } from '../types';
import { Plus, Check, Trash2 } from 'lucide-react';

const ShoppingList: React.FC = () => {
  const { 
    shoppingList, 
    addToShoppingList, 
    updateShoppingListItem, 
    removeFromShoppingList, 
    toggleShoppingListItem 
  } = useAppContext();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 1,
    unit: 'pcs',
    category: FoodCategory.OTHER,
  });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    addToShoppingList(newItem);
    setNewItem({
      name: '',
      quantity: 1,
      unit: 'pcs',
      category: FoodCategory.OTHER,
    });
    setShowAddForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  // Group items by category
  const groupedItems = shoppingList.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof shoppingList>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Shopping List</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-600 text-white p-2 rounded-full shadow-md hover:bg-green-700 transition-colors"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* Shopping List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {shoppingList.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            Your shopping list is empty. Add some items!
          </div>
        ) : (
          <div>
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category}>
                <div className="bg-gray-100 px-4 py-2 font-medium text-gray-700">
                  {category}
                </div>
                <ul className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={item.id} className="p-4 flex items-center">
                      <button
                        onClick={() => toggleShoppingListItem(item.id)}
                        className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                          item.checked
                            ? 'bg-green-600 border-green-600 text-white'
                            : 'border-gray-300'
                        }`}
                      >
                        {item.checked && <Check size={14} />}
                      </button>
                      <div className="flex-grow">
                        <span className={`${item.checked ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                          {item.name}
                        </span>
                        <div className="text-sm text-gray-500">
                          {item.quantity} {item.unit}
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromShoppingList(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Item Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Add to Shopping List</h2>
              <form onSubmit={handleAddItem} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name
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

export default ShoppingList;