const skillSearch = document.querySelector("#skillSearch");
const skillPills = Array.from(document.querySelectorAll("#skillCloud .skill-pill"));
const skillMeta = document.querySelector("#skillMeta");

function updateSkillFilter() {
  const query = skillSearch.value.trim().toLowerCase();
  let visibleCount = 0;

  skillPills.forEach((pill) => {
    const isMatch = !query || pill.textContent.toLowerCase().includes(query);
    pill.classList.toggle("is-hidden", !isMatch);
    if (isMatch) visibleCount += 1;
  });

  if (skillMeta) {
    skillMeta.textContent = `${skillPills.length}개 중 ${visibleCount}개 표시`;
  }
}

if (skillSearch) {
  updateSkillFilter();
  skillSearch.addEventListener("input", updateSkillFilter);
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll("[data-copy-target]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copyTarget);
    if (!target) return;

    try {
      await navigator.clipboard.writeText(target.textContent.trim());
      button.textContent = "복사됨";
      button.classList.add("is-copied");
    } catch {
      button.textContent = "복사 실패";
    }

    window.setTimeout(() => {
      button.textContent = "복사";
      button.classList.remove("is-copied");
    }, 1600);
  });
});
