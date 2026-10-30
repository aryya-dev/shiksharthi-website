import { useEffect } from "react";
import SSATHero from "@/components/ssat/SSATHero";
import SSATAbout from "@/components/ssat/SSATAbout";
import SSATScholarship from "@/components/ssat/SSATScholarship";
import SSATSchedule from "@/components/ssat/SSATSchedule";
import SSATPattern from "@/components/ssat/SSATPattern";
import SSATEligibility from "@/components/ssat/SSATEligibility";
import SSATVenue from "@/components/ssat/SSATVenue";
import SSATRegistration from "@/components/ssat/SSATRegistration";

const SSATPage = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Shiksharthi Scholarship Admission Test 2026 | SSAT";

    const setMeta = (selector: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute("content", value);
    };

    setMeta(
      'meta[name="description"]',
      "Register for Shiksharthi Scholarship Admission Test (SSAT) 2026. An offline scholarship examination for Class 10 Science students. Top 100 students receive scholarship opportunities, with Rs 1 lakh scholarships for the top 10 performers."
    );
    setMeta(
      'meta[property="og:title"]',
      "SSAT 2026 | Shiksharthi Scholarship Admission Test"
    );
    setMeta(
      'meta[property="og:description"]',
      "Register for SSAT 2026 - Scholarship examination for Class 10 Science students. Top 100 get scholarships. Top 10 win Rs 1,00,000. Dates: 15 & 22 November 2026."
    );

    window.scrollTo({ top: 0 });

    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <main className="overflow-x-hidden">
      <SSATHero />
      <SSATAbout />
      <SSATScholarship />
      <SSATSchedule />
      <SSATPattern />
      <SSATEligibility />
      <SSATVenue />
      <SSATRegistration />
    </main>
  );
};

export default SSATPage;
