import { Trophy, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRef } from "react";
import { Link } from "react-router-dom";
import "swiper/css";

const achievers = [
  {
    name: "Sousamya Roy",
    school: "DPS Megacity",
    air: "AIR 7",
    percent: "98.25%",
    class: "Class 12",
    image: "/achievers-img/Sousamya Roy AIRPreview.jpeg",
  },
  {
    name: "Alisha Roy",
    school: "Calcutta Public School",
    air: "AIR 10",
    percent: "97.50%",
    class: "Class 12",
    image: "/achievers-img/Alisha Roy AIRPreview.jpeg",
  },
  {
    name: "Sumerun Nag",
    school: "Pramila Memorial Advanced School",
    air: "AIR 10",
    percent: "97.50%",
    class: "Class 12",
    image: "/achievers-img/Sumerun Nag AIRPreview.jpeg",
  },
  {
    name: "Sohan Ghoshal",
    school: "Pramila Memorial Advanced School",
    air: "AIR 2",
    percent: "99.6%",
    class: "Class 10",
    badge: "State Topper",
    image: "/achievers-img/Sohan Ghoshal AIRPreview.jpeg",
  },
  {
    name: "Dyuti Jana",
    school: "G D Goenka",
    air: "AIR 8",
    percent: "98.6%",
    class: "Class 10",
    image: "/achievers-img/Dyuti Jana AIRPreview.jpeg",
  },
  {
    name: "Shresthadip Ghosh",
    school: "Calcutta Public School",
    air: "AIR 8",
    percent: "98.40%",
    class: "Class 10",
    image: "/achievers-img/Shresthadip Ghosh AIRPreview.jpeg",
  },
  {
    name: "Vaibhav Bajoria",
    school: "Welland Goldsmith School",
    air: "AIR 8",
    percent: "98.40%",
    class: "Class 10",
    image: "/achievers-img/Vaibhav Bajoria AIRPreview.jpeg",
  },
  {
    name: "Bhumika Mundhra",
    school: "Mahadevi Birla Shishu Vihar",
    air: "AIR 8",
    percent: "98.4%",
    class: "Class 10",
    image: "/achievers-img/Bhumika Mundhra AIRPreview.jpeg",
  },
];

const AchieversSection = () => {
  const swiperRef = useRef<any>(null);

  return (
    <section id="achievers" className="bg-gray-50 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">

        <div className="text-center mb-20">
          <span className="text-sm font-semibold tracking-widest uppercase text-[#eab308]">
            Pride of Shiksharthi
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-[#142850] mt-3">
            Our Achievers
          </h2>

          <div className="mt-6 inline-flex items-center gap-2 px-6 py-2
                          rounded-full border border-[#eab308]/40
                          bg-[#eab308]/10 text-[#142850]
                          text-sm font-semibold tracking-wide">
            <Trophy className="h-4 w-4 text-[#eab308]" />
            ALL INDIA RANKERS
          </div>
        </div>

        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="hidden lg:flex absolute -left-6 top-1/2 -translate-y-1/2 
                     z-30 h-16 w-16 rounded-full bg-white border border-slate-200 
                     shadow-lg items-center justify-center
                     text-3xl font-bold text-[#142850]
                     hover:bg-[#142850] hover:text-white 
                     transition-all duration-300"
        >
          ‹
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 
                     z-30 h-16 w-16 rounded-full bg-white border border-slate-200 
                     shadow-lg items-center justify-center
                     text-3xl font-bold text-[#142850]
                     hover:bg-[#142850] hover:text-white 
                     transition-all duration-300"
        >
          ›
        </button>

        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="lg:hidden absolute left-2 top-1/2 -translate-y-1/2 z-30
                     h-10 w-10 rounded-full 
                     bg-white/80 backdrop-blur-md
                     shadow-md border border-slate-200
                     flex items-center justify-center
                     text-[#142850]
                     active:scale-90 transition-all duration-200"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="lg:hidden absolute right-2 top-1/2 -translate-y-1/2 z-30
                     h-10 w-10 rounded-full 
                     bg-white/80 backdrop-blur-md
                     shadow-md border border-slate-200
                     flex items-center justify-center
                     text-[#142850]
                     active:scale-90 transition-all duration-200"
        >
          <ChevronRight size={18} />
        </button>

        <Swiper
          className="!overflow-visible"
          modules={[Autoplay]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          autoplay={{
            delay:1500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          speed={800}
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {achievers.map((a, index) => (
            <SwiperSlide key={index} className="!overflow-visible">
              <div
                className="group relative z-10 hover:z-30
                           p-6 rounded-2xl bg-white
                           border border-slate-200
                           overflow-hidden
                           transition-all duration-500 ease-out
                           hover:-translate-y-2
                           hover:scale-[1.02]
                           hover:shadow-2xl
                           text-center"
              >
                {a.badge && (
                  <div className="absolute top-4 left-4 z-20
                                  bg-[#eab308] text-black
                                  text-[10px] font-bold 
                                  px-3 py-1 rounded-full shadow-sm">
                    {a.badge}
                  </div>
                )}

                <div className="absolute top-4 right-4 z-20">
                  <div className="h-7 w-7 rounded-full bg-[#eab308]/15 flex items-center justify-center">
                    <Trophy className="h-4 w-4 text-[#eab308]" />
                  </div>
                </div>

                <div className="relative z-10 mx-auto mb-5 h-32 w-32 
                                overflow-hidden rounded-xl 
                                border border-slate-200 shadow-sm
                                bg-slate-100 animate-pulse">

                  <img
                    src={a.image}
                    alt={a.name}
                    loading="lazy"
                    className="h-full w-full object-cover 
                               opacity-0 transition-all duration-700
                               group-hover:scale-105"
                    onLoad={(e) => {
                      e.currentTarget.classList.remove("opacity-0");
                      e.currentTarget.classList.add("opacity-100");
                      e.currentTarget.parentElement?.classList.remove("animate-pulse");
                      e.currentTarget.parentElement?.classList.remove("bg-slate-100");
                    }}
                  />
                </div>

                <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">
                  {a.class}
                </p>

                <h4 className="font-bold text-[#142850]">{a.name}</h4>
                <p className="text-xs text-slate-500 mt-1">{a.school}</p>

                <div className="flex justify-center gap-4 mt-4">
                  <div>
                    <p className="text-lg font-extrabold text-[#eab308]">
                      {a.air}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400">
                      Rank
                    </p>
                  </div>

                  <div className="w-px bg-slate-200" />

                  <div>
                    <p className="text-lg font-extrabold text-[#142850]">
                      {a.percent}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400">
                      Score
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-16">
          <Link to="/achievers">
            <button
              className="px-8 py-3 rounded-xl border border-[#142850]/20 
                         text-[#142850] font-semibold
                         hover:bg-[#142850]/5 transition-all duration-300"
            >
              View All Achievers
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default AchieversSection;