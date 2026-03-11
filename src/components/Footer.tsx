import {
  GraduationCap,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  MapPin,
} from "lucide-react";

const Footer = () => (
  <footer className="bg-[#0f1f3d] text-white pt-20 pb-10 px-6">
    <div className="max-w-7xl mx-auto">

      {/* Top Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.8fr] items-start gap-16 mb-16">

        {/* Brand */}
        <div className="space-y-5">
  <div className="inline-block bg-white p-3 rounded-lg">
    <img
      src="/shiksharthi-logo.jpg"
      alt="Shiksharthi"
      className="h-16 w-auto object-contain"
    />
  </div>

          <p className="text-sm text-white/60 leading-relaxed max-w-xs">
            Kolkata’s trusted academic institute delivering structured
            preparation for Foundation, Boards, JEE, and NEET since 2010.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h4 className="font-semibold mb-5 text-sm tracking-widest uppercase text-[#eab308]">
            Quick Links
          </h4>

          <ul className="space-y-3">
            {[
              "About",
              "Programs",
              "Achievements",
              "Testimonials",
              "Contact",
            ].map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-white/60 hover:text-[#eab308] transition-colors duration-200"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div className="text-center">
          <h4 className="font-semibold mb-5 text-sm tracking-widest uppercase text-[#eab308]">
            Connect With Us
          </h4>

          <div className="flex justify-center gap-4">
            {[
              {
                icon: Facebook,
                label: "Facebook",
                link: "https://www.facebook.com/people/Shiksharthi-Educational-Institute/100065273520915/?mibextid=ZbWKwL",
              },
              {
                icon: Instagram,
                label: "Instagram",
                link: "https://www.instagram.com/shiksharthi.edu.institute/",
              },
              {
                icon: Youtube,
                label: "YouTube",
                link: "https://www.youtube.com/channel/UCAUFyRDZ9z_s6QAuKNFgf0Q",
              },
              /*
              {
                icon: Linkedin,
                label: "LinkedIn",
                link: "https://linkedin.com/company/yourcompany",
              }, */
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center
                           transition-all duration-300
                           hover:bg-[#eab308] hover:text-black
                           hover:-translate-y-1"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Campus */}
        <div className="space-y-6 lg:ml-auto w-full">
          <h4 className="font-semibold text-sm tracking-widest uppercase text-[#eab308]">
            Our Campus
          </h4>

          {/* Campus Card */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 w-full">

            {/* Image */}
            <div className="w-full h-36 rounded-lg overflow-hidden mb-5 flex items-center justify-center">
              <img
                src="/building/building baguipara.jpeg"
                alt="Shiksharthi Campus"
                className="max-h-full object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Addresses */}
            <div className="space-y-4 text-sm">

              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-[#eab308] mt-1 shrink-0" />
                <div className="text-white/80 leading-relaxed">
                  IF 11, Ashwini Nagar,<br />
                  Baguiati, Kolkata – 700159
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-[#eab308] mt-1 shrink-0" />
                <div className="text-white/80 leading-relaxed">
                  HH15 Baguiapara,<br />
                  Baguiati, Kolkata – 700159
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="border-t border-white/10 pt-6 text-center">
        <p className="text-xs text-white/40 tracking-wide">
          © {new Date().getFullYear()} Shiksharthi Educational Institute. All rights reserved.
        </p>
      </div>

    </div>
  </footer>
);

export default Footer;