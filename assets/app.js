const root = document.documentElement;
const skillCloud = document.querySelector("#skillCloud");
const skillSearch = document.querySelector("#skillSearch");
const skillMeta = document.querySelector("#skillMeta");
const skillToggle = document.querySelector("#skillToggle");
const themeToggle = document.querySelector("#themeToggle");
const readingProgress = document.querySelector("#readingProgress");
const searchDialog = document.querySelector("#siteSearchDialog");
const searchTrigger = document.querySelector("#siteSearchTrigger");
const searchClose = document.querySelector("#siteSearchClose");
const siteSearchInput = document.querySelector("#siteSearchInput");
const siteSearchHint = document.querySelector("#siteSearchHint");
const siteSearchResults = document.querySelector("#siteSearchResults");
const skillCatalog = Array.isArray(window.CODEX_SKILL_CATALOG) ? window.CODEX_SKILL_CATALOG : [];
const previewLimit = 12;
let isSkillCatalogExpanded = false;

function toSlug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-|-$/g, "");
}

if (skillCloud) {
  skillCatalog.forEach((skill) => {
    const card = document.createElement("article");
    card.className = "skill-card";
    card.id = `skill-${toSlug(skill.name)}`;
    card.dataset.skillName = skill.name;

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

function updateThemeControl() {
  if (!themeToggle) return;
  const isDark = root.dataset.theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "라이트 모드로 전환" : "다크 모드로 전환");
}

updateThemeControl();
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("cak-theme", root.dataset.theme);
    } catch {
      // The selected theme still applies for the current page.
    }
    updateThemeControl();
  });
}

const sectionSearchItems = Array.from(document.querySelectorAll("section[id]")).map((section) => {
  const heading = section.querySelector("h2");
  const summary = section.querySelector(".section-note, .quick-path-heading > p:not(.eyebrow)");
  return {
    type: "섹션",
    title: heading ? heading.textContent.trim() : section.id,
    description: summary ? summary.textContent.trim() : "페이지 주요 구성",
    target: `#${section.id}`,
  };
});

const agentSearchItems = Array.from(document.querySelectorAll(".layer-item")).map((item) => ({
  type: "에이전트",
  title: item.querySelector("h3")?.textContent.trim() || "Agent",
  description: item.querySelector("dd")?.textContent.trim() || "전문 에이전트 역할",
  target: "#agents",
}));

const pluginSearchItems = Array.from(document.querySelectorAll(".catalog-grid > section")).map((item) => ({
  type: "플러그인",
  title: item.querySelector("h3")?.textContent.trim() || "Plugin",
  description: item.querySelector("p")?.textContent.trim() || "연결된 도구",
  target: "#plugins",
}));

const skillSearchItems = skillCatalog.map((skill) => ({
  type: "스킬",
  title: skill.name,
  description: `${skill.category} · ${skill.description}`,
  target: `#skill-${toSlug(skill.name)}`,
  skill: skill.name,
}));

const siteSearchItems = [
  ...sectionSearchItems,
  ...agentSearchItems,
  ...pluginSearchItems,
  ...skillSearchItems,
];

function renderSiteSearchResults() {
  if (!siteSearchResults) return;
  const query = siteSearchInput ? siteSearchInput.value.trim().toLowerCase() : "";
  const matches = siteSearchItems
    .filter((item) => !query || `${item.type} ${item.title} ${item.description}`.toLowerCase().includes(query))
    .slice(0, 9);

  siteSearchResults.replaceChildren();

  if (siteSearchHint) {
    siteSearchHint.textContent = query
      ? `${siteSearchItems.length}개 항목 중 ${matches.length}개 결과`
      : "섹션과 47개 스킬을 한 번에 찾습니다.";
  }

  if (!matches.length) {
    const empty = document.createElement("p");
    empty.className = "search-empty";
    empty.textContent = "일치하는 항목이 없습니다.";
    siteSearchResults.append(empty);
    return;
  }

  matches.forEach((item) => {
    const button = document.createElement("button");
    button.className = "search-result";
    button.type = "button";

    const type = document.createElement("span");
    type.className = "search-result-type";
    type.textContent = item.type;

    const copy = document.createElement("span");
    copy.className = "search-result-copy";

    const title = document.createElement("strong");
    title.textContent = item.title;

    const description = document.createElement("span");
    description.textContent = item.description;

    const arrow = document.createElement("span");
    arrow.className = "search-result-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";

    copy.append(title, description);
    button.append(type, copy, arrow);
    button.addEventListener("click", () => {
      if (item.skill && skillSearch) {
        isSkillCatalogExpanded = true;
        skillSearch.value = item.skill;
        updateSkillFilter();
      }

      searchDialog?.close();
      window.setTimeout(() => {
        document.querySelector(item.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 20);
    });
    siteSearchResults.append(button);
  });
}

function openSiteSearch() {
  if (!searchDialog) return;
  renderSiteSearchResults();
  searchDialog.showModal();
  window.setTimeout(() => siteSearchInput?.focus(), 0);
}

searchTrigger?.addEventListener("click", openSiteSearch);
searchClose?.addEventListener("click", () => searchDialog?.close());
siteSearchInput?.addEventListener("input", renderSiteSearchResults);
searchDialog?.addEventListener("click", (event) => {
  if (event.target === searchDialog) searchDialog.close();
});
searchDialog?.addEventListener("close", () => {
  if (siteSearchInput) siteSearchInput.value = "";
  searchTrigger?.focus();
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    if (searchDialog?.open) {
      searchDialog.close();
    } else {
      openSiteSearch();
    }
  }
});

const navLinks = Array.from(document.querySelectorAll('.topnav a[href^="#"]'));
const navTargets = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && navTargets.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const current = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!current) return;

      navLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${current.target.id}`) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    },
    { rootMargin: "-28% 0px -62% 0px", threshold: [0, 0.2, 0.6] },
  );
  navTargets.forEach((section) => sectionObserver.observe(section));
}

function updateReadingProgress() {
  if (!readingProgress) return;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
  readingProgress.style.transform = `scaleX(${ratio})`;
}

updateReadingProgress();
window.addEventListener("scroll", updateReadingProgress, { passive: true });
window.addEventListener("resize", updateReadingProgress);

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
