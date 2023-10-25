export const validateRegisterFormField = (
  name: string,
  value: string,
): string => {
  switch (name) {
    case "username":
      return value.trim() === "" ? "Username is required" : "";
    case "password":
      return value.length < 6
        ? "Password must be at least 6 characters long"
        : "";
    default:
      return "";
  }
};
