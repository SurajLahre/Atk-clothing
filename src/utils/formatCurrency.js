/**
 * Format a number as Indian Rupees (INR)
 * @param {number} amount - The amount to format
 * @returns {string} - The formatted amount with ₹ symbol
 */
export const formatCurrency = (amount) => {
  // Format as Indian currency (₹) with commas for thousands
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Convert USD to INR (for demo purposes)
 * @param {number} usdAmount - Amount in USD
 * @returns {number} - Equivalent amount in INR
 */
export const convertToINR = (usdAmount) => {
  // Using a fixed exchange rate for demo purposes (1 USD = 75 INR)
  const exchangeRate = 75;
  return usdAmount * exchangeRate;
};
