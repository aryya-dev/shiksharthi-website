import { GraduationCap, Target, TrendingUp } from "lucide-react";

const timeline = [
  {
    icon: GraduationCap,
    title: "Foundation & Values",
    description:
      "Building strong conceptual clarity and disciplined academic habits since 2010.",
  },
  {
    icon: Target,
    title: "Structured Academic Model",
    description:
      "Systematic planning, regular test series and performance monitoring.",
  },
  {
    icon: TrendingUp,
    title: "Consistent Growth & Results",
    description:
      "Continuous innovation ensuring measurable academic excellence year after year.",
  },
];

const AboutSection = () => (
  <section id="about" className="bg-gray-50 py-28">
    <div className="max-w-7xl mx-auto px-6">

      <div className="grid lg:grid-cols-2 gap-16 items-start">

        {/* LEFT SIDE - About Content */}
        <div>
          <span className="text-sm font-semibold tracking-widest uppercase text-[#eab308]">
            About Us
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-[#142850] mt-3">
            A Legacy of Academic Excellence
          </h2>

          <div className="mt-6 inline-block bg-[#142850] text-white text-sm px-4 py-2 rounded-full">
            Since 2010
          </div>

          <p className="text-slate-600 mt-8 leading-relaxed">
            Shiksharthi Academic Institute has consistently focused on
            redefining academic excellence through disciplined planning,
            innovative teaching strategies, and structured result-oriented
            mentorship.
          </p>

          <p className="text-slate-600 mt-4 leading-relaxed">
            Our multidimensional approach dissolves barriers between
            disciplines, nurtures progressive thinking, and prepares students
            for both board and competitive success.
          </p>

          <p className="text-slate-600 mt-4 leading-relaxed">
            We strongly believe that the best is yet to come — and we continue
            to rise higher every year.
          </p>
        </div>

        {/* RIGHT SIDE - Timeline */}
        <div className="relative border-l-2 border-[#eab308] pl-8 space-y-14">
          {timeline.map((item, index) => (
            <div key={index} className="relative">

              {/* Dot */}
              <div className="absolute -left-[11px] top-1 w-5 h-5 bg-[#eab308] rounded-full border-4 border-gray-50"></div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 
                              transition-all duration-300 
                              hover:shadow-xl hover:-translate-y-1">

                <div className="flex items-center gap-4 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-[#eab308]/10 flex items-center justify-center">
                    <item.icon className="text-[#eab308]" />
                  </div>

                  <h3 className="text-lg font-semibold text-[#142850]">
                    {item.title}
                  </h3>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.description}
                </p>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  </section>
);

export default AboutSection;