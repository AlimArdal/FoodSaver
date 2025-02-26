export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  quantity: number;
  unit: string;
  purchaseDate: string;
  expiryDate: string;
  notes?: string;
}

export enum FoodCategory {
  FRUITS = "Fruits",
  VEGETABLES = "Vegetables",
  DAIRY = "Dairy",
  MEAT = "Meat",
  SEAFOOD = "Seafood",
  GRAINS = "Grains",
  BAKERY = "Bakery",
  CANNED = "Canned Goods",
  FROZEN = "Frozen Foods",
  SNACKS = "Snacks",
  BEVERAGES = "Beverages",
  CONDIMENTS = "Condiments",
  SPICES = "Spices",
  OTHER = "Other"
}

export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  type: "core" | "extended";
  additionalIngredients?: string[];
}

export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: FoodCategory;
  checked: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  preferences: {
    dietaryRestrictions: string[];
    notificationSettings: {
      expiryAlerts: boolean;
      daysBeforeExpiry: number;
    }
  }
}