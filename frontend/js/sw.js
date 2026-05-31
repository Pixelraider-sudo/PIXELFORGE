// ── LOADER ──
const logs = [
  "Loading core modules...",
  "Initializing AI systems...",
  "Connecting divisions...",
  "Securing communications...",
  "Ecosystem ready.",
];
let li = 0;
const logEl = document.getElementById("loader-log");
const logInt = setInterval(() => {
  li++;
  if (li < logs.length) {
    logEl.textContent = logs[li];
  } else {
    clearInterval(logInt);
  }
}, 420);
setTimeout(() => {
  document.getElementById("loader").classList.add("hidden");
}, 2800);

// ── MARQUEE ──
const techs = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "GraphQL",
  "Kubernetes",
  "Docker",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "OpenAI",
  "WebSockets",
  "NestJS",
  "Kotlin",
  "Swift",
  "AWS",
  "Supabase",
  "Firebase",
  "Three.js",
  "Tailwind CSS",
  "Express.js",
  "Google Cloud",
];
function buildMarquee(id, items) {
  const t = document.getElementById(id);
  if (!t) return;
  const doubled = [...items, ...items];
  t.innerHTML = doubled
    .map(
      (x) =>
        `<div class="marquee-item"><div class="marquee-dot"></div><span class="marquee-text">${x}</span></div>`,
    )
    .join("");
}
buildMarquee("marquee-track", techs);
buildMarquee("marquee-track-2", [...techs].reverse());

// ── INTERSECTION OBSERVER ──
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const siblings = Array.from(e.target.parentElement.children);
        const idx = siblings.indexOf(e.target);
        e.target.style.cssText += `opacity:0;transform:translateY(18px);transition:opacity 0.55s ${idx * 55}ms,transform 0.55s ${idx * 55}ms`;
        requestAnimationFrame(() => {
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0)";
        });
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.06 },
);

document
  .querySelectorAll(
    ".div-card,.value-card,.phase,.stack-col,.mv-card,.brand-card,.org-div",
  )
  .forEach((el) => {
    el.style.opacity = "0";
    obs.observe(el);
  });

// ── CURSOR GLOW ──
const glow = document.getElementById("cursor-glow");
let mx = window.innerWidth / 2,
  my = window.innerHeight / 2,
  cx = mx,
  cy = my;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
});
(function animGlow() {
  cx += (mx - cx) * 0.1;
  cy += (my - cy) * 0.1;
  glow.style.left = cx + "px";
  glow.style.top = cy + "px";
  requestAnimationFrame(animGlow);
})();

// ── ACTIVE NAV ──
const sections = document.querySelectorAll("section[id], div[id]");
const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener(
  "scroll",
  () => {
    let current = "";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navLinks.forEach((a) => {
      a.style.color =
        a.getAttribute("href") === "#" + current ? "var(--cyan)" : "";
    });
  },
  { passive: true },
);
