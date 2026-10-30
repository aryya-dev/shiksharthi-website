import { Calendar, Clock, LogIn, LogOut } from "lucide-react";

const slots = [
  {
    slot: "Slot 01",
    date: "15 November 2026",
    day: "Sunday",
    badge: "First Date",
  },
  {
    slot: "Slot 02",
    date: "22 November 2026",
    day: "Sunday",
    badge: "Second Date",
  },
];

const timings = [
  { icon: LogIn, label: "Reporting Time", value: "3:30 PM" },
  { icon: Clock, label: "Entry Closes At", value: "3:45 PM" },
  { icon: Clock, label: "Duration", value: "2 Hours" },
  { icon: LogOut, label: "Dispatch Time", value: "6:15 PM" },
];

const SSATSchedule = () => (
  <section id="ssat-schedule" className="py-24 bg-gray-50">
    <div className="max-w-5xl mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-sm font-semibold tracking-widest uppercase text-[#eab308]">
          Examination Dates
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#142850] mt-3">
          Choose Your Examination Date
        </h2>
        <p className="text-slate-500 mt-4 max-w-xl mx-auto text-sm">
          SSAT 2026 will be conducted on two dates. Candidates can appear on either date —
          select your preferred slot during registration.
        </p>
      </div>

      {/* Slot Cards */}
      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        {slots.map((s, i) => (
          <div
            key={i}
            className="relative bg-white border-2 border-[#eab308]/30 rounded-3xl p-8 text-center shadow-md hover:shadow-xl hover:border-[#eab308] transition-all duration-300 group overflow-hidden"
          >
            {/* Decorative circle */}
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#eab308]/5 group-hover:bg-[#eab308]/10 transition-colors" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-[#142850]/3" />

            <div className="relative z-10">
              <span className="inline-block bg-[#142850] text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
                {s.slot}
              </span>

              <div className="flex justify-center mb-5">
                <div className="h-16 w-16 rounded-2xl bg-[#eab308]/10 flex items-center justify-center group-hover:bg-[#eab308]/20 transition-colors">
                  <Calendar size={28} className="text-[#eab308]" />
                </div>
              </div>

              <h3 className="text-2xl font-extrabold text-[#142850] mb-1">{s.date}</h3>
              <p className="text-slate-500 font-medium text-sm mb-4">{s.day}</p>

              <div className="inline-flex items-center gap-2 bg-[#eab308]/10 text-[#142850] text-xs font-semibold px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#eab308] inline-block" />
                {s.badge}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Timing Info */}
      <div className="bg-[#142850] rounded-3xl p-8">
        <h3 className="text-white font-semibold text-center mb-8 tracking-wide text-sm uppercase">
          Examination Day Schedule
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {timings.map((t, i) => (
            <div key={i} className="text-center">
              <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-3">
                <t.icon size={20} className="text-[#eab308]" />
              </div>
              <p className="text-white/50 text-xs mb-1">{t.label}</p>
              <p className="text-white font-bold text-lg">{t.value}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-slate-400 text-xs mt-6">
        No additional examination date or alternative slot will be provided. These two dates are the only available opportunities.
      </p>
    </div>
  </section>
);

export default SSATSchedule;
