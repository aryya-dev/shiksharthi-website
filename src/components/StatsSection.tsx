import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  { number: 3500, suffix: "+", label: "Students" },
  { number: 4, label: "Courses" },
  { number: 36, label: "Teachers" },
  { number: 9, label: "Mentors" },
];

export default function StatsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section
      ref={ref}
      className="bg-[#0f172a] py-20 sm:py-24"
    >
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">

          {stats.map((stat, index) => (
            <div
              key={index}
              className="transition-transform duration-300 hover:-translate-y-1"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#eab308]">
                {inView && (
                  <CountUp
                    start={0}
                    end={stat.number}
                    duration={3.5}      // slower animation
                    delay={index * 0.2}         // smoother start
                    separator=","
                    suffix={stat.suffix || ""}
                    useEasing
                    easingFn={(t, b, c, d) => {
                      // smooth ease-out
                      t /= d;
                      return -c * t * (t - 2) + b;
                    }}
                  />
                )}
              </h2>

              <p className="mt-3 text-base sm:text-lg text-white/70 tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}