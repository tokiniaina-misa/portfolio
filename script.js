(() => {
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");
  const year = document.getElementById("year");
  const copy = document.getElementById("copy-email");
  const feedback = document.getElementById("copy-feedback");
  if (year) year.textContent = String(new Date().getFullYear());

  btn?.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    btn.setAttribute("aria-label", open ? "Ouvrir le menu" : "Fermer le menu");
    btn.textContent = open ? "☰" : "×";
    if (menu) menu.hidden = open;
  });
  menu?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      if (menu) menu.hidden = true;
      btn?.setAttribute("aria-expanded", "false");
      if (btn) btn.textContent = "☰";
    });
  });

  const links = [...document.querySelectorAll("[data-nav]")];
  const sections = links.map((l) => document.getElementById(l.getAttribute("href").slice(1))).filter(Boolean);
  const onScroll = () => {
    const y = window.scrollY + 120;
    let id = sections[0]?.id;
    sections.forEach((s) => { if (s.offsetTop <= y) id = s.id; });
    links.forEach((l) => {
      if (l.getAttribute("href") === "#" + id) l.setAttribute("aria-current", "page");
      else l.removeAttribute("aria-current");
    });
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  copy?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(copy.dataset.email || "");
      feedback?.classList.remove("hidden");
      setTimeout(() => feedback?.classList.add("hidden"), 1500);
    } catch { /* ignore */ }
  });
})();
