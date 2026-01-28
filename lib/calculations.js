/**
 * Calculate gold value based on weight, purity, and current rate
 */
export function calculateGoldValue(weight, karats, goldRate, loanAmount = 0) {
  // Convert karats to percentage purity
  const purityPercentage = (karats / 24) * 100;
  
  // Calculate pure gold weight
  const pureGoldWeight = weight * (karats / 24);
  
  // Calculate value
  const goldValue = pureGoldWeight * goldRate;
  const releaseValue = Math.max(0, goldValue - loanAmount);
  const loanToValue = loanAmount > 0 ? (loanAmount / goldValue) * 100 : 0;
  
  return {
    goldValue: Math.round(goldValue),
    releaseValue: Math.round(releaseValue),
    loanToValue: Math.round(loanToValue),
    pureGoldWeight: Math.round(pureGoldWeight * 100) / 100, // 2 decimal places
    purityPercentage: Math.round(purityPercentage * 10) / 10, // 1 decimal place
    weight: weight,
    karats: karats,
    rateUsed: goldRate,
    calculationDate: new Date().toISOString(),
  };
}

export function calculateAllKaratValues(weight, goldRate) {
  const karats = [24, 22, 18, 14];
  
  return karats.map(karat => {
    const value = weight * (karat / 24) * goldRate;
    return {
      karat,
      value: Math.round(value),
      formatted: `₹${Math.round(value).toLocaleString('en-IN')}`,
      purity: `${Math.round((karat / 24) * 100)}%`,
    };
  });
}

export function getGoldRateTrend(currentRate, previousRates = []) {
  if (previousRates.length === 0) {
    return { trend: 'stable', change: 0, percentage: 0 };
  }
  
  const previousRate = previousRates[previousRates.length - 1];
  const change = currentRate - previousRate;
  const percentage = (change / previousRate) * 100;
  
  let trend = 'stable';
  if (percentage > 0.5) trend = 'up';
  if (percentage < -0.5) trend = 'down';
  
  return {
    trend,
    change: Math.round(change),
    percentage: Math.round(percentage * 10) / 10, // 1 decimal place
  };
}
/**
 * Validate form data
 */
export function validateForm(formData, step) {
  const errors = {};
  
  // Common validations
  if (formData.grossWeight && (parseFloat(formData.grossWeight) <= 0 || parseFloat(formData.grossWeight) > 10000)) {
    errors.grossWeight = "Please enter a valid weight (1-10,000 grams)";
  }
  
  if (formData.loanAmount && parseFloat(formData.loanAmount) < 0) {
    errors.loanAmount = "Loan amount cannot be negative";
  }
  
  // Step-specific validations
  switch(step) {
    case 2:
      if (!formData.name?.trim()) errors.name = "Name is required";
      if (!formData.mobile?.trim()) errors.mobile = "Mobile is required";
      else if (!/^[6-9]\d{9}$/.test(formData.mobile.replace(/\D/g, ''))) {
        errors.mobile = "Valid 10-digit Indian mobile required";
      }
      if (!formData.email?.trim()) errors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = "Valid email address required";
      }
      break;
  }
  
  return errors;
}

/**
 * Format currency for display
 */
export function formatCurrency(amount, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate loan eligibility based on gold value
 */
export function calculateLoanEligibility(goldValue, ltvRatio = 0.75) {
  const maxLoan = Math.floor(goldValue * ltvRatio);
  const processingFee = Math.floor(maxLoan * 0.02); // 2% processing fee
  const disbursalAmount = maxLoan - processingFee;
  
  return {
    maxLoan,
    processingFee,
    disbursalAmount,
    ltvRatio: ltvRatio * 100,
  };
}