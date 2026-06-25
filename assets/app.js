const skillSearch = document.querySelector("#skillSearch");
const skillButtons = Array.from(document.querySelectorAll("#skillCloud .skill-pill"));

if (skillSearch) {
  skillSearch.addEventListener("input", () => {
    const query = skillSearch.value.trim().toLowerCase();

    skillButtons.forEach((button) => {
      const isMatch = !query || button.textContent.toLowerCase().includes(query);
      button.classList.toggle("is-hidden", !isMatch);
    });
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
