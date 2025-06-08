window.addEventListener("DOMContentLoaded", () => {
  let count = Number(localStorage.getItem("reviewCount")) || 0;
  count += 1;
  localStorage.setItem("reviewCount", count);
  document.getElementById("review-count").textContent = count;
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