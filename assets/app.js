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
const themeColor = document.querySelector("#themeColor");
const productStage = document.querySelector(".product-stage");
const demoButtons = Array.from(document.querySelectorAll("[data-demo]"));
const demoPrompt = document.querySelector("#demoPrompt");
const demoPermission = document.querySelector("#demoPermission");
const demoTitle = document.querySelector("#demoTitle");
const demoSummary = document.querySelector("#demoSummary");
const demoSlots = Array.from(document.querySelectorAll("[data-slot]"));
const demoRun = document.querySelector("#demoRun");
const demoStatus = document.querySelector("#demoStatus");
const demoPhases = Array.from(document.querySelectorAll("[data-stage-phase]"));
const storyCanvas = document.querySelector("#storyCanvas");
const storySequence = document.querySelector("#storySequence");
const storyCoreTitle = document.querySelector("#storyCoreTitle");
const storyCoreStatus = document.querySelector("#storyCoreStatus");
const storyChapters = Array.from(document.querySelectorAll("[data-story-key]"));
const storyTriggers = Array.from(document.querySelectorAll("[data-story-trigger]"));
const storyNodes = Array.from(document.querySelectorAll("[data-story-node]"));
const storyLines = Array.from(document.querySelectorAll("[data-network-line]"));
const storyLogs = Array.from(document.querySelectorAll("[data-story-log]"));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
  if (themeColor) themeColor.setAttribute("content", isDark ? "#050506" : "#ffffff");
}

updateThemeControl();
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    if (root.classList.contains("theme-changing")) return;
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    const applyTheme = () => {
      root.dataset.theme = nextTheme;
      try {
        localStorage.setItem("cak-theme", nextTheme);
      } catch {
        // The selected theme still applies for the current page.
      }
      updateThemeControl();
    };

    root.classList.add("theme-changing");
    themeToggle.disabled = true;
    if (!reduceMotion && document.startViewTransition) {
      document.startViewTransition(applyTheme);
    } else {
      applyTheme();
    }
    window.setTimeout(() => {
      root.classList.remove("theme-changing");
      themeToggle.disabled = false;
    }, reduceMotion ? 0 : 920);
  });
}

const demoScenarios = {
  build: {
    prompt: "“내 Codex 설정을 더 효율적으로 다듬어줘”",
    permission: "workspace-write",
    title: ["의도를 다듬고.", "구현은 끝까지."],
    summary: "제품 방향을 정리하고, 가장 좁은 스킬로 구현한 뒤 실제 화면까지 검증합니다.",
    slots: {
      primary: ["frontend-ui-engineering", true],
      adapter: ["Browser", true],
      verifier: ["webapp-testing", true],
      safety: ["Not required", false],
    },
  },
  inspect: {
    prompt: "“이 설정에서 문제인 부분만 확인해줘”",
    permission: "read-only",
    title: ["원인만 찾고.", "파일은 그대로."],
    summary: "확인 요청의 권한을 보존해 근거와 원인만 정리하고, 사용자가 고쳐 달라고 하기 전에는 수정하지 않습니다.",
    slots: {
      primary: ["diagnose", true],
      adapter: ["Not required", false],
      verifier: ["Focused checks", true],
      safety: ["Not required", false],
    },
  },
  secure: {
    prompt: "“결제 webhook을 안전하게 수정하고 검증해줘”",
    permission: "workspace-write · sensitive",
    title: ["보안 경계를 세우고.", "변경은 검증까지."],
    summary: "인증·권한·결제처럼 민감한 경계에서는 안전성 검토를 추가하고 회귀 검증까지 마친 뒤 결과를 전달합니다.",
    slots: {
      primary: ["security-and-hardening", true],
      adapter: ["Existing stack", true],
      verifier: ["reviewer-deep", true],
      safety: ["Sensitive boundary", true],
    },
  },
};

const demoPhaseLabels = {
  interpret: "의도를 정리했습니다.",
  permission: "허용된 작업 범위를 확인했습니다.",
  route: "필요한 책임과 스킬을 선택했습니다.",
  verify: "결과 검증을 완료했습니다.",
};

let demoPhaseTimers = [];

function clearDemoTimeline() {
  demoPhaseTimers.forEach((timer) => window.clearTimeout(timer));
  demoPhaseTimers = [];
}

function runDemoTimeline() {
  if (!productStage || !demoPhases.length) return;
  clearDemoTimeline();
  productStage.classList.add("is-running");
  if (demoRun) demoRun.disabled = true;

  demoPhases.forEach((phase) => {
    phase.classList.remove("is-active", "is-complete");
  });

  if (reduceMotion) {
    demoPhases.forEach((phase) => phase.classList.add("is-complete"));
    productStage.classList.remove("is-running");
    if (demoRun) demoRun.disabled = false;
    if (demoStatus) demoStatus.textContent = "요청 처리와 검증이 완료되었습니다.";
    return;
  }

  demoPhases.forEach((phase, index) => {
    demoPhaseTimers.push(
      window.setTimeout(() => {
        demoPhases.forEach((item, itemIndex) => {
          item.classList.toggle("is-complete", itemIndex < index);
          item.classList.toggle("is-active", itemIndex === index);
        });
        const phaseName = phase.dataset.stagePhase;
        if (demoStatus) demoStatus.textContent = demoPhaseLabels[phaseName];
      }, index * 430),
    );
  });

  demoPhaseTimers.push(
    window.setTimeout(() => {
      demoPhases.forEach((phase) => {
        phase.classList.remove("is-active");
        phase.classList.add("is-complete");
      });
      productStage.classList.remove("is-running");
      if (demoRun) demoRun.disabled = false;
      if (demoStatus) demoStatus.textContent = "요청 처리와 검증이 완료되었습니다.";
    }, demoPhases.length * 430 + 180),
  );
}

function setDemoTitle(lines) {
  if (!demoTitle) return;
  demoTitle.replaceChildren();
  lines.forEach((line, index) => {
    if (index) demoTitle.append(document.createElement("br"));
    demoTitle.append(document.createTextNode(line));
  });
}

let demoSwitchTimer;
function activateDemo(key) {
  const scenario = demoScenarios[key];
  if (!scenario || !productStage) return;
  window.clearTimeout(demoSwitchTimer);
  productStage.classList.add("is-switching");
  demoButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.demo === key));
  });

  demoSwitchTimer = window.setTimeout(() => {
    if (demoPrompt) demoPrompt.textContent = scenario.prompt;
    if (demoPermission) demoPermission.textContent = scenario.permission;
    setDemoTitle(scenario.title);
    if (demoSummary) demoSummary.textContent = scenario.summary;
    demoSlots.forEach((slot) => {
      const [value, isActive] = scenario.slots[slot.dataset.slot];
      const valueNode = slot.querySelector("em");
      if (valueNode) valueNode.textContent = value;
      slot.classList.toggle("is-active", isActive);
    });
    requestAnimationFrame(() => {
      productStage.classList.remove("is-switching");
      runDemoTimeline();
    });
  }, reduceMotion ? 0 : 180);
}

demoButtons.forEach((button) => {
  button.addEventListener("click", () => activateDemo(button.dataset.demo));
});

demoRun?.addEventListener("click", runDemoTimeline);

if (productStage && "IntersectionObserver" in window) {
  const demoObserver = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      runDemoTimeline();
      demoObserver.disconnect();
    },
    { threshold: 0.34 },
  );
  demoObserver.observe(productStage);
} else if (productStage) {
  runDemoTimeline();
}

if (productStage && !reduceMotion) {
  productStage.addEventListener("pointermove", (event) => {
    const rect = productStage.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 14;
    productStage.style.setProperty("--stage-shift-x", `${x}px`);
    productStage.style.setProperty("--stage-shift-y", `${y}px`);
  });
  productStage.addEventListener("pointerleave", () => {
    productStage.style.setProperty("--stage-shift-x", "0px");
    productStage.style.setProperty("--stage-shift-y", "0px");
  });
}

const storyStates = {
  intent: {
    sequence: "01 / 04",
    title: "Intent",
    status: "normalizing request",
  },
  permission: {
    sequence: "02 / 04",
    title: "Permission",
    status: "preserving effect ceiling",
  },
  route: {
    sequence: "03 / 04",
    title: "Route",
    status: "matching responsibilities",
  },
  verify: {
    sequence: "04 / 04",
    title: "Verify",
    status: "closing with evidence",
  },
};

const storyOrder = Object.keys(storyStates);

function activateStory(key) {
  const state = storyStates[key];
  if (!state || !storyCanvas) return;
  const activeIndex = storyOrder.indexOf(key);
  storyCanvas.dataset.storyActive = key;
  if (storySequence) storySequence.textContent = state.sequence;
  if (storyCoreTitle) storyCoreTitle.textContent = state.title;
  if (storyCoreStatus) storyCoreStatus.textContent = state.status;

  storyChapters.forEach((chapter) => {
    const isActive = chapter.dataset.storyKey === key;
    chapter.classList.toggle("is-active", isActive);
    chapter.querySelector("[data-story-trigger]")?.setAttribute("aria-pressed", String(isActive));
  });

  [storyNodes, storyLines, storyLogs].forEach((items) => {
    items.forEach((item) => {
      const itemKey = item.dataset.storyNode || item.dataset.networkLine || item.dataset.storyLog;
      const itemIndex = storyOrder.indexOf(itemKey);
      item.classList.toggle("is-active", itemKey === key);
      item.classList.toggle("is-complete", itemIndex >= 0 && itemIndex < activeIndex);
    });
  });
}

storyTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const chapter = trigger.closest("[data-story-key]");
    if (!chapter) return;
    activateStory(chapter.dataset.storyKey);
  });
});

let storyScrollFrame;
function updateStoryFromScroll() {
  storyScrollFrame = null;
  if (!storyChapters.length || !storyCanvas) return;
  const storyBounds = storyCanvas.closest(".story-layout")?.getBoundingClientRect();
  if (!storyBounds || storyBounds.top > window.innerHeight || storyBounds.bottom < 0) return;
  const focusLine = window.innerHeight * 0.52;
  const closest = storyChapters
    .map((chapter) => {
      const bounds = chapter.getBoundingClientRect();
      return {
        chapter,
        distance: Math.abs(bounds.top + bounds.height * 0.5 - focusLine),
      };
    })
    .sort((a, b) => a.distance - b.distance)[0];
  if (closest) activateStory(closest.chapter.dataset.storyKey);
}

activateStory("intent");
window.addEventListener(
  "scroll",
  () => {
    if (storyScrollFrame) return;
    storyScrollFrame = window.requestAnimationFrame(updateStoryFromScroll);
  },
  { passive: true },
);
window.addEventListener("resize", updateStoryFromScroll);

const sectionSearchItems = Array.from(document.querySelectorAll("section[id]")).map((section) => {
  const heading = section.querySelector("h2");
  const summary = section.querySelector(".section-note, .story-intro > p:last-child");
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
  if (event.key === "Escape" && searchDialog?.open) {
    event.preventDefault();
    searchDialog.close();
    return;
  }

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

const revealGroups = [
  ".hero-copy > *",
  ".hero-readout",
  ".product-stage",
  ".stats-band > div",
  ".story-intro > *",
  ".story-canvas",
  ".section-heading",
  ".principle-grid > .card",
  ".layer-list > .layer-item",
  ".skill-cloud > .skill-card:not(.is-hidden)",
  ".catalog-grid > section",
  ".content-stack > .terminal",
];

const revealTargets = [];
revealGroups.forEach((selector) => {
  document.querySelectorAll(selector).forEach((element, index) => {
    element.dataset.reveal = "";
    element.style.setProperty("--reveal-delay", `${Math.min(index, 4) * 85}ms`);
    revealTargets.push(element);
  });
});

root.classList.add("motion-ready");
if (window.__cakMotionFallback) {
  window.clearTimeout(window.__cakMotionFallback);
  window.__cakMotionFallback = null;
}

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px 14% 0px", threshold: 0.08 },
  );

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      revealTargets.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.94 && rect.bottom > 0) {
          element.classList.add("is-visible");
        } else {
          revealObserver.observe(element);
        }
      });
    });
  });
}

const statCounters = Array.from(document.querySelectorAll("[data-count]"));
function animateCounter(element) {
  if (element.dataset.counted === "true") return;
  element.dataset.counted = "true";
  const target = Number(element.dataset.count);
  if (reduceMotion || !Number.isFinite(target)) {
    element.textContent = String(target);
    return;
  }

  const startedAt = performance.now();
  const duration = 860;
  const step = (now) => {
    const progress = Math.min(1, (now - startedAt) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = String(Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

if ("IntersectionObserver" in window && !reduceMotion) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.7 },
  );
  statCounters.forEach((counter) => counterObserver.observe(counter));
} else {
  statCounters.forEach(animateCounter);
}

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
