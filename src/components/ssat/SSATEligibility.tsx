import { CheckCircle2, AlertTriangle, FileText, Ban, Clock, PenTool } from "lucide-react";

const eligibilityCriteria = [
  {
    title: "Class 10 Science Stream",
    desc: "Currently enrolled in Class 10 (Science stream) from ICSE, CBSE, WBBSE, or any recognized board.",
  },
  {
    title: "Class 11 Science Aspirants",
    desc: "Open to students aiming to pursue IIT-JEE, NEET, or pure Science excellence in Class 11 (2026–2028 batch).",
  },
  {
    title: "Mandatory Online Registration",
    desc: "Candidates must complete the online application on this portal before the deadline to generate their Admit Card.",
  },
];

const examinationInstructions = [
  {
    icon: FileText,
    title: "Mandatory Entry Pass",
    desc: "Bring the printed SSAT Admit Card along with your original School ID Card or Aadhaar Card for identity verification.",
    type: "info",
  },
  {
    icon: Clock,
    title: "Reporting & Gate Closure",
    desc: "Report to the venue by 3:30 PM. Examination hall entry closes strictly at 3:45 PM. No late entry permitted.",
    type: "warning",
  },
  {
    icon: PenTool,
    title: "Permitted Stationery",
    desc: "Use only Blue or Black ballpoint pens for OMR sheets. Rough work sheets will be provided in the examination hall.",
    type: "info",
  },
  {
    icon: Ban,
    title: "Prohibited Electronic Items",
    desc: "Mobile phones, smartwatches, calculators, and all electronic gadgets are strictly banned inside the hall.",
    type: "danger",
  },
];

const SSATEligibility = () => (
  <section id="ssat-eligibility" className="py-20 md:py-24 bg-gray-50">
    <div className="max-w-5xl mx-auto px-6">
      <div className="text-center mb-14 md:mb-16">
        <span className="text-sm font-semibold tracking-widest uppercase text-[#eab308]">
          Eligibility &amp; Guidelines
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#142850] mt-3">
          Candidate Eligibility &amp; Instructions
        </h2>
        <p className="text-slate-500 text-sm mt-3 max-w-lg mx-auto">
          Please review the essential criteria and mandatory examination rules before appearing for SSAT 2026.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-10">
        {/* Eligibility Column */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
              <CheckCircle2 size={20} className="text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#142850]">Eligibility Criteria</h3>
              <p className="text-xs text-slate-500">Who can appear for SSAT 2026</p>
            </div>
          </div>

          <div className="space-y-3.5">
            {eligibilityCriteria.map((item, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 hover:border-green-300 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-[#142850]">{item.title}</h4>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions Column */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
              <AlertTriangle size={20} className="text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#142850]">Examination Instructions</h3>
              <p className="text-xs text-slate-500">Rules to follow on the examination day</p>
            </div>
          </div>

          <div className="space-y-3.5">
            {examinationInstructions.map((rule, i) => {
              const isWarning = rule.type === "warning";
              const isDanger = rule.type === "danger";
              const Icon = rule.icon;
              return (
                <div
                  key={i}
                  className={`rounded-xl p-4 sm:p-5 border transition-all duration-200 ${
                    isDanger
                      ? "bg-red-50/70 border-red-200"
                      : isWarning
                      ? "bg-amber-50/70 border-amber-200"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isDanger
                          ? "bg-red-100 text-red-600"
                          : isWarning
                          ? "bg-amber-100 text-amber-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      <Icon size={15} />
                    </div>
                    <div>
                      <h4
                        className={`text-sm font-bold ${
                          isDanger ? "text-red-900" : isWarning ? "text-amber-900" : "text-[#142850]"
                        }`}
                      >
                        {rule.title}
                      </h4>
                      <p
                        className={`text-xs sm:text-sm mt-1 leading-relaxed ${
                          isDanger ? "text-red-700" : isWarning ? "text-amber-800" : "text-slate-600"
                        }`}
                      >
                        {rule.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SSATEligibility;
