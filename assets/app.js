const skillCloud = document.querySelector("#skillCloud");
const skillSearch = document.querySelector("#skillSearch");
const skillMeta = document.querySelector("#skillMeta");
const skillToggle = document.querySelector("#skillToggle");
const skillCatalog = Array.isArray(window.CODEX_SKILL_CATALOG) ? window.CODEX_SKILL_CATALOG : [];
const previewLimit = 12;
let isSkillCatalogExpanded = false;

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
  const matchingCards = skillCards.filter((card) => !query || card.textContent.toLowerCase().includes(query));
  const shownCards = query || isSkillCatalogExpanded ? matchingCards : matchingCards.slice(0, previewLimit);

  skillCards.forEach((card) => {
    card.classList.toggle("is-hidden", !shownCards.includes(card));
  });

  if (skillMeta) {
    skillMeta.textContent =
      !query && !isSkillCatalogExpanded
        ? `${skillCards.length}개 중 ${shownCards.length}개 미리보기`
        : `${skillCards.length}개 중 ${matchingCards.length}개 표시`;
  }

  if (skillToggle) {
    skillToggle.hidden = Boolean(query);
    skillToggle.setAttribute("aria-expanded", String(isSkillCatalogExpanded));
    skillToggle.innerHTML = isSkillCatalogExpanded
      ? '간략히 보기 <span aria-hidden="true">−</span>'
      : `전체 ${skillCards.length}개 보기 <span aria-hidden="true">＋</span>`;
  }
}

updateSkillFilter();
if (skillSearch) {
  skillSearch.addEventListener("input", updateSkillFilter);
}
if (skillToggle) {
  skillToggle.addEventListener("click", () => {
    isSkillCatalogExpanded = !isSkillCatalogExpanded;
    updateSkillFilter();
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
