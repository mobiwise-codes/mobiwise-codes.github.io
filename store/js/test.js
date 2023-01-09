mbrApp.alertDlg("Merci d'avoir installé MobiWise Store");

/////////////// Height ///////////////
function hauteur() {
  const mwContainer = document.querySelector(".mwContainer");
  mwContainer.style.height = `${window.innerHeight - 88}px`;

  setTimeout(() => {
    mwContainer.scrollTo(0, 0);
  }, 500);
}

/////////////// Dark Mode ///////////////
function addColor() {
  const ifDarkMode = document.querySelector("body").classList.contains("dark-mode");
  const darkStyle = document.createElement("style");
  if (ifDarkMode) {
    darkStyle.innerHTML = `.mwStore .modal-body{background-color:rgb(55,60,72)}.bgColor{background-color: rgb(37,41,49)}`;
  } else {
    darkStyle.innerHTML = `.mwStore .modal-body{background-color:rgb(247,247,247)}.bgColor{background-color: rgb(255,255,255)}`;
  }
  document.head.appendChild(darkStyle);
}

/////////////// SEARCH ///////////////
function recherche() {
  const searchField = document.getElementById("search");
  searchField.addEventListener("input", searchList);
  function searchList() {
    const searchText = searchField.value.toLowerCase();
    const listItems = document.querySelectorAll(".mwFilterItem");
    const searchStyle = document.createElement("style");
    listItems.forEach((item) => {
      const itemTitle = item.textContent.toLowerCase();
      if (itemTitle.includes(searchText)) {
        item.classList.remove("out");
        item.classList.add("in");
        setTimeout(() => {
          item.style.display = "block";
        }, 300);
      } else {
        item.classList.remove("in");
        item.classList.add("out");
        setTimeout(() => {
          item.style.display = "none";
        }, 300);
      }
    });
  }
}



//   let xhr;
//   document.getElementById("mwButton").addEventListener("click", sendXHR);

//   function sendXHR() {
//     xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = mwContents;
//     xhr.open("GET", "http://127.0.0.1:5500/src/store.html", true);
//     xhr.send();
//   }

