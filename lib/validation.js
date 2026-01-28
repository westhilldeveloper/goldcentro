/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, 500); // Limit length
}

/**
 * Validate email address
 */
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) && email.length <= 254;
}

/**
 * Validate Indian mobile number
 */
export function validatePhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  const re = /^[6-9]\d{9}$/;
  return re.test(cleaned);
}

/**
 * Validate numeric input
 */
export function validateNumber(value, min = 0, max = 10000000) {
  const num = parseFloat(value);
  return !isNaN(num) && num >= min && num <= max;
}

/**
 * Validate form submission
 */
export function validateSubmission(formData) {
  const errors = {};
  
  // Required fields
  const required = ['name', 'mobile', 'email', 'institution', 'grossWeight'];
  required.forEach(field => {
    if (!formData[field]?.trim()) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
  });
  
  // Specific validations
  if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
  }
  
  if (!validatePhone(formData.mobile)) {
    errors.mobile = "Please enter a valid 10-digit Indian mobile number";
  }
  
  if (!validateNumber(formData.grossWeight, 0.1, 10000)) {
    errors.grossWeight = "Please enter a valid weight between 0.1 and 10,000 grams";
  }
  
  if (formData.loanAmount && !validateNumber(formData.loanAmount, 0)) {
    errors.loanAmount = "Please enter a valid loan amount";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}