export const checkValidData = (email, password) => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  
    if (!isEmailValid) return "Email is not valid";
  
    if (!password) return "Password is required";
    if (!passwordRegex.test(password)) return "Password is not valid";
  
    return null;
  };
  