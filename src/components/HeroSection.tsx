import { Button } from "@/components/ui/button";
import { Users, Award, BookOpen } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";

const stats = [
  { icon: Users, label: "1000+ Students", delay: "0.2s" },
  { icon: Award, label: "Proven Results", delay: "0.4s" },
  { icon: BookOpen, label: "Expert Faculties", delay: "0.6s" },
];

const HeroSection = () => {

  const handleEnrollClick = () => {

    // prevent popup from appearing
    sessionStorage.setItem("enrollClicked", "true");

    const section = document.getElementById("contact");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="relative flex items-center pt-32 pb-20">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Text */}
          <div className="space-y-8">

            <div className="space-y-4">

              <span
                className="inline-block text-sm font-semibold tracking-wider uppercase text-secondary opacity-0 animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                Kolkata's Most Trusted Coaching Institute
              </span>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-primary opacity-0 animate-fade-up"
                style={{ animationDelay: "0.2s" }}
              >
                Building Future{" "}
                <span className="text-gradient-gold">Scholars</span> &{" "}
                <span className="text-gradient-gold">Achievers</span>
              </h1>

              <p
                className="text-lg text-muted-foreground max-w-lg opacity-0 animate-fade-up"
                style={{ animationDelay: "0.35s" }}
              >
                Integrated preparation for ICSE, CBSE, JEE, and NEET with structured planning and measurable results.
              </p>

            </div>

            <div
              className="flex flex-wrap gap-4 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.5s" }}
            >

              <Button
                onClick={handleEnrollClick}
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-base px-8 rounded-xl shadow-lg shadow-secondary/20"
              >
                Enroll Now
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-semibold text-base px-8 rounded-xl border-primary/20 hover:bg-primary/5"
              >
                <a href="#programs">Explore Programs</a>
              </Button>

              <div className="mt-8">
                {false && (
                  <p className="text-sm text-slate-600 mt-6">
                    Already enrolled?{" "}
                    <a
                      href="/portal"
                      className="font-semibold text-[#142850] hover:underline"
                    >
                      Access Student Portal
                    </a>
                  </p>
                )}
              </div>

            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 pt-4">

              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 opacity-0 animate-fade-up"
                  style={{ animationDelay: stat.delay }}
                >

                  <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-secondary" />
                  </div>

                  <span className="text-sm font-semibold text-primary">
                    {stat.label}
                  </span>

                </div>
              ))}

            </div>

          </div>

          {/* Illustration */}
          <div
            className="hidden lg:flex justify-center opacity-0 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >

            <img
              src={heroIllustration}
              alt="Students studying with academic elements"
              className="w-full max-w-lg animate-float"
            />

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;