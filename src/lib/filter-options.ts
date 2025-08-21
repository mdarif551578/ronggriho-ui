
// This file contains predefined lists of filter options.
// Using a static list is more performant than fetching all products to generate filters.
// NOTE: You must manually update these lists if you add new categories, sizes, or colors to your products.

export const allCategories = [
    "Urban Desi",
    "Global Threads",
    "T-Shirts",
    "Accessories"
];

export const allSizes = [
    "S",
    "M",
    "L",
    "XL",
    "XXL"
];

// Storing the color name for display and a URL-friendly value for query params.
export const allColors = [
    "Red",
    "Blue",
    "Green",
    "Black",
    "White",
    "Yellow",
    "Purple",
    "Pink",
    "Orange",
    "Gray"
];


// Define a reasonable default price range for the price filter slider/inputs.
export const minProductPrice = 0;
export const maxProductPrice = 10000;
