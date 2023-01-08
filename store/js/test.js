export defineM(
  "mobiwise-store",
  function (mbrApp, TR) {
    // mbrApp.addAppResource(mbrApp.getAddonDir("mobiwise-store") + "/mwstore.css");
    mbrApp.regExtension({
      name: "mobiwise-store",
      global: {},
      filters: {},
      events: {
        load: function () {
          /////////////// Create MW button ///////////////
          const mwBtn = document.createElement("li");
          mwBtn.innerHTML = `
          <span id="mwButton" title="MobiWise Store" data-tooltipster="bottom" style="height:50px;width:50px;display:flex;justify-content:center;align-items:center;cursor:pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 501.56 887.72" fill="#e43f3f" style="height:36px"><path d="M190.76 696.96l60.02-60.02v120.03H130.74l60.02-60.01zm37.21-352.62h52.67l-26.33 26.33-26.34-26.33zM76.95 211.91l45.55 45.55 45.55 45.55h-91.1v-91.1zm259.8 91.1l45.55-45.55 45.55-45.55v91.1h-91.1zM254.31 310.19L35.21 91.1V0l45.55 45.55 45.55 45.55H382.3L473.4 0v91.1L254.31 310.19zm247.25 75.97v501.56L250.78 636.94 0 386.16h501.56z"/></svg>
          </span>`;
          document.querySelector(".navbar-right").appendChild(mwBtn);

          /////////////// XHR ///////////////
          let xhr;
          document.getElementById("mwButton").addEventListener("click", sendXHR);
          function sendXHR() {
            xhr = new XMLHttpRequest();
            xhr.onreadystatechange = mwContents;
            xhr.open("GET", "http://127.0.0.1:5500/src/store.html", true);
            xhr.send();
          }
          function mwContents() {
            if (xhr.readyState === xhr.DONE) {
              if (xhr.status === 200) {
                /////////////// Open Store ///////////////
                mwStore();

                /////////////// Height ///////////////
                const mwContainer = document.querySelector(".mwContainer");
                mwContainer.style.height = `${window.innerHeight - 88}px`;

                setTimeout(() => {
                  mwContainer.scrollTo(0, 0);
                }, 500);

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
                addColor();

                /////////////// Create page ///////////////
                const INC_LIST = document.querySelectorAll("include");
                INC_LIST.forEach((I) => {
                  const ID = "includer-" + Math.floor(Math.random() * 100000000000);
                  I.setAttribute("id", ID);
                  let ATTR = I.getAttribute("src");
                  const ATTR_ID = I.getAttribute("id");
                  function getFile() {
                    let newXHR = new XMLHttpRequest();
                    newXHR.open("GET", `${ATTR}`);
                    newXHR.onload = function () {
                      const element = document.getElementById(ATTR_ID);
                      if (this.status == 200) {
                        element.innerHTML = this.responseText;
                      } else if (this.status === 404) {
                        element.innerHTML = `<h1 style="color:red;text-alig:center">404 Error</h1>`;
                      }
                    };
                    newXHR.send();
                  }
                  getFile();
                });

                /////////////// SEARCH ///////////////
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
              } else {
                mbrApp.alertDlg("🤔 There is a problem...<br>Come back later.");
              }
            }
          }

          /////////////// Show store ///////////////
          function mwStore() {
            mbrApp.showDialog({
              className: "mwStore",
              size: "fullscreen",
              body: [xhr.responseText],
            });
          }

          var cid = GenerateCustomID();
          var newBlock = {
            alias: false,
            _styles: json.data._styles,
            _name: "design-block",
            _customHTML: json.data._customHTML,
            _cid: cid,
            _protectedParams: [],
            _global: false,
            _once: false,
            _params: {},
            _anchor: "design-block-" + cid,
          };
        },
      },
    });
  },
  ["mbrApp", "TR()"]
);
