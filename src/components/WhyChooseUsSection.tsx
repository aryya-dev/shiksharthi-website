import { useEffect, useState } from "react";
import {
  Target,
  ShieldCheck,
  Clock,
  Lightbulb,
  ClipboardCheck,
  Rocket,
  Users,
  HeartHandshake,
  BarChart3,
  Brain,
  BookOpenCheck,
  HelpCircle,
} from "lucide-react";

const features = [
  { icon: Target, title: "Result-Oriented Approach" },
  { icon: ShieldCheck, title: "Trusted by 1000+ Families" },
  { icon: Clock, title: "Disciplined Routine" },
  { icon: Lightbulb, title: "Personal Attention" },
  { icon: ClipboardCheck, title: "Regular Testing Mechanism" },
  { icon: Rocket, title: "Future Ready Learning" },
  { icon: Users, title: "Expert Faculties" },
  { icon: HeartHandshake, title: "Counselling Support" },
  { icon: BarChart3, title: "Performance Tracking" },
  { icon: Brain, title: "Competitive Exam Preparation" },
  { icon: BookOpenCheck, title: "Structured Study Plan" },
  { icon: HelpCircle, title: "Doubt Clearing Sessions" },
];

const shuffle = (arr: number[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function WhyChooseUsSection() {
  const [active, setActive] = useState<number[]>([]);
  const [order, setOrder] = useState<number[]>(shuffle([...Array(12).keys()]));
  const [pointer, setPointer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (pointer >= order.length) {
        const newOrder = shuffle([...Array(12).keys()]);
        setOrder(newOrder);
        setPointer(0);
        return;
      }

      const count = window.innerWidth < 768 ? 2 : 3;

      setActive(order.slice(pointer, pointer + count));
      setPointer((p) => p + count);
    }, 2200);

    return () => clearInterval(interval);
  }, [pointer, order]);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase text-[#eab308]">
            The Shiksharthi Difference
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-[#142850] mt-3">
            Why Choose Us
          </h2>
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {features.map((f, i) => {
            const highlighted = active.includes(i);

            return (
              <div
                key={i}
                className={`flex items-center gap-4 p-6 rounded-xl border transition-all duration-500
                ${
                  highlighted
                    ? "bg-[#eab308]/10 border-[#eab308] shadow-xl scale-[1.04]"
                    : "bg-white border-slate-200"
                }`}
              >
                <div
                  className={`h-10 w-10 rounded-lg flex items-center justify-center
                  ${
                    highlighted
                      ? "bg-[#eab308]/20"
                      : "bg-[#eab308]/10"
                  }`}
                >
                  <f.icon className="h-5 w-5 text-[#eab308]" />
                </div>

                <p className="font-semibold text-[#142850]">
                  {f.title}
                </p>
              </div>
            );
          })}
        </div>

        {/* MOBILE FEATURE BOARD */}
        <div className="md:hidden bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

          <div className="grid grid-cols-2 gap-4">

            {features.map((f, i) => {
              const highlighted = active.includes(i);

              return (
                <div
                  key={i}
                  className={`flex items-center gap-2 text-sm transition-all duration-500
                  ${
                    highlighted
                      ? "text-[#142850] font-semibold scale-[1.05]"
                      : "text-slate-500"
                  }`}
                >
                  <f.icon
                    className={`h-4 w-4 ${
                      highlighted ? "text-[#eab308]" : "text-slate-400"
                    }`}
                  />

                  {f.title}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}