let db;
const request = indexedDB.open("UserDB", 1); // toujours version 1 pour commencer

request.onupgradeneeded = function (event) {
  db = event.target.result;
  // Créer le store "users" s'il n'existe pas
  if (!db.objectStoreNames.contains("users")) {
    db.createObjectStore("users", { keyPath: "username" });
  }
};

request.onsuccess = function (event) {
  db = event.target.result;

  // On écoute l'événement submit uniquement après que la base est prête
  document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      // C’est ici que l’erreur apparaissait
      const tx = db.transaction("users", "readwrite");
      const store = tx.objectStore("users");

      const getReq = store.get(username);
      getReq.onsuccess = () => {
        if (getReq.result) {
          alert("Nom d'utilisateur déjà utilisé !");
        } else {
          const addReq = store.add({ username, password });
          addReq.onsuccess = () => {
            alert("Inscription réussie !");
            window.location.href = "/";
          };
          addReq.onerror = () => {
            alert("Erreur lors de l'ajout de l'utilisateur.");
          };
        }
      };
      getReq.onerror = () => {
        alert("Erreur lors de la vérification de l'utilisateur.");
      };

      tx.oncomplete = () => {
        console.log("Transaction terminée avec succès.");
      };
      tx.onerror = (err) => {
        console.error("Erreur transaction:", err);
      };
    } catch (err) {
      console.error("Erreur transaction IndexedDB :", err);
      alert("Erreur lors de l'enregistrement.");
    }
  });
};

request.onerror = function (event) {
  console.error("Impossible d'ouvrir la base IndexedDB.", event);
  alert("Erreur lors de l'ouverture de la base IndexedDB.");
};
