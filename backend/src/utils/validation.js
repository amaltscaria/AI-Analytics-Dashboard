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

export const validateJSONUpload = (data) => {
  const errors = [];

  // Check required top-level fields
  if (!data.drone_id?.trim()) errors.push("drone_id is required");
  if (!data.date?.trim()) errors.push("date is required");
  if (!data.location?.trim()) errors.push("location is required");
  if (!Array.isArray(data.violations))
    errors.push("violations must be an array");

  // Validate date format (YYYY-MM-DD)
  if (data.date && !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    errors.push("date must be in YYYY-MM-DD format");
  }

  // Validate violations array
  if (Array.isArray(data.violations)) {
    if (data.violations.length === 0) {
      errors.push("violations array cannot be empty");
    }

    data.violations.forEach((violation, index) => {
      if (!violation.id?.trim())
        errors.push(`violation[${index}]: id is required`);
      if (!violation.type?.trim())
        errors.push(`violation[${index}]: type is required`);
      if (!violation.timestamp?.trim())
        errors.push(`violation[${index}]: timestamp is required`);
      if (typeof violation.latitude !== "number")
        errors.push(`violation[${index}]: latitude must be a number`);
      if (typeof violation.longitude !== "number")
        errors.push(`violation[${index}]: longitude must be a number`);
      if (!violation.image_url?.trim())
        errors.push(`violation[${index}]: image_url is required`);

      // Validate coordinate ranges
      if (
        typeof violation.latitude === "number" &&
        (violation.latitude < -90 || violation.latitude > 90)
      ) {
        errors.push(`violation[${index}]: latitude must be between -90 and 90`);
      }
      if (
        typeof violation.longitude === "number" &&
        (violation.longitude < -180 || violation.longitude > 180)
      ) {
        errors.push(
          `violation[${index}]: longitude must be between -180 and 180`
        );
      }

      // Validate timestamp format (HH:MM:SS)
      if (
        violation.timestamp &&
        !/^\d{2}:\d{2}:\d{2}$/.test(violation.timestamp)
      ) {
        errors.push(
          `violation[${index}]: timestamp must be in HH:MM:SS format`
        );
      }
    });
  }

  return { isValid: errors.length === 0, errors };
};
