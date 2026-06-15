import { isValidEmail } from "../../util/EmailValidation";

export const login = (data) => {
  let error = {};
  const regemail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!data?.email.trim()) {
    error.email = "Please enter a valid email";
  } 
  // else if (!regemail.test(data.email)) {
  //   error.email = "Invalid email";
  // }
  else if (!isValidEmail(data.email)) {
    error.email = "Invalid email";
  }
  if (!data?.password.trim()) {
    error.password = "Please enter a valid password";
  }

  return error;
};

export const register = (data) => {
  let error = {};
  const regemail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!data?.name.trim()) {
    error.name = "Please enter your name";
  }
  if (!data?.email.trim()) {
    error.email = "Please enter a valid email";
  } 
  // else if (!regemail.test(data.email)) {
  //   error.email = "Invalid email";
  // }
  else if (!isValidEmail(data.email)) {
    error.email = "Invalid email";
  }

  if (!data?.country) {
    error.country = "Please select your country";
  }
  if (!data?.consent) {
    error.consent = "Consent is required";
  }
  return error;
};

export const forgetValidation = (data) => {
  let error = {};
  const regemail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!data?.email.trim()) {
    error.email = "Please enter a valid email";
  } 
  // else if (!regemail.test(data.email)) {
  //   error.email = "Invalid email";
  // }
  else if (!isValidEmail(data.email)) {
    error.email = "Invalid email";
  }
  // let error = {};
  // if (!data?.password) {
  //   error.password = "Password is required.";
  // }
  // if (!data?.confirmPassword) {
  //   error.confirmPassword = "Please make sure the password & confirm password match";
  // } else if (data?.password != data?.confirmPassword) {
  //   error.confirmPassword = "Confirm password should be same";
  // }
  return error;
};

export const changePasswordValidation = (data) => {
  let error = {};
  if (!data?.oldPassword.trim()) {
    error.oldPassword = "Old password is required.";
  }
  if (!data?.newPassword.trim()) {
    error.newPassword = "New password is required.";
  }
  if (!data?.confirmPassword.trim()) {
    error.confirmPassword = "Confirm password is required.";
  }else if (data?.newPassword != data?.confirmPassword) {
    error.confirmPassword = "Please make sure the password & confirm password match";
  }
  return error;
};

export const userInfo = (data) => {
  let error = {};

  if (!data?.name.trim()) {
    error.name = "Name is required.";
  }
  if (!data?.country) {
    error.country = "Country is required.";
  }

  return error;
};

export const setPasswordValidation = (data) => {
  let error = {};
  if (!data?.password.trim()) {
    error.password = "New password is required";
  }
  if (!data?.confirmPassword.trim()) {
    error.confirmPassword = "Confirm new password is required";
  } else if (data?.password != data?.confirmPassword) {
    error.prepassword = "Please make sure the new password & confirm new password match";
    error.confirmPassword = "Please make sure the new password & confirm new password match";
  }
  return error;
};

export const contactForm = (data) => {
  let error = {};
  const regemail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!data?.email.trim()) {
    error.email = "Please enter a valid email";
  } 
  // else if (!regemail.test(data.email)) {
  //   error.email = "Invalid email";
  // }
  else if (!isValidEmail(data.email)) {
    error.email = "Invalid email";
  }
  if (!data?.message.trim()) {
    error.message = "Please enter message";
  }

  if (data?.phone && data?.phone != "") {
    const input = data?.phone;
    // Remove any non-digit characters from the input
    const cleanedInput = input.replace(/\D/g, '');
    // Check if the cleaned input consists of only digits and has a valid length
      const isValid = /^\d{10}$/.test(cleanedInput);
      if(!isValid){
        error.phone = "Phone number is invalid. Please enter a 10-digit number";
      }
  }

  return error;
};
