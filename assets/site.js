/* ==========================================================================
   Slifer Farm - shared site behaviour
   Loaded by every page. Every feature is guarded, so a page that lacks a
   given element (map mount, spy sections) simply skips that feature.
   No build step, no dependencies.
   ========================================================================== */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- current year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- mobile nav ---------- */
  var toggle = document.getElementById("navToggle");
  var links  = document.getElementById("navLinks");

  function closeNav() {
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  links.addEventListener("click", function (e) {
    if (e.target.closest("a")) closeNav();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && links.classList.contains("is-open")) {
      closeNav();
      toggle.focus();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 860) closeNav();
  });

  /* ---------- sticky nav shadow ---------- */
  var nav = document.getElementById("nav");
  var toTop = document.getElementById("toTop");

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    nav.classList.toggle("is-stuck", y > 12);
    toTop.classList.toggle("is-on", y > 700);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* ---------- scroll reveal ---------- */
  var revealables = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealables.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        obs.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });

    revealables.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- lazy map ---------- */
  var mount = document.getElementById("mapMount");

  function loadMap() {
    if (!mount || mount.dataset.loaded) return;
    mount.dataset.loaded = "1";

    var frame = document.createElement("iframe");
    frame.src = mount.dataset.src;
    frame.title = "Google Map showing Slifer Farm at 1085 County Road 2200 N, Champaign, IL 61822";
    frame.loading = "lazy";
    frame.referrerPolicy = "no-referrer-when-downgrade";
    frame.setAttribute("allowfullscreen", "");
    frame.addEventListener("load", function () { mount.remove(); });

    mount.parentNode.appendChild(frame);
  }

  if (mount) {
    if (!("IntersectionObserver" in window)) {
      loadMap();
    } else {
      var mapObserver = new IntersectionObserver(function (entries) {
        if (entries.some(function (e) { return e.isIntersecting; })) {
          mapObserver.disconnect();
          loadMap();
        }
      }, { rootMargin: "300px 0px" });
      mapObserver.observe(mount);
    }
  }

  /* ---------- active nav link ---------- */
  var sectionIds = ["shop", "about", "visit", "contact"];
  var navLinkFor = {};
  sectionIds.forEach(function (id) {
    var a = links.querySelector('a[href="#' + id + '"]');
    if (a) navLinkFor[id] = a;
  });

  var sections = sectionIds
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var visible = {};
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visible[entry.target.id] = entry.isIntersecting;
      });

      var current = null;
      for (var i = sections.length - 1; i >= 0; i--) {
        if (visible[sections[i].id]) { current = sections[i].id; break; }
      }

      sectionIds.forEach(function (id) {
        if (navLinkFor[id]) navLinkFor[id].classList.toggle("is-active", id === current);
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(function (s) { spy.observe(s); });
  }
})();
