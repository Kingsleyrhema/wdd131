// Hamburger menu toggle
const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('menu');

menuButton.addEventListener('click', () => {
  menu.classList.toggle('open');
  menu.style.display = menu.classList.contains('open') ? 'flex' : 'none';
});

// Get current year and insert into span#currentyear
const yearSpan = document.getElementById("currentyear");
const now = new Date();
if (yearSpan) {
  yearSpan.textContent = now.getFullYear();
}

// Get last modified date and insert into p#lastModified
const lastModified = document.getElementById("lastModified");
if (lastModified) {
  lastModified.textContent = `Last Modification: ${document.lastModified}`;
}

