import fetchLaunchData, { launches, loadData } from "./createDataList.js";

(function () {
  fetchLaunchData();
  subscribeRadioChanges();
})();

export function createCaraousel(carousel) {
  const launchDataList = carousel.querySelector(".launch-data-list");
  let launchDataListWidth = 0;
  let currStep = 0;
  const launches$ = carousel.querySelectorAll(".launch-data");

  let activeElem = 1;
  launches$[activeElem].style.border = "solid black 2px";
  launches$[activeElem].className += " active";
  launchDataList.style.transform = "translateX(0px)";

  let launchDataCount = 0;
  const launchDataVisible = 3;
  const carouselPrev = carousel.querySelector(".prev");
  const carouselNext = carousel.querySelector(".next");

  //Count all the launches$
  [].forEach.call(launches$, () => {
    launchDataCount++;
    launchDataListWidth += 250;
    launchDataList.style.width = launchDataListWidth + "px";
  });

  carouselNext.onclick = () => {
    if (currStep < launchDataCount - launchDataVisible) {
      currStep++;
      moveListData();
      clearStyles();
      activeElem++;
      launches$[activeElem].style.border = "solid black 2px";
      launches$[activeElem].className += " active";
    }
  };
  carouselPrev.onclick = () => {
    if (currStep > 0) {
      currStep--;
      moveListData();
      clearStyles();
      activeElem--;
      launches$[activeElem].style.border = "solid black 2px";
      launches$[activeElem].className += " active";
    }
  };

  const moveListData = () => {
    launchDataList.style.transform = "translateX(-" + 250 * currStep + "px)";
  };

  const clearStyles = () => {
    for (let i = 0; i < launches$.length; i++) {
      launches$[i].style.border = "none";
      launches$[i].className = launches$[i].className.replace(" active", "");
    }
  };
}

function subscribeRadioChanges() {
  const filterOnSelectionChange = (event) => {
    event.stopPropagation();
    if (!!event.target.value) {
      const filteredData = launches.filter(
        (launchData) => String(launchData.launch_success) === event.target.value
      );
      loadData(filteredData);
      return;
    }
    loadData(launches);
  };

  document.querySelectorAll('input[type="radio"]').forEach((element) => {
    element.addEventListener("change", filterOnSelectionChange);
  });
}
