import { BookOpen, Users, Award, Target } from "lucide-react";

const highlights = [
  {
    icon: BookOpen,
    title: "Academic Initiative",
    desc: "Designed to test and recognise academic excellence in Class 10 Science students.",
  },
  {
    icon: Users,
    title: "Open to All Class 10 Science Students",
    desc: "SSAT is compulsory for all Science students transitioning from Class 10 to Class 11.",
  },
  {
    icon: Award,
    title: "Scholarship Opportunities",
    desc: "Top 100 performers will be recognised and awarded scholarships based on merit.",
  },
  {
    icon: Target,
    title: "Performance-Based Selection",
    desc: "Fair, merit-driven selection through an offline pen-and-paper examination.",
  },
];

const SSATAbout = () => (
  <section id="ssat-about" className="py-24 bg-white">
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-sm font-semibold tracking-widest uppercase text-[#eab308]">
          About the Examination
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#142850] mt-3">
          What is SSAT?
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div className="space-y-6">
          <p className="text-slate-600 text-lg leading-relaxed">
            Shiksharthi Scholarship Admission Test <span className="font-semibold text-[#142850]">(SSAT)</span> is an initiative
            by Shiksharthi Educational Institute designed for{" "}
            <span className="font-semibold text-[#142850]">Class 10 Science students</span>.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Through this examination, students will get an opportunity to demonstrate their academic
            abilities and compete for scholarship opportunities for their next academic journey.
          </p>
          <p className="text-slate-600 leading-relaxed">
            The <span className="font-semibold text-[#142850]">top 100 performers</span> will be
            recognised and awarded scholarships based on their performance, with special recognition
            for the top 10 students.
          </p>

          <div className="flex items-center gap-3 bg-[#eab308]/10 border border-[#eab308]/30 rounded-xl px-5 py-4">
            <div className="h-10 w-10 rounded-lg bg-[#eab308] flex items-center justify-center shrink-0">
              <Award size={18} className="text-black" />
            </div>
            <p className="text-sm font-semibold text-[#142850]">
              Top 10 students win a scholarship of{" "}
              <span className="text-[#d4a307]">₹1,00,000</span>
            </p>
          </div>
        </div>

        {/* Highlights grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {highlights.map((h, i) => (
            <div
              key={i}
              className="bg-gray-50 border border-slate-200 rounded-2xl p-6 hover:border-[#eab308]/40 hover:shadow-md transition-all duration-300 group"
            >
              <div className="h-11 w-11 rounded-xl bg-[#eab308]/10 flex items-center justify-center mb-4 group-hover:bg-[#eab308]/20 transition-colors">
                <h.icon size={20} className="text-[#eab308]" />
              </div>
              <h3 className="font-semibold text-[#142850] mb-2 text-sm">{h.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default SSATAbout;
