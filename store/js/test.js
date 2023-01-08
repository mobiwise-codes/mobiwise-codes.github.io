/////////////// Create MW button ///////////////
const mwBtn = document.createElement("li");
mwBtn.innerHTML = `
          <span id="mwButton" title="MobiWise Store" data-tooltipster="bottom" style="height:50px;width:50px;display:flex;justify-content:center;align-items:center;cursor:pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 501.56 887.72" fill="#e43f3f" style="height:36px"><path d="M190.76 696.96l60.02-60.02v120.03H130.74l60.02-60.01zm37.21-352.62h52.67l-26.33 26.33-26.34-26.33zM76.95 211.91l45.55 45.55 45.55 45.55h-91.1v-91.1zm259.8 91.1l45.55-45.55 45.55-45.55v91.1h-91.1zM254.31 310.19L35.21 91.1V0l45.55 45.55 45.55 45.55H382.3L473.4 0v91.1L254.31 310.19zm247.25 75.97v501.56L250.78 636.94 0 386.16h501.56z"/></svg>
          </span>`;
document.querySelector(".navbar-right").appendChild(mwBtn);
