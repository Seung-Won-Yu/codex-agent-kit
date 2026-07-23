const skillCloud = document.querySelector("#skillCloud");
const skillSearch = document.querySelector("#skillSearch");
const skillMeta = document.querySelector("#skillMeta");
const skillCatalog = Array.isArray(window.CODEX_SKILL_CATALOG) ? window.CODEX_SKILL_CATALOG : [];

if (skillCloud) {
  skillCatalog.forEach((skill) => {
    const card = document.createElement("article");
    card.className = "skill-card";

    const header = document.createElement("div");
    header.className = "skill-card-head";

    const name = document.createElement("h3");
    name.textContent = skill.name;

    const scope = document.createElement("span");
    scope.className = "skill-scope";
    scope.textContent = skill.scope;

    const category = document.createElement("span");
    category.className = "skill-category";
    category.textContent = skill.category;

    const description = document.createElement("p");
    description.textContent = skill.description;

    header.append(name, scope);
    card.append(header, category, description);
    skillCloud.append(card);
  });
}

const skillCards = Array.from(document.querySelectorAll("#skillCloud .skill-card"));

function updateSkillFilter() {
  const query = skillSearch ? skillSearch.value.trim().toLowerCase() : "";
  let visibleCount = 0;

  skillCards.forEach((card) => {
    const isMatch = !query || card.textContent.toLowerCase().includes(query);
    card.classList.toggle("is-hidden", !isMatch);
    if (isMatch) visibleCount += 1;
  });

  if (skillMeta) {
    skillMeta.textContent = `${skillCards.length}개 중 ${visibleCount}개 표시`;
  }
}

updateSkillFilter();
if (skillSearch) {
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
