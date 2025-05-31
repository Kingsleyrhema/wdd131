const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("menu");

menuButton.addEventListener("click", () => {
  menu.classList.toggle("open");
  menu.style.display = menu.classList.contains("open") ? "flex" : "none";
});

const yearSpan = document.getElementById("currentyear");
const now = new Date();
if (yearSpan) {
  yearSpan.textContent = now.getFullYear();
}

const lastModified = document.getElementById("lastModified");
if (lastModified) {
  lastModified.textContent = `Last Modification: ${document.lastModified}`;
}

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 257000,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-60682.jpg"
  },
  {
    templeName: "Paris France",
    location: "Paris, France",
    dedicated: "1988, May, 5",
    area: 24000,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/paris-france-temple/paris-france-temple-55206.jpg"
  },
  {
    templeName: "Tokyo Japan",
    location: "Tokyo, Japan",
    dedicated: "1980, October, 27",
    area: 31250,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/tokyo-japan-temple/tokyo-japan-temple-57277.jpg"
  }
];

function getDedicatedYear(dedicatedString) {
  return parseInt(dedicatedString.split(",")[0].trim(), 10);
}

const templeContainer = document.getElementById("temple-container");
const filterTitle = document.getElementById("filter-title");

function displayTemples(templeArray) {
  templeContainer.innerHTML = "";

  templeArray.forEach((temple) => {
    const figure = document.createElement("figure");
    const figcaption = document.createElement("figcaption");
    figcaption.style.padding = "0.75rem";
    figcaption.style.textAlign = "center";

    const nameEl = document.createElement("h3");
    nameEl.textContent = temple.templeName;
    nameEl.style.margin = "0.5rem 0";
    figcaption.appendChild(nameEl);

    const locEl = document.createElement("p");
    locEl.textContent = `Location: ${temple.location}`;
    locEl.style.margin = "0.25rem 0";
    figcaption.appendChild(locEl);

    const dedEl = document.createElement("p");
    dedEl.textContent = `Dedicated: ${temple.dedicated}`;
    dedEl.style.margin = "0.25rem 0";
    figcaption.appendChild(dedEl);

    const areaEl = document.createElement("p");
    areaEl.textContent = `Size: ${temple.area.toLocaleString()} sq ft`;
    areaEl.style.margin = "0.25rem 0 0.75rem 0";
    figcaption.appendChild(areaEl);

    const img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = temple.templeName;
    img.loading = "lazy";

    figure.appendChild(figcaption);
    figure.appendChild(img);
    templeContainer.appendChild(figure);
  });
}

displayTemples(temples);

const navLinks = document.querySelectorAll("#menu a[data-filter]");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const filterName = event.target.getAttribute("data-filter");
    filterTitle.textContent = filterName;

    let filteredArray = [];

    switch (filterName) {
      case "Home":
        filteredArray = temples;
        break;
      case "Old":
        filteredArray = temples.filter((temple) => {
          const year = getDedicatedYear(temple.dedicated);
          return year < 1900;
        });
        break;
      case "New":
        filteredArray = temples.filter((temple) => {
          const year = getDedicatedYear(temple.dedicated);
          return year > 2000;
        });
        break;
      case "Large":
        filteredArray = temples.filter((temple) => temple.area > 90000);
        break;
      case "Small":
        filteredArray = temples.filter((temple) => temple.area < 10000);
        break;
      default:
        filteredArray = temples;
    }

    displayTemples(filteredArray);
  });
});
