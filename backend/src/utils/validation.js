// Reusable validation rules
export const validateEmail = (email) => {
  if (!email?.trim()) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim()))
    return "Please provide a valid email address";
  return null;
};

export const validatePassword = (password, isRegistration = false) => {
  if (!password) return "Password is required";

  if (isRegistration) {
    if (password.length < 8)
      return "Password must be at least 8 characters long";
    if (!/(?=.*[a-z])/.test(password))
      return "Password must contain at least one lowercase letter";
    if (!/(?=.*[A-Z])/.test(password))
      return "Password must contain at least one uppercase letter";
    if (!/(?=.*\d)/.test(password))
      return "Password must contain at least one number";
    if (!/(?=.*[@$!%*?&])/.test(password))
      return "Password must contain at least one special character";
  }

  return null;
};

export const validateUsername = (username) => {
  if (!username?.trim()) return "Username is required";
  if (username.trim().length < 3)
    return "Username must be at least 3 characters";
  if (!/^[a-zA-Z0-9_]+$/.test(username.trim()))
    return "Username can only contain letters, numbers, and underscores";
  return null;
};

// Composed validation functions
export const validateRegistration = (data) => {
  const { username, email, password } = data;
  const errors = [];

  const emailError = validateEmail(email);
  const passwordError = validatePassword(password, true);
  const usernameError = validateUsername(username);

  if (emailError) errors.push(emailError);
  if (passwordError) errors.push(passwordError);
  if (usernameError) errors.push(usernameError);

  return { isValid: errors.length === 0, errors };
};

export const validateLogin = (data) => {
  const { email, password } = data;
  const errors = [];

  const emailError = validateEmail(email);
  const passwordError = validatePassword(password, false); // No strength requirements for login

  if (emailError) errors.push(emailError);
  if (passwordError) errors.push(passwordError);

  return { isValid: errors.length === 0, errors };
};
