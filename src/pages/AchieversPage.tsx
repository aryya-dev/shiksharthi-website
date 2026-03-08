import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const achievers = [
  { category: "Boards", class: "12", year: "2025", image: "/achievers-img/Shambhavi Majumder Achiever.jpeg" },
  { category: "Boards", class: "12", year: "2025", image: "/achievers-img/Sohani Parveen Achiever.jpeg" },
  { category: "Boards", class: "12", year: "2025", image: "/achievers-img/Rishika Joshi Achiever.jpeg" },
  { category: "Boards", class: "12", year: "2025", image: "/achievers-img/Anoushka Ghosh Achiever.jpeg" },
  { category: "Boards", class: "12", year: "2025", image: "/achievers-img/Tanisha Kesri Achiever.jpeg" },
  { category: "Boards", class: "12", year: "2025", image: "/achievers-img/Madhurima Pal Achiever.jpeg" },
  { category: "Boards", class: "12", year: "2025", image: "/achievers-img/Nikhil Sharma Achiever.jpeg" },
  { category: "Boards", class: "12", year: "2025", image: "/achievers-img/Shreya Mishra Achiever.jpeg" },
  { category: "Boards", class: "12", year: "2025", image: "/achievers-img/Ishita Saha Achiever.jpeg" },
  { category: "Boards", class: "12", year: "2025", image: "/achievers-img/Aryya Bandyopadhyay ;)Achiever.jpeg" },
  { category: "Boards", class: "12", year: "2025", image: "/achievers-img/Sagnik Kundu Achiever.jpeg" },
  { category: "Boards", class: "12", year: "2025", image: "/achievers-img/Tanush Kesri Achiever.jpeg" },

  { category: "Boards", class: "10", year: "2025", image: "/achievers-img/Aniya Singha Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2025", image: "/achievers-img/Niladri De Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2025", image: "/achievers-img/Rishit Sarogi Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2025", image: "/achievers-img/Ritobrata Banerjee Achiever.jpeg"},
  { category: "Boards", class: "10", year: "2025", image: "/achievers-img/Ishayu Gupta Achiever.jpeg"},
  { category: "Boards", class: "10", year: "2025", image: "/achievers-img/Piyush Agarwal Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2025", image: "/achievers-img/Shristi Agarwal Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2025", image: "/achievers-img/Shirsho Banerjee Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2025", image: "/achievers-img/Swarnava Malakar Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2025", image: "/achievers-img/Siddhiksha Majumdar Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2025", image: "/achievers-img/Shrijit Sardar Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2025", image: "/achievers-img/Ankita Paul Achiever.jpeg" },

  { category: "Boards", class: "10", year: "2024", image: "/achievers-img/Shreyan Jana Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2024", image: "/achievers-img/Srijita Tripathi Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2024", image: "/achievers-img/Agnideep Chowdhury Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2024", image: "/achievers-img/Aishi Mondal Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2024", image: "/achievers-img/Ayush Pal Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2024", image: "/achievers-img/Isha Mondal Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2024", image: "/achievers-img/Aditi Pandey Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2024", image: "/achievers-img/Iraban Das Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2024", image: "/achievers-img/Sunita Gaura Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2024", image: "/achievers-img/Aradhya Bhagat Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2024", image: "/achievers-img/Disha Sharma Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2024", image: "/achievers-img/Suravi Baid Jain Achiever.jpeg" },
  
  { category: "Boards", class: "10", year: "2023", image: "/achievers-img/Mayank Mishra Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2023", image: "/achievers-img/Alisha Roy Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2023", image: "/achievers-img/Nikhil Sharma Achiever (1).jpeg" },
  { category: "Boards", class: "10", year: "2023", image: "/achievers-img/Ashmita Acharya Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2023", image: "/achievers-img/Sumerun Nag Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2023", image: "/achievers-img/Tanisha Kesri Achiever 2.jpeg" },
  { category: "Boards", class: "10", year: "2023", image: "/achievers-img/Parimarjan Sahoo Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2023", image: "/achievers-img/Aarya Mishra Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2023", image: "/achievers-img/Aarya Das Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2023", image: "/achievers-img/Swapnadeep Roy Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2023", image: "/achievers-img/Shambhavi Majumdar Achiever.jpeg" },
  { category: "Boards", class: "10", year: "2023", image: "/achievers-img/Shruti Tantiya Achiever (1).jpeg" },

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

  const years10 = [...new Set(
    achievers
      .filter(a => a.category === "Boards" && a.class === "10")
      .map(a => a.year)
  )].sort().reverse();

  return (
    <section className="bg-gray-50 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-16">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 rounded-full border border-[#142850]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#142850] shadow-sm transition hover:bg-[#142850] hover:text-white"
          >
            <ArrowLeftCircle className="h-5 w-5" />
            Back to Home
          </button>
        </div>

        <div className="flex justify-center mb-20">
          <div className="bg-white rounded-full border border-slate-200 p-1 flex">
            {["Boards", "Entrance"].map((item) => (
              <button
                key={item}
                onClick={() => setMain(item as any)}
                className={`px-8 py-2 rounded-full text-sm font-semibold transition-all duration-300
                  ${main === item ? "bg-[#142850] text-white" : "text-slate-600"}`}
              >
                {item === "Entrance" ? "JEE / NEET" : item}
              </button>
            ))}
          </div>
        </div>

        {main === "Boards" && (
          <>
            <h2 className="text-3xl font-bold text-[#142850] text-center mb-12">
              Class 12
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-24">
              {achievers
                .filter(a => a.category === "Boards" && a.class === "12")
                .map((a, index) => (
                  <motion.div
                    key={a.image}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    className="rounded-2xl overflow-hidden bg-white shadow-md"
                  >
                    <img
                      src={a.image}
                      alt="Achiever"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto"
                    />
                  </motion.div>
                ))}
            </div>

            <div className="h-px bg-slate-200 mb-24" />

            <h2 className="text-3xl font-bold text-[#142850] text-center mb-12">
              Class 10
            </h2>

            {years10.map((yr) => (
              <div key={yr} className="mb-20">
                <h3 className="text-xl font-semibold text-[#142850] mb-8">
                  {yr}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {achievers
                    .filter(a =>
                      a.category === "Boards" &&
                      a.class === "10" &&
                      a.year === yr
                    )
                    .map((a, index) => (
                      <motion.div
                        key={a.image}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.05 }}
                        className="rounded-2xl overflow-hidden bg-white shadow-md"
                      >
                        <img
                          src={a.image}
                          alt="Achiever"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-auto"
                        />
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}
          </>
        )}

        {main === "Entrance" && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {achievers
              .filter(a => a.category === "Entrance")
              .map((a, index) => (
                <motion.div
                  key={a.image}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="rounded-2xl overflow-hidden bg-white shadow-md"
                >
                  <img
                    src={a.image}
                    alt="Entrance Achiever"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto"
                  />
                </motion.div>
              ))}
          </div>
        )}

      </div>
    </section>
  );
}

