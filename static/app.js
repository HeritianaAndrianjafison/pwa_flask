// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker Registered'));
}

// IndexedDB setup
let db;
const request = indexedDB.open("UserDB", 1);
request.onupgradeneeded = function (e) {
  db = e.target.result;
  const store = db.createObjectStore("users", { keyPath: "username" });
  store.transaction.oncomplete = () => {
    const userStore = db.transaction("users", "readwrite").objectStore("users");
    userStore.add({ username: "admin", password: "1234" });
  };
};
request.onsuccess = function (e) {
  db = e.target.result;
  checkLogin();
};

function checkLogin() {
  const username = localStorage.getItem("loggedInUser");
  if (username) {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("welcome").style.display = "block";
    document.getElementById("user").textContent = username;
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  location.reload();
}

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const tx = db.transaction("users", "readonly");
  const store = tx.objectStore("users");
  const req = store.get(username);

  req.onsuccess = function () {
    if (req.result && req.result.password === password) {
      localStorage.setItem("loggedInUser", username);
      checkLogin();
    } else {
      alert("Invalid login");
    }
  };
});