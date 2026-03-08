import { useEffect, useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Adrija Chakraborty",
    role: "Student",
    initials: "AC",
    rating: 5,
    text: "The teachers are great. They make sure about growing interest for studies among students. If a student study according to the teacher's way, he/she won't get less than 90% marks. I will suggest Shiksharthi Institute to everyone.",
  },
  {
    name: "Ananya Bhattacharyya",
    role: "NEET 2024 Qualifier",
    initials: "AB",
    rating: 5,
    text: "I joined Shiksharthi in class 8 and now I'm in class 9. The institute completely changed my approach to studying and helped me understand the real purpose of learning. The teachers are very friendly and make every class engaging, and I’m truly grateful to Shiksharthi for guiding me towards a better academic path.",
  },
  {
  name: "Richa Ojha",
  role: "Student",
  initials: "RO",
  rating: 5,
  text: "I joined Shiksharthi in class 9 and now I’m in class 12. The teachers explain every concept clearly and the learning environment here is fantastic. They don’t just focus on marks, they make sure students truly understand what they study.",
},
  {
  name: "Satwik Das",
  role: "Student",
  initials: "SD",
  rating: 5,
  text: "The teaching here keeps improving every year. Practical classes in chemistry, biology, and physics make learning more engaging, and teachers give individual attention to every student. The approach here feels completely different from other institutes.",
},
  {
    name: "Dr. Ritu Ghosh",
    role: "Parent",
    initials: "RG",
    rating: 4,
    text: "The study material is exceptionally well-curated. My son found the notes incredibly helpful for quick revision before exams.",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = () => {
    intervalRef.current = setInterval(
      () => setCurrent((c) => (c + 1) % testimonials.length),
      5000
    );
  };

  useEffect(() => {
    startAuto();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const go = (dir: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrent((c) => (c + dir + testimonials.length) % testimonials.length);
    startAuto();
  };

  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-wider uppercase text-[#eab308]">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#142850] mt-2">
            Voices of Trust
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="relative bg-white rounded-3xl shadow-lg p-10 md:p-16 text-center">

          {/* Stronger Decorative Quote */}
          <span className="absolute -top-6 left-6 text-[140px] md:text-[180px] font-serif text-[#eab308]/40 leading-none select-none pointer-events-none">
            “
          </span>

          {/* Rating */}
          <div className="flex justify-center mb-6 relative z-10">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < t.rating
                    ? "text-[#eab308] fill-[#eab308]"
                    : "text-slate-300"
                }`}
              />
            ))}
          </div>

          {/* Testimonial Text */}
<p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto mb-10 relative z-10">
  {t.text}
</p>

          {/* Person Info */}
          <div className="flex flex-col items-center relative z-10">
            <div className="h-16 w-16 rounded-full bg-[#142850] flex items-center justify-center mb-4">
              <span className="text-sm font-bold text-white">
                {t.initials}
              </span>
            </div>

            <p className="font-semibold text-[#142850] text-lg">
              {t.name}
            </p>
            <p className="text-sm text-slate-500">{t.role}</p>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => go(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4 text-[#142850]" />
          </button>

          <button
            onClick={() => go(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4 text-[#142850]" />
          </button>

        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setCurrent(i);
                startAuto();
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-[#eab308]"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;