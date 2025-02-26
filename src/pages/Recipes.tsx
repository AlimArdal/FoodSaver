import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Clock, Users, Plus, ChefHat } from 'lucide-react';

const Recipes: React.FC = () => {
  const { inventory, recipes, generateRecipes, addToShoppingList } = useAppContext();
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'core' | 'extended'>('core');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleIngredientToggle = (name: string) => {
    if (selectedIngredients.includes(name)) {
      setSelectedIngredients(selectedIngredients.filter(item => item !== name));
    } else {
      setSelectedIngredients([...selectedIngredients, name]);
    }
  };

  const handleGenerateRecipes = () => {
    if (selectedIngredients.length === 0) return;
    
    setIsGenerating(true);
    // Simulate API call delay
    setTimeout(() => {
      generateRecipes(selectedIngredients);
      setIsGenerating(false);
    }, 1500);
  };

  const handleAddToShoppingList = (ingredient: string) => {
    addToShoppingList({
      name: ingredient,
      quantity: 1,
      unit: 'item',
      category: 'Other' as any,
    });
  };

  const filteredRecipes = recipes.filter(recipe => recipe.type === activeTab);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Smart Recipe Suggestions</h1>
      
      {/* Ingredient Selection */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-3">Select Ingredients</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {inventory.map((item) => (
            <button
              key={item.id}
              onClick={() => handleIngredientToggle(item.name)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedIngredients.includes(item.name)
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
        <button
          onClick={handleGenerateRecipes}
          disabled={selectedIngredients.length === 0 || isGenerating}
          className={`w-full py-2 rounded-md font-medium ${
            selectedIngredients.length === 0 || isGenerating
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {isGenerating ? 'Generating Recipes...' : 'Generate Recipes'}
        </button>
      </div>
      
      {/* Recipe Tabs */}
      {recipes.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('core')}
              className={`flex-1 py-3 font-medium ${
                activeTab === 'core'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500'
              }`}
            >
              Core Recipes
            </button>
            <button
              onClick={() => setActiveTab('extended')}
              className={`flex-1 py-3 font-medium ${
                activeTab === 'extended'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500'
              }`}
            >
              Extended Recipes
            </button>
          </div>
          
          {/* Recipe List */}
          <div className="divide-y divide-gray-200">
            {filteredRecipes.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No {activeTab} recipes available. Generate some recipes first!
              </div>
            ) : (
              filteredRecipes.map((recipe) => (
                <div key={recipe.id} className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{recipe.title}</h3>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      <span>{recipe.prepTime + recipe.cookTime} min</span>
                    </div>
                    <div className="flex items-center">
                      <Users size={16} className="mr-1" />
                      <span>{recipe.servings} servings</span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <h4 className="font-medium text-gray-700 mb-1">Ingredients:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-center justify-between">
                          <span>{ingredient}</span>
                          {recipe.type === 'extended' && 
                           recipe.additionalIngredients?.includes(ingredient.split(' ').pop() || '') && (
                            <button 
                              onClick={() => handleAddToShoppingList(ingredient.split(' ').pop() || '')}
                              className="text-green-600 hover:text-green-800"
                              title="Add to shopping list"
                            >
                              <Plus size={16} />
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Instructions:</h4>
                    <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                      {recipe.instructions.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      
      {recipes.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <ChefHat size={48} className="mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No Recipes Yet</h3>
          <p className="text-gray-500 mb-4">
            Select ingredients from your inventory and generate recipes to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default Recipes;