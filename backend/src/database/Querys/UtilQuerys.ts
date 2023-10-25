export const GetUserQuery = (field: string) => {
  return `SELECT id, username, permissions FROM users WHERE ${field} = $1`;
};

export const ValidatePasswordQuery =
  "SELECT password FROM users WHERE username = $1";
