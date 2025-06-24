document.addEventListener("DOMContentLoaded", function () {
    includeHTML("include-header", "templates/header.html");
    includeHTML("include-footer", "templates/footer.html");
  });
  
  function includeHTML(elementId, filePath) {
    fetch(filePath)
      .then(response => response.text())
      .then(data => {
        document.getElementById(elementId).innerHTML = data;
      })
      .catch(error => {
        console.error("Erreur lors de l'inclusion de", filePath, error);
      });
  }
  