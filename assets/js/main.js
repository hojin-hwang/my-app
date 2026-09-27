/* =========================================================
 *  Profile Site — Vanilla JS (외부 라이브러리 없음)
 * ========================================================= */
(function () {
  "use strict";

  /* ---------- 작은 헬퍼 ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /** HTML 이스케이프 (데이터가 그대로 마크업에 들어가는 것을 방지) */
  const esc = (v) =>
    String(v ?? "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c]));

  /** 태그 이름으로 엘리먼트를 만들고 속성/자식을 붙인다 */
  function el(tag, attrs = {}, html = "") {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v === false || v == null) continue;
      if (k === "class") node.className = v;
      else if (k.startsWith("on") && typeof v === "function")
        node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v);
    }
    if (html) node.innerHTML = html;
    return node;
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- SVG 아이콘 (인라인, 외부 요청 없음) ---------- */
  const ICONS = {
    github:
      '<path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.4-3.4-1.4-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.2.7-1.4-2.2-.3-4.6-1.2-4.6-5.1 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .9-.3 2.9 1 .8-.2 1.7-.3 2.6-.3.9 0 1.8.1 2.6.3 2-1.4 2.9-1 2.9-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.8-4.6 5 .4.3.7 1 .7 2v3c0 .3.2.6.7.5 4-1.4 6.8-5.2 6.8-9.7C22 6.6 17.5 2 12 2z"/>',
    mail:
      '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M3 6.5h18v11H3zM3 7l9 6.5L21 7"/>',
    blog:
      '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M4 4h11l5 5v11H4zM15 4v5h5M8 13h8M8 17h5"/>',
    linkedin:
      '<path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95 4.02 0 4.39 2.5 4.39 5.76V21H18v-5.7c0-1.36-.02-3.11-1.9-3.11-1.9 0-2.19 1.48-2.19 3.01V21H10z"/>',
    pin:
      '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.6" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    phone:
      '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M6 3h3l2 5-2.2 1.3a12 12 0 005.9 5.9L16 13l5 2v3a2 2 0 01-2.2 2A17 17 0 014 5.2A2 2 0 016 3z"/>',
    code:
      '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M9 17l-5-5 5-5M15 7l5 5-5 5"/>',
    link:
      '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M10.5 13.5a4 4 0 015.6-5.6l2.4 2.4a4 4 0 01-5.6 5.6M13.5 10.5a4 4 0 01-5.6 5.6l-2.4-2.4a4 4 0 015.6-5.6"/>',
    download:
      '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M12 3v11m0 0l4-4m-4 4l-4-4M4 19h16"/>',
    arrowUp:
      '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M12 20V5m0 0l-6 6m6-6l6 6"/>',
    sun:
      '<circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4"/>',
    moon:
      '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z"/>',
    menu:
      '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16"/>',
    close:
      '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/>',
  };

  const svg = (name, cls = "") =>
    `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"${
      cls ? ` class="${cls}"` : ""
    }>${ICONS[name] || ""}</svg>`;

  /* =======================================================
   *  1. 테마 (localStorage + 시스템 설정)
   * ===================================================== */
  const Theme = {
    KEY: "profile-theme",
    init() {
      const saved = this.read();
      const system = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      this.apply(saved || system);

      const btn = $("#themeToggle");
      if (btn) btn.addEventListener("click", () => this.toggle());

      // 저장된 선택이 없을 때만 시스템 변경을 따라간다
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          if (!this.read()) this.apply(e.matches ? "dark" : "light");
        });
    },
    read() {
      try {
        return localStorage.getItem(this.KEY);
      } catch (_) {
        return null;
      }
    },
    apply(mode) {
      document.documentElement.setAttribute("data-theme", mode);
      const btn = $("#themeToggle");
      if (btn) {
        btn.innerHTML = svg(mode === "dark" ? "sun" : "moon");
        btn.setAttribute(
          "aria-label",
          mode === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"
        );
      }
    },
    toggle() {
      const next =
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "light"
          : "dark";
      this.apply(next);
      try {
        localStorage.setItem(this.KEY, next);
      } catch (_) {}
    },
  };

  /* =======================================================
   *  2. 데이터 → 화면 렌더링
   * ===================================================== */
  function renderHero() {
    $("#brandMark").textContent = PROFILE.avatarInitials;
    $("#brandName").textContent = PROFILE.nameKo || PROFILE.name;

    $("#heroName").innerHTML =
      `안녕하세요,<br><span class="accent">${esc(
        PROFILE.nameKo || PROFILE.name
      )}</span>입니다.`;
    $("#heroSummary").textContent = PROFILE.summary;

    // CTA
    const cta = $("#heroCta");
    cta.appendChild(
      el(
        "a",
        { class: "btn btn-primary", href: "#contact" },
        `${svg("mail")}<span>연락하기</span>`
      )
    );
    cta.appendChild(
      el(
        "a",
        { class: "btn btn-ghost", href: "#projects" },
        `${svg("code")}<span>프로젝트 보기</span>`
      )
    );
    if (PROFILE.resumeUrl) {
      cta.appendChild(
        el(
          "a",
          { class: "btn btn-ghost", href: PROFILE.resumeUrl, download: "" },
          `${svg("download")}<span>이력서</span>`
        )
      );
    }

    // 카드
    $("#avatar").textContent = PROFILE.avatarInitials;
    $("#cardName").textContent = PROFILE.nameKo
      ? `${PROFILE.nameKo} · ${PROFILE.name}`
      : PROFILE.name;
    $("#cardRole").textContent = PROFILE.title;

    const meta = $("#avatarMeta");
    const metaRows = [
      ["pin", PROFILE.location],
      ["mail", PROFILE.email],
      ["phone", PROFILE.phone],
    ].filter(([, v]) => v);
    metaRows.forEach(([icon, value]) => {
      meta.appendChild(el("li", {}, `${svg(icon)}<span>${esc(value)}</span>`));
    });

    const social = $("#socialLinks");
    PROFILE.links
      .filter((l) => l.url)
      .forEach((l) => {
        const isExternal = !l.url.startsWith("mailto:");
        social.appendChild(
          el(
            "a",
            {
              href: l.url,
              "aria-label": l.label,
              title: l.label,
              target: isExternal ? "_blank" : false,
              rel: isExternal ? "noopener noreferrer" : false,
            },
            svg(l.icon)
          )
        );
      });

    const stats = $("#stats");
    PROFILE.stats.forEach((s) => {
      stats.appendChild(
        el(
          "div",
          { class: "stat reveal" },
          `<b data-count="${Number(s.value)}" data-suffix="${esc(
            s.suffix || ""
          )}">0</b><span>${esc(s.label)}</span>`
        )
      );
    });
  }

  function renderAbout() {
    const box = $("#aboutText");
    PROFILE.about.forEach((p) => box.appendChild(el("p", {}, esc(p))));

    const tl = $("#timeline");
    PROFILE.timeline.forEach((t) => {
      tl.appendChild(
        el(
          "li",
          {},
          `<div class="when">${esc(t.when)}</div>
           <h3 class="what">${esc(t.what)}</h3>
           <div class="where">${esc(t.where)}</div>
           ${t.detail ? `<p class="detail">${esc(t.detail)}</p>` : ""}`
        )
      );
    });
  }

  function renderSkills() {
    const wrap = $("#skillGroups");
    PROFILE.skills.forEach((group) => {
      const items = group.items
        .map(
          (s) => `
          <div class="skill">
            <div class="skill-top"><b>${esc(s.name)}</b><span>${Number(
            s.level
          )}%</span></div>
            <div class="bar"><i data-level="${Number(s.level)}"></i></div>
          </div>`
        )
        .join("");
      wrap.appendChild(
        el(
          "article",
          { class: "skill-card reveal" },
          `<h3>${esc(group.group)}</h3>${items}`
        )
      );
    });
  }

  function renderProjects() {
    const grid = $("#projectGrid");
    const filters = $("#projectFilters");

    // 태그 목록에서 필터 버튼 자동 생성
    const tags = ["All"];
    PROFILE.projects.forEach((p) =>
      (p.tags || []).forEach((t) => {
        if (!tags.includes(t)) tags.push(t);
      })
    );

    tags.forEach((t, i) => {
      filters.appendChild(
        el(
          "button",
          {
            type: "button",
            class: "chip" + (i === 0 ? " is-active" : ""),
            "data-filter": t,
            "aria-pressed": i === 0 ? "true" : "false",
          },
          t === "All" ? "전체" : esc(t)
        )
      );
    });

    function cardOf(p) {
      const stack = (p.stack || [])
        .map((s) => `<span class="tag">${esc(s)}</span>`)
        .join("");
      const links = [
        p.repo
          ? `<a href="${esc(
              p.repo
            )}" target="_blank" rel="noopener noreferrer">${svg(
              "github"
            )}<span>코드</span></a>`
          : "",
        p.demo
          ? `<a href="${esc(
              p.demo
            )}" target="_blank" rel="noopener noreferrer">${svg(
              "link"
            )}<span>데모</span></a>`
          : "",
      ]
        .filter(Boolean)
        .join("");

      return el(
        "article",
        { class: "card reveal", "data-tags": (p.tags || []).join(",") },
        `<div class="period">${esc(p.period)}</div>
         <h3>${esc(p.title)}</h3>
         <p>${esc(p.description)}</p>
         <div class="stack">${stack}</div>
         ${links ? `<div class="card-links">${links}</div>` : ""}`
      );
    }

    function draw(filter) {
      grid.innerHTML = "";
      const list =
        filter === "All"
          ? PROFILE.projects
          : PROFILE.projects.filter((p) => (p.tags || []).includes(filter));

      if (!list.length) {
        grid.appendChild(
          el("p", { class: "empty" }, "해당 분류의 프로젝트가 아직 없습니다.")
        );
        return;
      }
      list.forEach((p) => grid.appendChild(cardOf(p)));
      Reveal.observe(grid);
      // 필터 직후에는 애니메이션을 기다리지 않고 바로 보여준다
      requestAnimationFrame(() =>
        $$(".card", grid).forEach((c) => c.classList.add("is-in"))
      );
    }

    filters.addEventListener("click", (e) => {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      $$(".chip", filters).forEach((c) => {
        const on = c === btn;
        c.classList.toggle("is-active", on);
        c.setAttribute("aria-pressed", String(on));
      });
      draw(btn.dataset.filter);
    });

    draw("All");
  }

  function renderContact() {
    $("#contactHeadline").textContent = PROFILE.contact.headline;
    $("#contactBody").textContent = PROFILE.contact.body;

    const list = $("#contactList");
    const rows = [
      { icon: "mail", key: "Email", value: PROFILE.email, copy: true },
      { icon: "phone", key: "Phone", value: PROFILE.phone, copy: true },
      { icon: "pin", key: "Address", value: PROFILE.contact.address },
    ].filter((r) => r.value);

    rows.forEach((r) => {
      const item = el(
        "div",
        { class: "contact-item" },
        `<div class="ico">${svg(r.icon)}</div>
         <div><div class="k">${esc(r.key)}</div>
         <div class="v">${esc(r.value)}</div></div>`
      );
      if (r.copy) {
        const btn = el("button", { type: "button", class: "copy" }, "복사");
        btn.addEventListener("click", () => copyText(r.value));
        item.appendChild(btn);
      }
      list.appendChild(item);
    });

    $("#footerName").textContent = PROFILE.nameKo || PROFILE.name;
    $("#footerYear").textContent = new Date().getFullYear();
  }

  /* =======================================================
   *  3. 클립보드 + 토스트
   * ===================================================== */
  let toastTimer = null;
  function toast(message) {
    const box = $("#toast");
    box.textContent = message;
    box.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => box.classList.remove("is-visible"), 2000);
  }

  function copyText(text) {
    const done = () => toast("클립보드에 복사했습니다");
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, () => fallback(text, done));
    } else {
      fallback(text, done);
    }
    function fallback(value, cb) {
      // file:// 이나 구형 브라우저용 대체 경로
      const ta = el("textarea");
      ta.value = value;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;top:-1000px;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        cb();
      } catch (_) {
        toast("복사에 실패했습니다: " + value);
      }
      ta.remove();
    }
  }

  /* =======================================================
   *  4. 스크롤 등장 애니메이션 + 숫자 카운터 + 스킬 바
   * ===================================================== */
  const Reveal = {
    io: null,
    init() {
      if (!("IntersectionObserver" in window) || prefersReducedMotion) {
        $$(".reveal").forEach((n) => n.classList.add("is-in"));
        $$(".bar > i").forEach((b) => (b.style.width = b.dataset.level + "%"));
        $$("b[data-count]").forEach(
          (n) => (n.textContent = n.dataset.count + (n.dataset.suffix || ""))
        );
        return;
      }
      this.io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const node = entry.target;
            node.classList.add("is-in");

            $$(".bar > i", node).forEach((bar, i) => {
              setTimeout(() => {
                bar.style.width = bar.dataset.level + "%";
              }, i * 90);
            });
            $$("b[data-count]", node).forEach(countUp);

            this.io.unobserve(node);
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
      this.observe(document);
    },
    observe(root) {
      if (!this.io) return;
      $$(".reveal", root).forEach((n) => {
        if (!n.classList.contains("is-in")) this.io.observe(n);
      });
    },
  };

  function countUp(node) {
    const target = Number(node.dataset.count) || 0;
    const suffix = node.dataset.suffix || "";
    const duration = 1100;
    const start = performance.now();

    function frame(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      node.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* =======================================================
   *  5. 타이핑 효과
   * ===================================================== */
  function typeLoop() {
    const host = $("#typed");
    const roles = PROFILE.roles || [];
    if (!host || !roles.length) return;

    if (prefersReducedMotion) {
      host.textContent = roles[0];
      return;
    }

    let idx = 0;
    let pos = 0;
    let deleting = false;

    (function tick() {
      const word = roles[idx];
      pos += deleting ? -1 : 1;
      host.textContent = word.slice(0, pos);

      let delay = deleting ? 45 : 95;
      if (!deleting && pos === word.length) {
        deleting = true;
        delay = 1600;
      } else if (deleting && pos === 0) {
        deleting = false;
        idx = (idx + 1) % roles.length;
        delay = 320;
      }
      setTimeout(tick, delay);
    })();
  }

  /* =======================================================
   *  6. 헤더 / 네비게이션 / 스크롤 스파이 / 진행바
   * ===================================================== */
  function initNav() {
    const header = $("#header");
    const nav = $("#nav");
    const toggle = $("#navToggle");
    const toTop = $("#toTop");
    const progress = $("#progress");
    const links = $$("#nav a");
    const sections = links
      .map((a) => $(a.getAttribute("href")))
      .filter(Boolean);

    // 모바일 메뉴
    toggle.innerHTML = svg("menu");
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.innerHTML = svg(open ? "close" : "menu");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a") && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.innerHTML = svg("menu");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        toggle.click();
      }
    });

    toTop.innerHTML = svg("arrowUp");
    toTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" })
    );

    // rAF로 스크롤 핸들러를 한 프레임에 한 번만 실행
    let queued = false;
    function onScroll() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;

        header.classList.toggle("is-stuck", y > 8);
        toTop.classList.toggle("is-visible", y > 480);
        progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";

        // 스크롤 스파이: 헤더 아래에 걸린 마지막 섹션을 활성화
        const line = y + parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) + 40;
        let current = null;
        sections.forEach((s) => {
          if (s.offsetTop <= line) current = s;
        });
        links.forEach((a) =>
          a.classList.toggle(
            "is-active",
            current && a.getAttribute("href") === "#" + current.id
          )
        );

        queued = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  }

  /* =======================================================
   *  부팅
   * ===================================================== */
  function boot() {
    Theme.init();
    renderHero();
    renderAbout();
    renderSkills();
    renderProjects();
    renderContact();
    typeLoop();
    initNav();
    Reveal.init();

    document.title = `${PROFILE.nameKo || PROFILE.name} · ${PROFILE.title}`;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
