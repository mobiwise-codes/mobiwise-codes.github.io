export function test() {
  let xhr;
  document.getElementById("mwButton").addEventListener("click", sendXHR);

  function sendXHR() {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = mwContents;
    xhr.open("GET", "http://127.0.0.1:5500/src/store.html", true);
    xhr.send();
  }
}
