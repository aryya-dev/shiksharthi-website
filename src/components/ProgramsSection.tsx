import { useState } from "react";

const programs = [
  {
    id: 1,
    title: "Pre-Foundation (Class VII–VIII)",
    subtitle: "Strong Concept Building",
    description:
      "This program builds strong fundamentals in Mathematics and Science while encouraging analytical thinking and curiosity at an early stage. It prepares students for future competitive environments while strengthening academic confidence.",
    features: [
      "Qualified Faculties",
      "Regular Tests & Viva",
      "Practical Based Learning",
      "Parents–Teacher Meeting for sync-ups",
      "Dedicated Doubt Clearing Sessions",
    ],
    eligibility: "For students of Classes VII–VIII.",
  },

  {
    id: 2,
    title: "Foundation (Class IX–X)",
    subtitle: "Board Excellence Track",
    description:
      "Designed for board exam aspirants, this program strengthens answering techniques, writing skills, and time-management strategies while completing the syllabus early for effective revision.",
    features: [
      "Qualified Faculties",
      "Regular Tests",
      "Concept Based Learning",
      "Doubt Clearing Sessions",
      "NCERT + Advanced Coverage",
      "Answer Sheet Evaluation",
      "Assignments & Worksheets",
      "Performance Tracking",
    ],
    eligibility: "For students of Classes IX–X.",
  },

  {
    id: 3,
    title: "Advanced (Class XI–XII)",
    subtitle: "Board + Competitive Preparation",
    description:
      "This course ensures early completion of Class XI & XII syllabus with focus on conceptual clarity, answering methods and time-management skills to help students excel in both board and competitive examinations.",
    features: [
      "Experienced Subject-Specialist Faculty",
      "Complete Syllabus Coverage in Advance",
      "Mock & Revision Tests",
      "Regular Chapter-wise & Unit Tests",
      "Detailed Notes + NCERT & Advanced Practice",
      "Doubt Clearing After Every Class",
      "Previous Year Question Coverage",
      "Competitive Exam Oriented Problem Solving",
      "Time Management & Exam Strategy Training",
    ],
    eligibility: "For students of Classes XI–XII.",
  },

  {
    id: 4,
    title: "JEE / NEET Programme",
    subtitle: "National Competitive Exam Track",
    description:
      "This program covers the full JEE / NEET syllabus in a structured manner while building conceptual clarity, advanced problem solving skills and exam-level performance strategies.",
    features: [
      "Expert Qualified Faculty",
      "In-depth Concept Building",
      "Advanced Problem Solving Sessions",
      "Daily Practice Sheets (DPPs)",
      "Regular JEE-level Mock Tests",
      "Coverage of Main + Advanced Patterns",
      "PYQs & Pattern-Based Practice",
      "Individual Doubt Solving Support",
      "Performance Analysis & Tracking",
      "Full-Length JEE / NEET Mock Exams",
      "Updated Study Material",
    ],
    eligibility: "For students who have passed Class X.",
  },
];

const ProgramsSection = () => {
  const [active, setActive] = useState(1);

  return (
    <section id="programs" className="bg-gray-50 py-24">
      <div className="max-w-4xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase text-[#eab308]">
            Our Programs
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-[#142850] mt-3">
            Structured Paths to Success
          </h2>
        </div>

        <div className="space-y-8">

          {programs.map((program) => (
            <div key={program.id}>

              {/* Selector */}
              <button
                onClick={() => setActive(program.id)}
                className="w-full text-left"
              >
                <div className="flex items-start gap-4">

                  {/* Radio */}
                  <div className="mt-1">
                    <div
                      className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200
                      ${
                        active === program.id
                          ? "border-[#eab308]"
                          : "border-slate-300"
                      }`}
                    >
                      {active === program.id && (
                        <div className="h-2.5 w-2.5 bg-[#eab308] rounded-full" />
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <h4 className="font-semibold text-[#142850] text-lg">
                      {program.title}
                    </h4>

                    <p className="text-[#eab308] text-sm font-medium">
                      {program.subtitle}
                    </p>
                  </div>

                </div>
              </button>

              {/* Content */}
              <div
                className={`ml-9 mt-4 overflow-hidden transition-all duration-300 ease-in-out
                ${
                  active === program.id
  ? "max-h-screen opacity-100"
  : "max-h-0 opacity-0"
                }`}
              >
                <div className="bg-white border border-slate-200 rounded-xl p-6">

                  {/* Description */}
                  <p className="text-slate-700 leading-relaxed mb-6">
                    {program.description}
                  </p>

                  {/* Features */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {program.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <span className="text-green-600 font-bold">✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Eligibility */}
                  <div className="text-sm text-slate-500 border-t pt-4">
                    <span className="font-semibold text-[#142850]">
                      Eligibility:
                    </span>{" "}
                    {program.eligibility}
                  </div>

                </div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;