import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    student: "",
    parent: "",
    phone: "",
    email: "",
    currentClass: "",
    program: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = `
New Admission Enquiry:

Student Name: ${formData.student}
Parent Name: ${formData.parent}
Phone: ${formData.phone}
Email: ${formData.email}
Current Class: ${formData.currentClass}
Interested Program: ${formData.program}
Message: ${formData.message}
`;

    const encodedText = encodeURIComponent(text);

    // Replace with Ma'am's WhatsApp number (with country code, no +)
    const whatsappNumber = "919007063109";

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedText}`,
      "_blank"
    );
  };

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase text-[#eab308]">
            Admissions Open
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#142850] mt-2">
            Book a Counselling Session
          </h2>
          <p className="text-slate-500 mt-4 text-sm">
            Fill the form below and our team will contact you to schedule an
            in-person admission discussion.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Map & Contact Info */}
          <div className="space-y-8">
            <div className="rounded-2xl overflow-hidden shadow-lg h-72">
              <iframe
                title="Shiksharthi Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.2218657530425!2d88.4315312!3d22.608188700000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02759d5e565377%3A0xb4960d28690d4761!2sShiksharthi%20Educational%20Institute!5e0!3m2!1sen!2sin!4v1771855686650!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#eab308] mt-1 shrink-0" />
                <p className="text-sm text-slate-600">
                  IF 11, Ashwini Nagar, Baguiati, Kolkata, West Bengal 700159
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#eab308]" />
                <p className="text-sm text-slate-600">+91 98362 69282</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#eab308]" />
                <p className="text-sm text-slate-600">
                  shiksharthi.edu.institute@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-10 border border-slate-100">
            <h3 className="text-xl font-semibold text-[#142850] mb-6">
              Admission Enquiry Form
            </h3>

            <form className="space-y-5" onSubmit={handleSubmit}>

              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  name="student"
                  placeholder="Student Name"
                  className="rounded-xl"
                  onChange={handleChange}
                  required
                />
                <Input
                  name="parent"
                  placeholder="Parent Name"
                  className="rounded-xl"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  name="phone"
                  placeholder="Phone Number"
                  type="tel"
                  className="rounded-xl"
                  onChange={handleChange}
                  required
                />
                <Input
                  name="email"
                  placeholder="Email Address"
                  type="email"
                  className="rounded-xl"
                  onChange={handleChange}
                />
              </div>

              <Input
                name="currentClass"
                placeholder="Current Class (e.g., Class 10)"
                className="rounded-xl"
                onChange={handleChange}
                required
              />

              <Input
                name="program"
                placeholder="Interested Program (e.g., Class 11-12 NEET)"
                className="rounded-xl"
                onChange={handleChange}
                required
              />

              <Textarea
                name="message"
                placeholder="Any specific queries (optional)"
                rows={3}
                className="rounded-xl resize-none"
                onChange={handleChange}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#eab308] hover:bg-[#d4a307] 
                text-black font-semibold rounded-xl 
                shadow-md hover:shadow-lg 
                transition-all duration-300"
              >
                Submit Admission Enquiry
              </Button>

              <p className="text-xs text-slate-500 text-center mt-3">
                Admissions are conducted through in-person interaction at our campus.
              </p>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;