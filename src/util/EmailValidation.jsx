export const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  
    if (!emailRegex.test(email)) {
      return false;
    }
  
    if (email.includes('+')) {
      return false;
    }

    if (email.includes('..')) {
        return false;
    }
  
    return true;
  };