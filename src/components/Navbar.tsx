import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAppNavigation } from "@/hooks/useAppNavigation";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { navItems, handleNavClick, isNavItemActive } = useAppNavigation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const contactNavItem = navItems.find((item) => item.id === "contact") || {
    id: "contact",
    label: "Contact",
    type: "section" as const,
    target: "contact",
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <div
            className="bg-white px-3 py-1.5 rounded-xl border border-[#eab308]/70 shadow-sm
                       transition-all duration-300 ease-out
                       group-hover:shadow-lg group-hover:-translate-y-0.5 group-hover:border-[#eab308]"
          >
            <img
              src="/shiksharthi-logo.jpg"
              alt="Shiksharthi Institute"
              loading="eager"
              decoding="async"
              className="h-9 w-auto object-contain"
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => {
            const active = isNavItemActive(item);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item)}
                className={`relative text-sm font-medium transition-colors duration-200 group cursor-pointer ${
                  active ? "text-[#142850] font-semibold" : "text-slate-600 hover:text-[#142850]"
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-[#eab308] transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            );
          })}

          <Button
            size="sm"
            onClick={() => handleNavClick(contactNavItem)}
            className="bg-[#eab308] hover:bg-[#d4a307] text-black font-semibold rounded-xl px-5 py-2 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            Enroll Now
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          aria-label="Toggle Menu"
          className="md:hidden text-[#142850]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-5">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item, () => setMenuOpen(false))}
                className="text-left text-base font-medium text-slate-700 hover:text-[#142850] transition-colors duration-200 cursor-pointer"
              >
                {item.label}
              </button>
            ))}

            <Button
              size="sm"
              onClick={() => handleNavClick(contactNavItem, () => setMenuOpen(false))}
              className="bg-[#eab308] hover:bg-[#d4a307] text-black font-semibold rounded-xl w-full py-3 shadow-sm cursor-pointer"
            >
              Enroll Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;