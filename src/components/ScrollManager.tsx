import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToSectionId } from "@/hooks/useAppNavigation";

export default function ScrollManager() {
  const { pathname, state, hash } = useLocation();

  useEffect(() => {
    const targetSection = state?.scrollToSection || (hash ? hash.replace("#", "") : null);

    if (pathname === "/" && targetSection) {
      let attempts = 0;
      const maxAttempts = 15;

      const tryScroll = () => {
        const scrolled = scrollToSectionId(targetSection);
        if (!scrolled && attempts < maxAttempts) {
          attempts++;
          setTimeout(tryScroll, 50);
        }
      };

      tryScroll();
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [pathname, state, hash]);

  return null;
}
