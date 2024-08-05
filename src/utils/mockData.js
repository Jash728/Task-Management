const loadUsers = () => {
  const storedUsers = localStorage.getItem("users");
  return storedUsers ? JSON.parse(storedUsers) : [];
};

const saveUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const users = loadUsers();

export const addUser = (user) => {
  users.push(user);
  saveUsers(users);
};

export const findUser = (email, password) => {
  const user = users.find(
    (user) =>
      user.email.trim().toLowerCase() === email.trim().toLowerCase() &&
      user.password === password
  );

  return user;
};
