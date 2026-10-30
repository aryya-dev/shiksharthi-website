import { MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const SSATVenue = () => (
  <section id="ssat-venue" className="py-24 bg-white">
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-12">
        <span className="text-sm font-semibold tracking-widest uppercase text-[#eab308]">
          Examination Location
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#142850] mt-3">
          Examination Venue
        </h2>
      </div>

      <div className="bg-[#142850] rounded-3xl overflow-hidden shadow-2xl">
        <div className="grid md:grid-cols-2">
          {/* Map */}
          <div className="h-72 md:h-auto min-h-[280px]">
            <iframe
              title="SSAT Examination Venue"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.2218657530425!2d88.4315312!3d22.608188700000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02759d5e565377%3A0xb4960d28690d4761!2sShiksharthi%20Educational%20Institute!5e0!3m2!1sen!2sin!4v1771855686650!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "contrast(0.9) saturate(0.8)" }}
              loading="lazy"
              allowFullScreen
            />
          </div>

          {/* Info */}
          <div className="p-10 flex flex-col justify-center">
            <div className="flex items-start gap-4 mb-8">
              <div className="h-12 w-12 rounded-xl bg-[#eab308] flex items-center justify-center shrink-0">
                <MapPin size={22} className="text-black" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">
                  Shiksharthi Educational Institute
                </h3>
                <p className="text-[#eab308] font-semibold text-sm mt-1">Baguihati (Baguipara) Branch</p>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-white/40 mt-1 shrink-0" />
                <p className="text-white/70 text-sm leading-relaxed">
                  HH15 Baguiapara,<br />
                  Baguiati, Kolkata – 700159
                </p>
              </div>
            </div>

            <a
              id="ssat-get-directions-btn"
              href="https://share.google/XMd3TtbfpO0ASTZ2O"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button
                className="bg-[#eab308] hover:bg-[#d4a307] text-black font-bold rounded-xl px-6 gap-2 w-full shadow-lg shadow-[#eab308]/20 transition-all duration-300 hover:scale-105 cursor-pointer"
                size="lg"
              >
                <MapPin size={16} />
                Get Directions
                <ExternalLink size={14} />
              </Button>
            </a>

            <p className="text-white/30 text-xs mt-4 text-center">
              Opens in Google Maps
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SSATVenue;
