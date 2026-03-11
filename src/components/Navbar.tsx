import { useState, useEffect } from "react";
import { Menu, X, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


const navLinks = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Achievers", href: "#achievers" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
       <a href="/" className="flex items-center group">
  <div className="bg-white px-3 py-1.5 rounded-xl border border-[#eab308]/70 shadow-sm 
                  transition-all duration-300 ease-out
                  group-hover:shadow-lg group-hover:-translate-y-0.5 group-hover:border-[#eab308]">
    <img
      src="/shiksharthi-logo.jpg"
      alt="Shiksharthi Institute"
      className="h-9 w-auto object-contain"
    />
  </div>
</a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-slate-600 hover:text-[#142850] transition-colors duration-200 group"
            >
              {link.label}

              {/* Hover underline animation */}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#eab308] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}

          <Button
            asChild
            size="sm"
            className="bg-[#eab308] hover:bg-[#d4a307] text-black font-semibold rounded-xl px-5 py-2 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <a href="#contact">Enroll Now</a>
          </Button>

        </div>

        {/* Mobile Toggle */}
        <button
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

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-slate-700 hover:text-[#142850] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}

            <Button
              asChild
              size="sm"
              className="bg-[#eab308] hover:bg-[#d4a307] text-black font-semibold rounded-xl w-full py-3 shadow-sm"
            >
              <a href="#contact" onClick={() => setMenuOpen(false)}>
                Enroll Now
              </a>
            </Button>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;