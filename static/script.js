function openPopup() {
  document.getElementById("popUp").style.display = "block";
}

function closePopup() {
  document.getElementById("popUp").style.display = "none";
}

function displayMessageForSearchedIncidents(){
  const input = document.getElementById("searchBar");

  const result = document.getElementById("searchResult"); 
  result.textContent = "Voici les résultats pour la recherche : "; // S'il y' a aucunes données dans la db, il contiendra le message
}
