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
