import React, { createContext, useContext, useState, useEffect } from 'react';
import { FoodItem, Recipe, ShoppingListItem, FoodCategory } from '../types';
import { addDays, isAfter, isBefore, parseISO } from 'date-fns';

interface AppContextType {
  inventory: FoodItem[];
  recipes: Recipe[];
  shoppingList: ShoppingListItem[];
  addFoodItem: (item: Omit<FoodItem, 'id'>) => void;
  updateFoodItem: (id: string, item: Partial<FoodItem>) => void;
  removeFoodItem: (id: string) => void;
  generateRecipes: (ingredients: string[]) => void;
  addToShoppingList: (item: Omit<ShoppingListItem, 'id' | 'checked'>) => void;
  updateShoppingListItem: (id: string, item: Partial<ShoppingListItem>) => void;
  removeFromShoppingList: (id: string) => void;
  toggleShoppingListItem: (id: string) => void;
  expiringItems: FoodItem[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data for initial state
const initialInventory: FoodItem[] = [
  {
    id: '1',
    name: 'Apples',
    category: FoodCategory.FRUITS,
    quantity: 5,
    unit: 'pcs',
    purchaseDate: new Date().toISOString(),
    expiryDate: addDays(new Date(), 7).toISOString(),
  },
  {
    id: '2',
    name: 'Milk',
    category: FoodCategory.DAIRY,
    quantity: 1,
    unit: 'liter',
    purchaseDate: new Date().toISOString(),
    expiryDate: addDays(new Date(), 5).toISOString(),
  },
  {
    id: '3',
    name: 'Chicken Breast',
    category: FoodCategory.MEAT,
    quantity: 500,
    unit: 'g',
    purchaseDate: new Date().toISOString(),
    expiryDate: addDays(new Date(), 2).toISOString(),
  },
];

const initialRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Apple Milk Smoothie',
    ingredients: ['2 Apples', '1 cup Milk'],
    instructions: [
      'Wash and core the apples.',
      'Cut apples into chunks.',
      'Blend apples and milk until smooth.',
      'Serve chilled.'
    ],
    prepTime: 5,
    cookTime: 0,
    servings: 2,
    type: 'core'
  }
];

const initialShoppingList: ShoppingListItem[] = [
  {
    id: '1',
    name: 'Bananas',
    quantity: 6,
    unit: 'pcs',
    category: FoodCategory.FRUITS,
    checked: false
  },
  {
    id: '2',
    name: 'Bread',
    quantity: 1,
    unit: 'loaf',
    category: FoodCategory.BAKERY,
    checked: false
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inventory, setInventory] = useState<FoodItem[]>(initialInventory);
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>(initialShoppingList);
  const [expiringItems, setExpiringItems] = useState<FoodItem[]>([]);

  // Check for expiring items
  useEffect(() => {
    const today = new Date();
    const threeDaysFromNow = addDays(today, 3);
    
    const expiring = inventory.filter(item => {
      const expiryDate = parseISO(item.expiryDate);
      return isAfter(expiryDate, today) && isBefore(expiryDate, threeDaysFromNow);
    });
    
    setExpiringItems(expiring);
  }, [inventory]);

  const addFoodItem = (item: Omit<FoodItem, 'id'>) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
    };
    setInventory([...inventory, newItem]);
  };

  const updateFoodItem = (id: string, item: Partial<FoodItem>) => {
    setInventory(
      inventory.map((foodItem) =>
        foodItem.id === id ? { ...foodItem, ...item } : foodItem
      )
    );
  };

  const removeFoodItem = (id: string) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  // Mock function to simulate API call to ChatGPT
  const generateRecipes = (ingredients: string[]) => {
    // In a real app, this would call the ChatGPT API
    console.log('Generating recipes with ingredients:', ingredients);
    
    // Mock response - in a real app, this would come from the API
    const mockCoreRecipe: Recipe = {
      id: Date.now().toString(),
      title: `Recipe with ${ingredients.join(', ')}`,
      ingredients: ingredients.map(ing => `1 ${ing}`),
      instructions: [
        'Mix all ingredients together.',
        'Cook for 10 minutes.',
        'Serve hot.'
      ],
      prepTime: 10,
      cookTime: 15,
      servings: 4,
      type: 'core'
    };
    
    const mockExtendedRecipe: Recipe = {
      id: (Date.now() + 1).toString(),
      title: `Enhanced Recipe with ${ingredients.join(', ')}`,
      ingredients: [
        ...ingredients.map(ing => `1 ${ing}`),
        '1 Onion',
        '2 cloves Garlic',
        '1 tbsp Olive Oil'
      ],
      instructions: [
        'Chop all vegetables.',
        'Heat oil in a pan.',
        'Sauté garlic and onion until fragrant.',
        'Add remaining ingredients.',
        'Cook for 15 minutes.',
        'Season to taste and serve.'
      ],
      prepTime: 15,
      cookTime: 20,
      servings: 4,
      type: 'extended',
      additionalIngredients: ['Onion', 'Garlic', 'Olive Oil']
    };
    
    setRecipes([...recipes, mockCoreRecipe, mockExtendedRecipe]);
  };

  const addToShoppingList = (item: Omit<ShoppingListItem, 'id' | 'checked'>) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      checked: false,
    };
    setShoppingList([...shoppingList, newItem]);
  };

  const updateShoppingListItem = (id: string, item: Partial<ShoppingListItem>) => {
    setShoppingList(
      shoppingList.map((listItem) =>
        listItem.id === id ? { ...listItem, ...item } : listItem
      )
    );
  };

  const removeFromShoppingList = (id: string) => {
    setShoppingList(shoppingList.filter((item) => item.id !== id));
  };

  const toggleShoppingListItem = (id: string) => {
    setShoppingList(
      shoppingList.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        inventory,
        recipes,
        shoppingList,
        addFoodItem,
        updateFoodItem,
        removeFoodItem,
        generateRecipes,
        addToShoppingList,
        updateShoppingListItem,
        removeFromShoppingList,
        toggleShoppingListItem,
        expiringItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};