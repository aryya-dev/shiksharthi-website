import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftCircle, Search, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AchieversSection from "../components/AchieversSection";
import AchieverCard from "../components/AchieverCard";

const achievers = [
  // 2026
  { category: "Boards", class: "12", year: "2026", image: "/achievers-img/Anshika Pandey.jpg.jpeg", name: "Anshika Pandey", score: "99%" },

  // 2025
  { category: "Boards", class: "12", year: "2025", image: "/achievers-img/Shambhavi Majumder Achiever.jpeg", name: "Shambhavi Majumder", score: "97.4%" },

  // 2026
  { category: "Boards", class: "12", year: "2026", image: "/achievers-img/Sohan Ghoshal.jpg.jpeg", name: "Sohan Ghoshal", score: "98%" },
  { category: "Boards", class: "12", year: "2026", image: "/achievers-img/Dyuti Jana.jpg.jpeg", name: "Dyuti Jana", score: "97.2%" },
  { category: "Boards", class: "12", year: "2025", image: "/achievers-img/Sohani Parveen Achiever.jpeg", name: "Sohani Parveen", score: "96.75%" },
  { category: "Boards", class: "12", year: "2026", image: "/achievers-img/Debapriya Basak.jpg.jpeg", name: "Debapriya Basak", score: "96%" },
  { category: "Boards", class: "12", year: "2026", image: "/achievers-img/Rishav Patra.jpg.jpeg", name: "Rishav Patra", score: "96%" },



  // 2026
  { category: "Boards", class: "12", year: "2026", image: "/achievers-img/Aditi Pandey.jpg.jpeg", name: "Aditi Pandey", score: "95.75%" },
  { category: "Boards", class: "12", year: "2026", image: "/achievers-img/Shibani Bhattacharjee.jpg.jpeg", name: "Shibani Bhattacharjee", score: "95.75%" },

  // 2025
  { category: "Boards", class: "12", year: "2025", image: "/achievers-img/Rishika Joshi Achiever.jpeg", name: "Rishika Joshi", score: "95.75%" },
  { category: "Boards", class: "12", year: "2025", image: "/achievers-img/Anoushka Ghosh Achiever.jpeg", name: "Anoushka Ghosh", score: "95.50%" },
  { category: "Boards", class: "12", year: "2025", image: "/achievers-img/Tanisha Kesri Achiever.jpeg", name: "Tanisha Kesri", score: "95.4%" },
  { category: "Boards", class: "12", year: "2025", image: "/achievers-img/Madhurima Pal Achiever.jpeg", name: "Madhurima Pal", score: "95%" },

  // 2026
  { category: "Boards", class: "12", year: "2026", image: "/achievers-img/Disha Sharma.jpg.jpeg", name: "Disha Sharma", score: "95%" },

  // 2025
  { category: "Boards", class: "12", year: "2025", image: "/achievers-img/Nikhil Sharma Achiever.jpeg", name: "Nikhil Sharma", score: "94.25%" },

  // 2026
  { category: "Boards", class: "12", year: "2026", image: "/achievers-img/Megha Banerjee.jpg.jpeg", name: "Megha Banerjee", score: "94.25%" },

  // 2026
  { category: "Boards", class: "12", year: "2026", image: "/achievers-img/Bhumika Mundhra.jpg.jpeg", name: "Bhumika Mundhra", score: "94%" },

  // 2025
  { category: "Boards", class: "12", year: "2025", image: "/achievers-img/Shreya Mishra Achiever.jpeg", name: "Shreya Mishra", score: "93%" },

  // 2026
  { category: "Boards", class: "12", year: "2026", image: "/achievers-img/Nidhi Rathi.jpg.jpeg", name: "Nidhi Rathi", score: "93.75%" },
  { category: "Boards", class: "12", year: "2026", image: "/achievers-img/Utsa Sarkar.jpg.jpeg", name: "Utsa Sarkar", score: "93.25%" },
  { category: "Boards", class: "12", year: "2026", image: "/achievers-img/Divya Teltia.jpg.jpeg", name: "Divya Teltia", score: "92.75%" },
  { category: "Boards", class: "12", year: "2026", image: "/achievers-img/Prashri More.jpg.jpeg", name: "Prashri More", score: "92.6%" },

  // 2025
  { category: "Boards", class: "12", year: "2025", image: "/achievers-img/Ishita Saha Achiever.jpeg", name: "Ishita Saha", score: "92.25%" },

  // 2026
  { category: "Boards", class: "12", year: "2026", image: "/achievers-img/Sunita Gaura.jpg.jpeg", name: "Sunita Gaura", score: "91.75%" },
  { category: "Boards", class: "12", year: "2026", image: "/achievers-img/Anuraag Das.jpg.jpeg", name: "Anuraag Das", score: "91.5%" },
  { category: "Boards", class: "12", year: "2026", image: "/achievers-img/Shreyan Jana.jpg.jpeg", name: "Shreyan Jana", score: "91.2%" },

  // 2025
  { category: "Boards", class: "12", year: "2025", image: "/achievers-img/Aryya Bandyopadhyay ;)Achiever.jpeg", name: "Aryya Bandyopadhyay", score: "91%" },
  { category: "Boards", class: "12", year: "2025", image: "/achievers-img/Sagnik Kundu Achiever.jpeg", name: "Sagnik Kundu", score: "91%" },

  // 2026
  { category: "Boards", class: "12", year: "2026", image: "/achievers-img/Arka Das.jpg.jpeg", name: "Arka Das", score: "91%" },
  { category: "Boards", class: "12", year: "2026", image: "/achievers-img/Krishnendu Ghosh.jpg.jpeg", name: "Krishnendu Ghosh", score: "91%" },
  { category: "Boards", class: "12", year: "2026", image: "/achievers-img/Paridhi Mishra.jpg.jpeg", name: "Paridhi Mishra", score: "90.8%" },
  { category: "Boards", class: "12", year: "2026", image: "/achievers-img/Dishari Das.jpg.jpeg", name: "Dishari Das", score: "90.75%" },
  { category: "Boards", class: "12", year: "2026", image: "/achievers-img/Ishita Singh.jpg.jpeg", name: "Ishita Singh", score: "90.75%" },

  // 2025
  { category: "Boards", class: "12", year: "2025", image: "/achievers-img/Tanush Kesri Achiever.jpeg", name: "Tanush Kesri", score: "90.5%" },


  // ===== Boards Class 10 - 2026 =====
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Amrita Saha.jpg.jpeg", name: "Amrita Saha" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Agnit Das.jpg.jpeg", name: "Agnit Das" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Adrita Tokder.jpg.jpeg", name: "Adrita Tokder" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Deepjyoti Tapadar.jpg.jpeg", name: "Deepjyoti Tapadar" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Daiwik Goswami.jpg.jpeg", name: "Daiwik Goswami" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Aratrika Mandal.jpg.jpeg", name: "Aratrika Mandal" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Angshuman Ghosh.jpg.jpeg", name: "Angshuman Ghosh" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Srihaan Gupta.jpg.jpeg", name: "Srihaan Gupta" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Kashyap Sharma.jpg.jpeg", name: "Kashyap Sharma" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Sankhodeep Biswas.jpg.jpeg", name: "Sankhodeep Biswas" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Adrija Roy.jpg.jpeg", name: "Adrija Roy" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Baidik Dutta.jpg.jpeg", name: "Baidik Dutta" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Ashnishaa Hussain.jpg.jpeg", name: "Ashnishaa Hussain" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Tannistha Mitra.jpg.jpeg", name: "Tannistha Mitra" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Ariyan Ghosh.jpg.jpeg", name: "Ariyan Ghosh" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Shivi Arora.jpg.jpeg", name: "Shivi Arora" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Barnita Das.jpg.jpeg", name: "Barnita Das" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Swapnil Ghosh.jpg.jpeg", name: "Swapnil Ghosh" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Samriddhi Sen.jpg.jpeg", name: "Samriddhi Sen" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Kriticka Bhowmick.jpg.jpeg", name: "Kriticka Bhowmick" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Avipsha Saha.jpg.jpeg", name: "Avipsha Saha" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Anshu Shaw.jpg.jpeg", name: "Anshu Shaw" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Nitin Podder.jpg.jpeg", name: "Nitin Podder" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Riddhi Saha.jpg.jpeg", name: "Riddhi Saha" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Garima Pandey.jpg.jpeg", name: "Garima Pandey" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Sanskar Kr. Jaiswal.jpg.jpeg", name: "Sanskar Kr. Jaiswal" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Siddha Nandi.jpg.jpeg", name: "Siddha Nandi" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Souhardyo Bag.jpg.jpeg", name: "Souhardyo Bag" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Aditya Mondal.jpg.jpeg", name: "Aditya Mondal" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Ishita Param Puria.jpg.jpeg", name: "Ishita Param Puria" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Vaibhav Gautam.jpg.jpeg", name: "Vaibhav Gautam" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Saptanshu Malakar.jpg.jpeg", name: "Saptanshu Malakar" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Tuhinangshu Das.jpg.jpeg", name: "Tuhinangshu Das" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Kaushani Basak.jpg.jpeg", name: "Kaushani Basak" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Nikita Pal.jpg.jpeg", name: "Nikita Pal" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Anchala Kumari Thakur.jpg.jpeg", name: "Anchala Kumari Thakur" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Shreya Aon.jpg.jpeg", name: "Shreya Aon" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Priyansh Agarwal.jpg.jpeg", name: "Priyansh Agarwal" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Abhiraj Dasgupta.jpg.jpeg", name: "Abhiraj Dasgupta" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Akshat Jaiswal.jpg.jpeg", name: "Akshat Jaiswal" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Kannad Podder.jpg.jpeg", name: "Kannad Podder" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Sourav Shaw.jpg.jpeg", name: "Sourav Shaw" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Ratul Mishra.jpg.jpeg", name: "Ratul Mishra" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Shrija Roy.jpg.jpeg", name: "Shrija Roy" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Pradyumna Betal.jpg.jpeg", name: "Pradyumna Betal" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Ahana Debnath.jpg.jpeg", name: "Ahana Debnath" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Rajdeep Chakraborty.jpg.jpeg", name: "Rajdeep Chakraborty" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Anushka Saha.jpg.jpeg", name: "Anushka Saha" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Sneha Sarkar.jpg.jpeg", name: "Sneha Sarkar" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Premangshu Ghosh.jpg.jpeg", name: "Premangshu Ghosh" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Sohan Singha.jpg.png", name: "Sohan Singha" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Jhinuk Basu.jpg.jpeg", name: "Jhinuk Basu" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Proneet Mondal.jpg.jpeg", name: "Proneet Mondal" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Anurag Chakraborty.jpg.jpeg", name: "Anurag Chakraborty" },
  { category: "Boards", class: "10", year: "2026", image: "/achievers-img/Saptarshi Banerjee.jpg.jpeg", name: "Saptarshi Banerjee" },

  { category: "Boards", class: "10", year: "2025", image: "/achievers-img/Aniya Singha Achiever.jpeg", name: "Aniya Singha" },
  { category: "Boards", class: "10", year: "2025", image: "/achievers-img/Niladri De Achiever.jpeg", name: "Niladri De" },
  { category: "Boards", class: "10", year: "2025", image: "/achievers-img/Rishit Sarogi Achiever.jpeg", name: "Rishit Sarogi" },
  { category: "Boards", class: "10", year: "2025", image: "/achievers-img/Ritobrata Banerjee Achiever.jpeg", name: "Ritobrata Banerjee" },
  { category: "Boards", class: "10", year: "2025", image: "/achievers-img/Ishayu Gupta Achiever.jpeg", name: "Ishayu Gupta" },
  { category: "Boards", class: "10", year: "2025", image: "/achievers-img/Piyush Agarwal Achiever.jpeg", name: "Piyush Agarwal" },
  { category: "Boards", class: "10", year: "2025", image: "/achievers-img/Shristi Agarwal Achiever.jpeg", name: "Shristi Agarwal" },
  { category: "Boards", class: "10", year: "2025", image: "/achievers-img/Shirsho Banerjee Achiever.jpeg", name: "Shirsho Banerjee" },
  { category: "Boards", class: "10", year: "2025", image: "/achievers-img/Swarnava Malakar Achiever.jpeg", name: "Swarnava Malakar" },
  { category: "Boards", class: "10", year: "2025", image: "/achievers-img/Siddhiksha Majumdar Achiever.jpeg", name: "Siddhiksha Majumdar" },
  { category: "Boards", class: "10", year: "2025", image: "/achievers-img/Shrijit Sardar Achiever.jpeg", name: "Shrijit Sardar" },
  { category: "Boards", class: "10", year: "2025", image: "/achievers-img/Ankita Paul Achiever.jpeg", name: "Ankita Paul" },

  { category: "Boards", class: "10", year: "2024", image: "/achievers-img/Shreyan Jana Achiever.jpeg", name: "Shreyan Jana" },
  { category: "Boards", class: "10", year: "2024", image: "/achievers-img/Srijita Tripathi Achiever.jpeg", name: "Srijita Tripathi" },
  { category: "Boards", class: "10", year: "2024", image: "/achievers-img/Agnideep Chowdhury Achiever.jpeg", name: "Agnideep Chowdhury" },
  { category: "Boards", class: "10", year: "2024", image: "/achievers-img/Aishi Mondal Achiever.jpeg", name: "Aishi Mondal" },
  { category: "Boards", class: "10", year: "2024", image: "/achievers-img/Ayush Pal Achiever.jpeg", name: "Ayush Pal" },
  { category: "Boards", class: "10", year: "2024", image: "/achievers-img/Isha Mondal Achiever.jpeg", name: "Isha Mondal" },
  { category: "Boards", class: "10", year: "2024", image: "/achievers-img/Aditi Pandey Achiever.jpeg", name: "Aditi Pandey" },
  { category: "Boards", class: "10", year: "2024", image: "/achievers-img/Iraban Das Achiever.jpeg", name: "Iraban Das" },
  { category: "Boards", class: "10", year: "2024", image: "/achievers-img/Sunita Gaura Achiever.jpeg", name: "Sunita Gaura" },
  { category: "Boards", class: "10", year: "2024", image: "/achievers-img/Aradhya Bhagat Achiever.jpeg", name: "Aradhya Bhagat" },
  { category: "Boards", class: "10", year: "2024", image: "/achievers-img/Disha Sharma Achiever.jpeg", name: "Disha Sharma" },
  { category: "Boards", class: "10", year: "2024", image: "/achievers-img/Suravi Baid Jain Achiever.jpeg", name: "Suravi Baid Jain" },

  { category: "Boards", class: "10", year: "2023", image: "/achievers-img/Mayank Mishra Achiever.jpeg", name: "Mayank Mishra" },
  { category: "Boards", class: "10", year: "2023", image: "/achievers-img/Alisha Roy Achiever.jpeg", name: "Alisha Roy" },
  { category: "Boards", class: "10", year: "2023", image: "/achievers-img/Nikhil Sharma Achiever (1).jpeg", name: "Nikhil Sharma" },
  { category: "Boards", class: "10", year: "2023", image: "/achievers-img/Ashmita Acharya Achiever.jpeg", name: "Ashmita Acharya" },
  { category: "Boards", class: "10", year: "2023", image: "/achievers-img/Sumerun Nag Achiever.jpeg", name: "Sumerun Nag" },
  { category: "Boards", class: "10", year: "2023", image: "/achievers-img/Tanisha Kesri Achiever 2.jpeg", name: "Tanisha Kesri Achiever 2" },
  { category: "Boards", class: "10", year: "2023", image: "/achievers-img/Parimarjan Sahoo Achiever.jpeg", name: "Parimarjan Sahoo" },
  { category: "Boards", class: "10", year: "2023", image: "/achievers-img/Aarya Mishra Achiever.jpeg", name: "Aarya Mishra" },
  { category: "Boards", class: "10", year: "2023", image: "/achievers-img/Aarya Das Achiever.jpeg", name: "Aarya Das" },
  { category: "Boards", class: "10", year: "2023", image: "/achievers-img/Swapnadeep Roy Achiever.jpeg", name: "Swapnadeep Roy" },
  { category: "Boards", class: "10", year: "2023", image: "/achievers-img/Shambhavi Majumdar Achiever.jpeg", name: "Shambhavi Majumdar" },
  { category: "Boards", class: "10", year: "2023", image: "/achievers-img/Shruti Tantiya Achiever (1).jpeg", name: "Shruti Tantiya" },

  { category: "Entrance", image: "/achievers-img/Padmanabh Saha (1).jpeg" },
  { category: "Entrance", image: "/achievers-img/Aditi Mishra (1).jpeg" },
  { category: "Entrance", image: "/achievers-img/Rajiv Chatterjee (1).jpeg" },
  { category: "Entrance", image: "/achievers-img/Aryaman Ghosh (1).jpeg" },
  { category: "Entrance", image: "/achievers-img/Shourya Sengupta (1).jpeg" },
  { category: "Entrance", image: "/achievers-img/Snigdha Aditya (1).jpeg" },
  { category: "Entrance", image: "/achievers-img/Sousamya Roy (1).jpeg" },
  { category: "Entrance", image: "/achievers-img/Adwitiya Adhikari (1).jpeg" },
  { category: "Entrance", image: "/achievers-img/Avipsha Saha (1).jpeg" },
  { category: "Entrance", image: "/achievers-img/Anushkha Sen (1).jpeg" },
  { category: "Entrance", image: "/achievers-img/Madhurima Pal (1).jpeg" },
  { category: "Entrance", image: "/achievers-img/Bickey Podder (1).jpeg" },
  { category: "Entrance", image: "/achievers-img/Srijita Halder (1).jpeg" },
  { category: "Entrance", image: "/achievers-img/Rohan Jaria (1).jpeg" },
  { category: "Entrance", image: "/achievers-img/Pragati Agarwal (1).jpeg" },
  { category: "Entrance", image: "/achievers-img/Nikhil Sharma (1).jpeg" },
  { category: "Entrance", image: "/achievers-img/Asmita Acharjee.jpeg" },
  { category: "Entrance", image: "/achievers-img/Aarya Mishra.jpeg" },
  { category: "Entrance", image: "/achievers-img/Arya Das.jpeg" },
  { category: "Entrance", image: "/achievers-img/Tanush Kesri (1).jpeg" },
  { category: "Entrance", image: "/achievers-img/Swastik Ghosh.jpeg" },
  { category: "Entrance", image: "/achievers-img/Adrija Chakraborty.jpeg" },
  { category: "Entrance", image: "/achievers-img/Anirudh Jaiswal.jpeg" },
];

export default function AchieversPage() {
  const navigate = useNavigate();
  const [main, setMain] = useState<"Boards" | "Entrance">("Boards");
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase();

  const filtered = useMemo(() => achievers.filter((a) => {
    if (a.category !== main) return false;
    const searchable = [a.name, a.school, a.class, a.year, a.category]
      .filter(Boolean).join(" ").toLocaleLowerCase();
    return !normalizedQuery || searchable.includes(normalizedQuery);
  }), [main, normalizedQuery]);

  const class12 = filtered.filter((a) => a.class === "12");
  const class10Years = [...new Set(filtered.filter((a) => a.class === "10").map((a) => a.year))].sort().reverse();
  const entrance = filtered.filter((a) => !a.class);

  return (
    <section className="min-h-screen bg-gray-50 pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 rounded-full border border-[#142850]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#142850] shadow-sm transition hover:bg-[#142850] hover:text-white">
            <ArrowLeftCircle className="h-5 w-5" /> Back to Home
          </button>
        </div>

        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#eab308]">Pride of Shiksharthi</p>
          <h1 className="mt-3 text-3xl font-bold text-[#142850] md:text-4xl">Our Achievers</h1>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#eab308]/40 bg-[#eab308]/10 px-6 py-2 text-sm font-semibold text-[#142850]">
            <Trophy className="h-4 w-4 text-[#eab308]" /> ALL INDIA RANKERS
          </div>
        </div>

        <div className="mb-12"><AchieversSection showButton={false} compact /></div>

        <div className="mx-auto mb-8 max-w-2xl">
          <label htmlFor="achiever-search" className="sr-only">Search achievers by student name or school</label>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-[#eab308] focus-within:ring-2 focus-within:ring-[#eab308]/20">
            <Search className="h-5 w-5 shrink-0 text-slate-400" />
            <input id="achiever-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by student name or school..." className="w-full bg-transparent text-sm text-[#142850] outline-none placeholder:text-slate-400" />
            {query && <button type="button" onClick={() => setQuery("")} className="text-xs font-semibold text-slate-500 hover:text-[#142850]">Clear</button>}
          </div>
          <p className="mt-2 text-center text-xs text-slate-500">{filtered.length} achiever{filtered.length === 1 ? "" : "s"} found</p>
        </div>

        <div className="mb-14 flex justify-center">
          <div className="flex rounded-full border border-slate-200 bg-white p-1">
            {(["Boards", "Entrance"] as const).map((item) => <button key={item} onClick={() => setMain(item)} className={`rounded-full px-8 py-2 text-sm font-semibold transition ${main === item ? "bg-[#142850] text-white" : "text-slate-600 hover:text-[#142850]"}`}>{item === "Entrance" ? "JEE / NEET" : item}</button>)}
          </div>
        </div>

        {main === "Boards" ? <>
          {class12.length > 0 && <>
            <h2 className="mb-8 text-center text-2xl font-bold text-[#142850]">Class 12</h2>
            <div className="mb-20 grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {class12.map((a, i) => <motion.div key={a.image} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.35,delay:Math.min(i*.025,.2)}}><AchieverCard achiever={a} /></motion.div>)}
            </div>
          </>}
          {class10Years.map((year) => {
            const yearRecords = filtered.filter((a) => a.class === "10" && a.year === year);
            return <section key={year} className="mb-16">
              <h2 className="mb-8 text-2xl font-bold text-[#142850]">Class 10 <span className="ml-2 text-lg font-medium text-slate-400">{year}</span></h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                {yearRecords.map((a,i) => <motion.div key={a.image} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.35,delay:Math.min(i*.025,.2)}}><AchieverCard achiever={a} /></motion.div>)}
              </div>
            </section>;
          })}
        </> : <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {entrance.map((a,i) => <motion.div key={a.image} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.35,delay:Math.min(i*.025,.2)}}><AchieverCard achiever={a} /></motion.div>)}
        </div>}

        {filtered.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <Search className="mx-auto mb-3 h-8 w-8 text-slate-300" />
          <h2 className="text-lg font-semibold text-[#142850]">No achievers found</h2>
          <p className="mt-1 text-sm text-slate-500">Try another student name or school.</p>
        </div>}
      </div>
      <div className="mt-20"><AchieversSection showButton={false} compact /></div>
    </section>
  );
}
