import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";

const AdmissionPopup = () => {
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const handleScroll = () => {

      if (closed) return;

      // If user clicked Enroll button disable popup
      if (sessionStorage.getItem("enrollClicked") === "true") return;

      const section = document.getElementById("principal-desk");

      if (!section) return;

      const rect = section.getBoundingClientRect();

      // show popup slightly after principal desk
      if (rect.bottom < window.innerHeight * 0.7) {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [closed]);

  const closePopup = () => {
    setVisible(false);
    setClosed(true);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const text = `
New Counselling Enquiry:

Student Name: ${name}
Phone: ${phone}
`;

    const encodedText = encodeURIComponent(text);

    const whatsappNumber = "919836269282";

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedText}`,
      "_blank"
    );

    closePopup();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closePopup}
          />

          {/* Popup Card */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="relative bg-white rounded-3xl shadow-2xl w-[90%] max-w-md p-8"
          >

            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-slate-400 hover:text-black"
            >
              <X size={20} />
            </button>

            {/* Heading */}
            <h3 className="text-2xl font-bold text-[#142850] mb-3">
              Free Academic Counselling
            </h3>

            <p className="text-slate-600 text-sm mb-6">
              Speak directly with our faculty and plan the right academic path.
            </p>

            {/* Trust Points */}
            <div className="space-y-2 mb-6">

              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle className="w-4 h-4 text-[#eab308]" />
                Personal study plan
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle className="w-4 h-4 text-[#eab308]" />
                Board + JEE/NEET guidance
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle className="w-4 h-4 text-[#eab308]" />
                Direct faculty interaction
              </div>

            </div>

            <p className="text-xs text-slate-500 mb-6">
              Parents & students both can attend.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                placeholder="Student Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#eab308]"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#eab308]"
              />

              <button
                type="submit"
                className="w-full bg-[#eab308] hover:bg-[#d4a307] text-black font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Get My Free Counselling
              </button>

            </form>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdmissionPopup;