// calculateWindChill: one-liner Celsius formula
//   T in °C, V in km/h
function calculateWindChill(T, V) {
  return 13.12 + 0.6215 * T - 11.37 * V**0.16 + 0.3965 * T * V**0.16;
}

document.addEventListener("DOMContentLoaded", () => {
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

  // 3) Wind chill calculation
  const T = 10;   // °C
  const V = 5;    // km/h
  let wcText = "N/A";

  if (T <= 10 && V > 4.8) {
    const wc = calculateWindChill(T, V);
    wcText = wc.toFixed(1) + " °C";
  }

  document.getElementById("windchill").textContent = wcText;
});

