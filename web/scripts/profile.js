userForm = document.getElementById("user-mgmt-form");
userForm.onsubmit = (event) => {
  event.preventDefault();

  newUsernameEl = document.getElementById("new-username");
  newPasswordEl = document.getElementById("new-password");

  username = newUsernameEl.value;
  password = newPasswordEl.value;

  newUsernameEl.value = "";
  newPasswordEl.value = "";

  if (username !== "" && password === "") {
    resetUsername(username);
    alertSuccess("Your username has been reset");
  } else if (username === "" && password !== "") {
    resetPassword(password);
    alertSuccess("Your password has been reset!");
  } else if (username !== "" && password !== "") {
    resetUsername(username);
    resetPassword(password);
    alertSuccess("Your username and password have been reset!");
  } else if (username === "" && password === "") {
    alertError("Neither username or password was submitted.");
  } else {
    alertError("Something went wrong.");
  }
};

logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", () => {
  window.location.href = "login.html";
});

const resetPassword = (password) => {
  localStorage.setItem("password", password);
};

const resetUsername = (username) => {
  localStorage.setItem("username", username);
};
