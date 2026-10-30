import { CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react";

const eligibility = [
  "Currently studying Science in Class 10.",
  "Must complete online registration before the deadline.",
  "Must select one of the two available examination dates.",
  "SSAT is compulsory for all Class 10 Science students.",
];

const rules = [
  { type: "info", text: "Report to the examination venue by 3:30 PM on the selected date." },
  { type: "warning", text: "Entry closes strictly at 3:45 PM. No candidate will be permitted after this time." },
  { type: "info", text: "The examination duration is 2 hours." },
  { type: "info", text: "Candidates may appear on either 15 November 2026 or 22 November 2026." },
  { type: "danger", text: "No additional date or alternative slot will be provided under any circumstances." },
  { type: "info", text: "The examination is conducted in offline pen-and-paper mode only." },
  { type: "danger", text: "These two examination dates are the only available opportunities to appear for SSAT 2026." },
];

const SSATEligibility = () => (
  <section id="ssat-eligibility" className="py-24 bg-gray-50">
    <div className="max-w-5xl mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-sm font-semibold tracking-widest uppercase text-[#eab308]">
          Eligibility & Rules
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#142850] mt-3">
          Important Information for Candidates
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Eligibility */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center">
              <CheckCircle2 size={20} className="text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-[#142850]">Eligibility Criteria</h3>
          </div>
          <div className="space-y-3">
            {eligibility.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl px-5 py-4 hover:border-green-300 hover:shadow-sm transition-all duration-200"
              >
                <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                <p className="text-slate-700 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          {/* Compulsory banner */}
          <div className="mt-6 bg-[#142850] rounded-xl px-5 py-4 flex items-start gap-3">
            <Info size={18} className="text-[#eab308] mt-0.5 shrink-0" />
            <p className="text-white/80 text-sm">
              <span className="text-[#eab308] font-bold">SSAT is compulsory</span> for all students
              who are studying Science in Class 10.
            </p>
          </div>
        </div>

        {/* Rules */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <AlertTriangle size={20} className="text-amber-600" />
            </div>
            <h3 className="text-lg font-bold text-[#142850]">Examination Instructions</h3>
          </div>
          <div className="space-y-3">
            {rules.map((rule, i) => {
              const isWarning = rule.type === "warning";
              const isDanger = rule.type === "danger";
              return (
                <div
                  key={i}
                  className={`flex items-start gap-3 rounded-xl px-5 py-4 border transition-all duration-200 ${
                    isDanger
                      ? "bg-red-50 border-red-200"
                      : isWarning
                      ? "bg-amber-50 border-amber-200"
                      : "bg-white border-slate-200"
                  }`}
                >
                  {isDanger ? (
                    <XCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
                  ) : isWarning ? (
                    <AlertTriangle size={16} className="text-amber-500 mt-0.5 shrink-0" />
                  ) : (
                    <CheckCircle2 size={16} className="text-blue-500 mt-0.5 shrink-0" />
                  )}
                  <p
                    className={`text-sm leading-relaxed ${
                      isDanger ? "text-red-700 font-medium" : isWarning ? "text-amber-700" : "text-slate-700"
                    }`}
                  >
                    {rule.text}
                  </p>
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
