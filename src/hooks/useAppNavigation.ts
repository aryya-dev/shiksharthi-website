import { useNavigate, useLocation } from "react-router-dom";
import { NavItem, NAV_ITEMS } from "@/config/navigation";

export function scrollToSectionId(sectionId: string): boolean {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
    return true;
  }
  return false;
}

export function useAppNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (item: NavItem, onComplete?: () => void) => {
    if (item.type === "page") {
      if (location.pathname !== item.target) {
        navigate(item.target);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (item.type === "section") {
      if (location.pathname === "/") {
        const scrolled = scrollToSectionId(item.target);
        if (scrolled) {
          navigate("/", { state: { scrollToSection: item.target }, replace: false });
        }
      } else {
        navigate("/", { state: { scrollToSection: item.target } });
      }
    }

    if (onComplete) {
      onComplete();
    }
  };

  const isNavItemActive = (item: NavItem): boolean => {
    if (item.type === "page") {
      return location.pathname === item.target;
    }
    if (item.type === "section" && location.pathname === "/") {
      return location.state?.scrollToSection === item.target;
    }
    return false;
  };

  return {
    handleNavClick,
    isNavItemActive,
    currentPath: location.pathname,
    navItems: NAV_ITEMS,
  };
}
