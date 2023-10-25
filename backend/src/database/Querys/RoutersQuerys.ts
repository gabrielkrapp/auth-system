export const DeleteUserQuery = "DELETE FROM users WHERE id = $1";

export const GetUsersQuery = "SELECT id, username, permissions from users";

export const GetUserQuery =
  "SELECT id, username, permissions from users WHERE id = $1";

export const MakeUserAdminQuery =
  "UPDATE users SET permissions = 'admin' WHERE id = $1";

export const UpdateUserQuery =
  "UPDATE users SET username = $1, password = $2 WHERE id = $3";

export const RegisterUserQuery =
  "INSERT INTO users (id, username, password) VALUES ($1, $2, $3)";
