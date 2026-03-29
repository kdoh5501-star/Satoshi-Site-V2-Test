"use client";

import { useEffect } from "react";

export function AutoScrollAnimation() {
  useEffect(() => {
    // Add scroll animation CSS
    const style = document.createElement("style");
    style.textContent = `
      .sa-animate {
        opacity: 0;
        transform: translateY(40px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
      }
      .sa-animate.sa-visible {
        opacity: 1;
        transform: translateY(0);
      }
      .sa-delay-1 { transition-delay: 0.1s; }
      .sa-delay-2 { transition-delay: 0.2s; }
      .sa-delay-3 { transition-delay: 0.3s; }
      .sa-delay-4 { transition-delay: 0.4s; }
      .sa-delay-5 { transition-delay: 0.5s; }

      .sa-card-hover {
        transition: transform 0.3s ease, box-shadow 0.3s ease !important;
      }
      .sa-card-hover:hover {
        transform: translateY(-8px) !important;
        box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
      }

      .sa-shimmer {
        background: linear-gradient(90deg, currentColor 0%, #fbbf24 25%, #f59e0b 50%, #fbbf24 75%, currentColor 100%);
        background-size: 200% auto;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: sa-shimmer-move 3s linear infinite;
      }
      @keyframes sa-shimmer-move {
        0% { background-position: 0% center; }
        100% { background-position: 200% center; }
      }

      .sa-section-divider {
        height: 2px;
        background: linear-gradient(90deg, transparent, #d4a017, #fbbf24, #d4a017, transparent);
        margin: 0 auto;
        max-width: 200px;
      }

      html { scroll-behavior: smooth; }
    `;
    document.head.appendChild(style);

    // Target sections and major content blocks
    const selectors = [
      "section",
      "main > div > div",
      ".grid > div",
      "[class*='Card']",
      "[class*='card']",
      "h2",
      "h3",
    ];

    const elements: Element[] = [];
    for (const sel of selectors) {
      document.querySelectorAll(sel).forEach((el) => {
        // Skip header, very small elements, and already-processed elements
        if (
          el.closest("header") ||
          el.closest("nav") ||
          el.closest("[role='dialog']") ||
          el.closest(".fixed") ||
          el.classList.contains("sa-animate")
        ) return;

        const rect = el.getBoundingClientRect();
        if (rect.height < 30) return;

        elements.push(el);
      });
    }

    // Deduplicate (remove children if parent is already in list)
    const unique = elements.filter((el, i) => {
      return !elements.some((other, j) => j !== i && other.contains(el) && other !== el);
    });

    // Apply animation classes
    unique.forEach((el) => {
      el.classList.add("sa-animate");
    });

    // Apply card hover effects
    document.querySelectorAll("[class*='shadow']").forEach((el) => {
      if (
        el.closest("header") ||
        el.closest("nav") ||
        el.closest("[role='dialog']") ||
        el.closest(".fixed")
      ) return;
      const rect = el.getBoundingClientRect();
      if (rect.height > 50 && rect.height < 800) {
        el.classList.add("sa-card-hover");
      }
    });

    // Apply shimmer to hero title
    const heroH1 = document.querySelector("section:first-of-type h1, section:first-of-type .text-5xl, section:first-of-type .text-6xl, section:first-of-type .text-7xl");
    if (heroH1) {
      heroH1.classList.add("sa-shimmer");
    }

    // Add section dividers
    document.querySelectorAll("section + section").forEach((section) => {
      if (!section.previousElementSibling) return;
      const divider = document.createElement("div");
      divider.className = "sa-section-divider";
      section.parentNode?.insertBefore(divider, section);
    });

    // IntersectionObserver for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("sa-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    // Add stagger delays to grid children
    document.querySelectorAll(".grid").forEach((grid) => {
      const children = grid.querySelectorAll(".sa-animate");
      children.forEach((child, index) => {
        const delay = Math.min(index + 1, 5);
        child.classList.add(`sa-delay-${delay}`);
      });
    });

    // Observe all animated elements
    document.querySelectorAll(".sa-animate").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      style.remove();
    };
  }, []);

  return null;
}
