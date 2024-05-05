// const defaultUsername = 'admin';
// const defaultPassword = 'securescape';

loginForm = document.getElementById('login-form');
loginForm.onsubmit = (event) => {
    event.preventDefault();
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;

    authenticate(username, password)
}

const authenticate = (username, password) => {
    validUsername = getUsername();
    validPassword = getPassword();

    if (username === validUsername && password === validPassword) {
        window.location.href = 'index.html';
    } else {
        alertError('Username or password is incorrect.')
    }
}

const getUsername = () => {
    username = localStorage.getItem('username');
    return username !== null ? username : 'admin';
}

const getPassword = () => {
    password = localStorage.getItem('password');
    return password !== null ? password : 'securescape';
}

const alertError = (message) => {
    Toastify.toast({
      text: message,
      duration: 2000,
      close: false,
      style: {
        background: "red",
        color: "white",
        textAlign: "center",
      },
    });
  };

// TODO FOR TOMORROW

// PROMPT USER TO CHANGE IT IF THE CREDENTIALS ARE THE DEFAULT CREDENTIALS
// NETWORK DIAGRAM EVENT LISTENERS
// IMPLEMENT WAY FOR SUER TO RESET VIEW OF NETWORK DIAGRAM
// MENU CUSTOMIZATION ON ELECTRON
// CREATE EXPORTABLE PDF REPORT 