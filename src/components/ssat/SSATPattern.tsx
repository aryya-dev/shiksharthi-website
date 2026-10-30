import { FlaskConical, Calculator, Atom, Leaf } from "lucide-react";

const subjects = [
  { icon: Calculator, name: "Mathematics", mcq: 15, sq: 5, total: 20, color: "bg-blue-500" },
  { icon: Atom, name: "Physics", mcq: 15, sq: 5, total: 20, color: "bg-purple-500" },
  { icon: FlaskConical, name: "Chemistry", mcq: 15, sq: 5, total: 20, color: "bg-green-500" },
  { icon: Leaf, name: "Biology", mcq: 15, sq: 5, total: 20, color: "bg-rose-500" },
];

const highlights = [
  { label: "Total Questions", value: "80" },
  { label: "MCQs", value: "60" },
  { label: "Short Questions", value: "20" },
  { label: "Duration", value: "2 Hours" },
];

const SSATPattern = () => (
  <section id="ssat-pattern" className="py-24 bg-white">
    <div className="max-w-5xl mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-sm font-semibold tracking-widest uppercase text-[#eab308]">
          Examination Structure
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#142850] mt-3">
          Know Your Examination
        </h2>
        <p className="text-slate-500 mt-4 max-w-xl mx-auto text-sm">
          SSAT covers four Science subjects. Each subject has 20 questions — a mix of MCQs and Short Questions.
        </p>
      </div>

      {/* Subject Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {subjects.map((s, i) => (
          <div
            key={i}
            className="bg-gray-50 border border-slate-200 rounded-2xl p-6 text-center hover:shadow-lg hover:border-[#eab308]/40 transition-all duration-300 group"
          >
            <div className={`h-12 w-12 ${s.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
              <s.icon size={22} className="text-white" />
            </div>
            <h3 className="font-bold text-[#142850] mb-4 text-sm">{s.name}</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center bg-white border border-slate-100 rounded-lg px-3 py-2">
                <span className="text-slate-500">MCQ</span>
                <span className="font-bold text-[#142850]">{s.mcq}</span>
              </div>
              <div className="flex justify-between items-center bg-white border border-slate-100 rounded-lg px-3 py-2">
                <span className="text-slate-500">Short Q</span>
                <span className="font-bold text-[#142850]">{s.sq}</span>
              </div>
              <div className="flex justify-between items-center bg-[#142850] rounded-lg px-3 py-2">
                <span className="text-white/70">Total</span>
                <span className="font-bold text-[#eab308]">{s.total}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary table header */}
      <div className="bg-gray-50 border border-slate-200 rounded-2xl overflow-hidden mb-10">
        <div className="grid grid-cols-4 bg-[#142850] text-white text-xs font-semibold uppercase tracking-wider px-6 py-4">
          <span>Subject</span>
          <span className="text-center">MCQ</span>
          <span className="text-center">Short Q</span>
          <span className="text-center">Total</span>
        </div>
        {subjects.map((s, i) => (
          <div
            key={i}
            className={`grid grid-cols-4 px-6 py-4 text-sm items-center ${i % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b border-slate-100 last:border-0`}
          >
            <div className="flex items-center gap-2 font-medium text-[#142850]">
              <div className={`h-2 w-2 rounded-full ${s.color}`} />
              {s.name}
            </div>
            <span className="text-center text-slate-600">{s.mcq}</span>
            <span className="text-center text-slate-600">{s.sq}</span>
            <span className="text-center font-bold text-[#142850]">{s.total}</span>
          </div>
        ))}
        <div className="grid grid-cols-4 px-6 py-4 bg-[#eab308]/10 border-t-2 border-[#eab308]/30 text-sm font-bold">
          <span className="text-[#142850]">Total</span>
          <span className="text-center text-[#142850]">60</span>
          <span className="text-center text-[#142850]">20</span>
          <span className="text-center text-[#eab308] text-base">80</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {highlights.map((h, i) => (
          <div
            key={i}
            className="bg-[#142850] rounded-2xl p-6 text-center"
          >
            <p className="text-3xl font-extrabold text-[#eab308] mb-1">{h.value}</p>
            <p className="text-white/60 text-xs">{h.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SSATPattern;
