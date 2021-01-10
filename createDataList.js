import { createCaraousel } from "./main.js";

export let launches = [];

export default function fetchLaunchData() {
  fetch("./launchData.json")
    .then((res) => {
      res
        .json()
        .then((res) => {
          launches = res;
          loadData(launches);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

export function loadData(launches) {
  const productList = document.querySelector(".launch-data-list");
  let output = "";

  launches.forEach(
    (launchData) =>
      (output += `
      <li class="launch-data-list__item">
      <div class="launch-data">
      <div class="launch-data-image">
      <img src=${launchData.links.mission_patch} />
    </div>
    <div class="launch-data-details">
      <p class="launch-data__heading">${launchData.mission_name}</p>
      <p>Launch Year : ${launchData.launch_year}</p>
      <p>Launch price: ${launchData.launch_price}</p>
      <p>SuccessFul Launch : ${launchData.launch_success}</p>
    </div>
    </div>
    </li>
`)
  );
  productList.innerHTML = output;
  const carousel = document.querySelector(".carousel");
  createCaraousel(carousel);
}
