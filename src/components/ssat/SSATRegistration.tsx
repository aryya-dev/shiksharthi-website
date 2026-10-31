import { useState, useMemo } from "react";
import { addRegistration } from "@/lib/ssatDatabase";
import { SHIKSHARTHI_LOGO_BASE64 } from "@/lib/admitCardLogo";
import { printAdmitCardDocument, downloadAdmitCardPDF } from "@/lib/admitCardPrint";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CheckCircle2,
  Loader2,
  Copy,
  Check,
  User,
  GraduationCap,
  Building2,
  Phone,
  Mail,
  Calendar,
  ShieldCheck,
  Sparkles,
  Clock,
  Printer,
  ChevronDown,
  FileText,
  AlertCircle,
  Award,
  MapPin,
  Download,
} from "lucide-react";

type Board = "ICSE" | "CBSE" | "WBBSE" | "Other" | "";
type ExamDate = "15 November 2026" | "22 November 2026" | "";

interface FormData {
  studentName: string;
  schoolName: string;
  board: Board;
  studentMobile: string;
  parentMobile: string;
  email: string;
  examDate: ExamDate;
  consent: boolean;
}

interface FormErrors {
  studentName?: string;
  schoolName?: string;
  board?: string;
  studentMobile?: string;
  parentMobile?: string;
  email?: string;
  examDate?: string;
  consent?: string;
}

const BOARDS: Board[] = ["ICSE", "CBSE", "WBBSE", "Other"];
const EXAM_DATES: { date: ExamDate; day: string; time: string; badge: string; seats: string }[] = [
  {
    date: "15 November 2026",
    day: "Sunday",
    time: "11:00 AM – 1:00 PM",
    badge: "Slot 1",
    seats: "Filling Fast",
  },
  {
    date: "22 November 2026",
    day: "Sunday",
    time: "11:00 AM – 1:00 PM",
    badge: "Slot 2",
    seats: "Available",
  },
];

// Form sections for progress tracking
const FORM_SECTIONS = [
  { id: "candidate", label: "Candidate", icon: User },
  { id: "contact", label: "Contact", icon: Phone },
  { id: "schedule", label: "Schedule", icon: Calendar },
  { id: "confirm", label: "Confirm", icon: ShieldCheck },
];

function generateRegistrationId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "SSAT26-";
  for (let i = 0; i < 5; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

function validateMobile(val: string): boolean {
  return /^[6-9]\d{9}$/.test(val.replace(/\s/g, ""));
}

const SSATRegistration = () => {
  const [form, setForm] = useState<FormData>({
    studentName: "",
    schoolName: "",
    board: "",
    studentMobile: "",
    parentMobile: "",
    email: "",
    examDate: "",
    consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{
    regId: string;
    studentName: string;
    schoolName: string;
    board: string;
    studentMobile: string;
    parentMobile: string;
    email: string;
    examDate: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // Track completed sections for the progress bar
  const completedSections = useMemo(() => {
    const done: boolean[] = [
      !!(form.studentName.trim() && form.schoolName.trim() && form.board),
      !!(form.studentMobile.trim() && form.parentMobile.trim()),
      !!form.examDate,
      form.consent,
    ];
    return done;
  }, [form]);

  const completedCount = completedSections.filter(Boolean).length;

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.studentName.trim()) e.studentName = "Please enter student's full name.";
    if (!form.schoolName.trim()) e.schoolName = "Please enter current school name.";
    if (!form.board) e.board = "Please select your educational board.";
    if (!form.studentMobile.trim()) {
      e.studentMobile = "Student mobile number is required.";
    } else if (!validateMobile(form.studentMobile)) {
      e.studentMobile = "Enter a valid 10-digit Indian mobile number.";
    }
    if (!form.parentMobile.trim()) {
      e.parentMobile = "Parent / Guardian mobile number is required.";
    } else if (!validateMobile(form.parentMobile)) {
      e.parentMobile = "Enter a valid 10-digit Indian mobile number.";
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Please enter a valid email address.";
    }
    if (!form.examDate) e.examDate = "Please choose your preferred examination date.";
    if (!form.consent) e.consent = "Please confirm eligibility and agree to the terms.";
    return e;
  };

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstErrorKey = Object.keys(errs)[0];
      document.getElementById(`ssat-field-${firstErrorKey}`)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));

    const regId = generateRegistrationId();

    // Save registration to local database
    addRegistration({
      regId,
      studentName: form.studentName,
      schoolName: form.schoolName,
      board: form.board,
      studentMobile: form.studentMobile,
      parentMobile: form.parentMobile,
      email: form.email,
      examDate: form.examDate as string,
      consent: form.consent,
      registeredAt: new Date().toISOString(),
    });

    setSuccess({
      regId,
      studentName: form.studentName,
      schoolName: form.schoolName,
      board: form.board,
      studentMobile: form.studentMobile,
      parentMobile: form.parentMobile,
      email: form.email,
      examDate: form.examDate as string,
    });
    setSubmitting(false);

    // Scroll smoothly to confirmation slip
    setTimeout(() => {
      document.getElementById("ssat-register")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };


  const copyRegId = () => {
    if (success) {
      navigator.clipboard.writeText(success.regId).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const resetForm = () => {
    setForm({
      studentName: "",
      schoolName: "",
      board: "",
      studentMobile: "",
      parentMobile: "",
      email: "",
      examDate: "",
      consent: false,
    });
    setSuccess(null);
  };

  const [isSavingPDF, setIsSavingPDF] = useState(false);

  const handleSavePDF = async () => {
    if (!success) return;
    setIsSavingPDF(true);
    try {
      await downloadAdmitCardPDF({
        regId: success.regId,
        studentName: success.studentName,
        schoolName: success.schoolName,
        board: success.board,
        studentMobile: success.studentMobile,
        parentMobile: success.parentMobile,
        email: success.email,
        examDate: success.examDate,
        consent: true,
        registeredAt: new Date().toISOString(),
      });
    } catch (e) {
      console.error("PDF auto-download failed:", e);
      printAdmitCard();
    } finally {
      setIsSavingPDF(false);
    }
  };

  const printAdmitCard = () => {
    if (!success) return;
    printAdmitCardDocument({
      regId: success.regId,
      studentName: success.studentName,
      schoolName: success.schoolName,
      board: success.board,
      studentMobile: success.studentMobile,
      parentMobile: success.parentMobile,
      email: success.email,
      examDate: success.examDate,
      consent: true,
      registeredAt: new Date().toISOString(),
    });
  };

  // SUCCESS ADMIT CARD SCREEN
  if (success) {
    return (
      <section id="ssat-register" className="py-8 sm:py-14 bg-slate-100 dark:bg-slate-950 min-h-screen">
        <div className="max-w-3xl mx-auto px-3 sm:px-6">
          {/* Top Control Bar (Screen Only) */}
          <div className="no-print bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  Registration Confirmed!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Your 1-page Official SSAT Admit Card is ready. Download or print below.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <Button
                type="button"
                onClick={handleSavePDF}
                disabled={isSavingPDF}
                className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl px-4 py-2 text-xs shadow-md cursor-pointer flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                {isSavingPDF ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    <span>Saving PDF...</span>
                  </>
                ) : (
                  <>
                    <Download size={15} />
                    <span>Save as PDF (Auto-Download)</span>
                  </>
                )}
              </Button>
              <Button
                type="button"
                onClick={printAdmitCard}
                variant="outline"
                className="flex-1 sm:flex-none border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl px-3 py-2 text-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Printer size={15} />
                <span>Print</span>
              </Button>
              <Button
                type="button"
                onClick={resetForm}
                variant="ghost"
                className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl px-3 py-2 text-xs cursor-pointer"
              >
                New Form
              </Button>
            </div>
          </div>

          {/* =========================================================================
              THE OFFICIAL 1-PAGE ADMIT CARD (ON-SCREEN DISPLAY)
             ========================================================================= */}
          <div
            id="ssat-admit-card"
            className="bg-white text-slate-900 border-2 border-slate-900 rounded-lg p-5 sm:p-7 shadow-xl mx-auto relative overflow-hidden"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {/* Watermark in Background */}
            <div
              className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.035] select-none"
              aria-hidden="true"
            >
              <span className="text-[120px] font-black tracking-widest uppercase text-slate-900 -rotate-45">
                SSAT 2026
              </span>
            </div>

            {/* Header Section */}
            <header className="border-b-2 border-slate-900 pb-3 text-center relative">
              {/* Logo with base64 embedded data so it always renders */}
              <div className="flex justify-center mb-1">
                <img
                  src={SHIKSHARTHI_LOGO_BASE64}
                  alt="Shiksharthi Logo"
                  className="h-14 sm:h-16 w-auto object-contain max-w-[280px]"
                />
              </div>

              {/* Text Under Logo */}
              <h1 className="text-base sm:text-xl font-extrabold tracking-tight text-[#142850] uppercase">
                Shiksharthi Educational Institute
              </h1>
              <p className="text-[10px] sm:text-[11px] font-medium text-slate-600 tracking-wide mt-0.5">
                Premier Institute for IIT-JEE, NEET & Foundation | Kolkata, West Bengal
              </p>

              {/* Examination Title Ribbon */}
              <div className="mt-2.5 bg-[#142850] text-white py-1.5 px-3 rounded-md inline-block max-w-full">
                <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase block">
                  SHIKSHARTHI SCHOLARSHIP ADMISSION TEST (SSAT 2026)
                </span>
                <span className="text-[9px] sm:text-[10px] font-medium tracking-widest uppercase text-amber-300 block">
                  ★ OFFICIAL HALL TICKET & ADMIT CARD ★
                </span>
              </div>
            </header>

            {/* Hall Ticket Bar */}
            <div className="my-2.5 py-1.5 px-3 bg-slate-50 border border-slate-300 rounded flex flex-wrap items-center justify-between text-xs gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase text-slate-500">Roll / Admit No:</span>
                <span className="font-mono font-extrabold text-sm sm:text-base text-[#142850] tracking-wider">
                  {success.regId}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                <span>Class: <strong className="text-slate-800">10 (Science)</strong></span>
                <span>•</span>
                <span>Category: <strong className="text-slate-800">Scholarship Exam</strong></span>
              </div>
            </div>

            {/* Candidate & Examination Details Grid */}
            <div className="grid grid-cols-12 gap-3 my-2 text-xs">
              {/* Student Details (Left 9 columns) */}
              <div className="col-span-8 sm:col-span-9 border border-slate-300 rounded overflow-hidden">
                <table className="w-full text-left border-collapse text-[11px] sm:text-xs">
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-1 px-2.5 font-bold text-slate-500 bg-slate-50/80 w-1/3">Candidate Name</td>
                      <td className="py-1 px-2.5 font-extrabold text-[#142850] uppercase text-xs sm:text-sm">
                        {success.studentName}
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-1 px-2.5 font-bold text-slate-500 bg-slate-50/80">School & Board</td>
                      <td className="py-1 px-2.5 font-semibold text-slate-800">
                        {success.schoolName} ({success.board})
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-1 px-2.5 font-bold text-slate-500 bg-slate-50/80">Student Mobile</td>
                      <td className="py-1 px-2.5 font-mono font-semibold text-slate-800">
                        +91 {success.studentMobile}
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-1 px-2.5 font-bold text-slate-500 bg-slate-50/80">Parent Mobile</td>
                      <td className="py-1 px-2.5 font-mono font-semibold text-slate-800">
                        +91 {success.parentMobile}
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-1 px-2.5 font-bold text-slate-500 bg-slate-50/80">Date of Examination</td>
                      <td className="py-1 px-2.5 font-extrabold text-[#142850]">
                        {success.examDate}
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-1 px-2.5 font-bold text-slate-500 bg-slate-50/80">Reporting Time</td>
                      <td className="py-1 px-2.5 font-bold text-amber-700">
                        10:30 AM (Sharp)
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-1 px-2.5 font-bold text-slate-500 bg-slate-50/80">Examination Timing</td>
                      <td className="py-1 px-2.5 font-semibold text-slate-800">
                        11:00 AM – 1:00 PM (Duration: 2 Hours)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2.5 font-bold text-slate-500 bg-slate-50/80">Examination Venue</td>
                      <td className="py-1 px-2.5 font-semibold text-slate-800">
                        Shiksharthi Educational Institute, Kolkata
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Photo Box (Right 3 columns) */}
              <div className="col-span-4 sm:col-span-3 flex flex-col justify-between items-center text-center border border-slate-300 rounded p-1.5 bg-slate-50/50">
                <div className="w-full h-28 sm:h-32 border-2 border-dashed border-slate-300 rounded flex flex-col items-center justify-center p-1 bg-white text-[9px] text-slate-400">
                  <User size={24} className="opacity-30 mb-1" />
                  <span>Affix Recent Passport Size Photograph</span>
                  <span className="text-[8px] text-slate-300 mt-0.5">(Self-Attested)</span>
                </div>
                <div className="text-[8px] text-slate-400 font-semibold uppercase tracking-wider mt-1">
                  Candidate Photo
                </div>
              </div>
            </div>

            {/* Signatures & Seal Row */}
            <div className="grid grid-cols-3 gap-2 my-2.5 pt-2 border-t border-slate-200 text-center text-[10px]">
              <div className="border border-slate-200 rounded p-1.5">
                <div className="h-9 flex items-end justify-center border-b border-dashed border-slate-300 pb-0.5">
                  <span className="font-mono text-[9px] text-slate-400">Sign here during exam</span>
                </div>
                <span className="font-semibold text-slate-700 block mt-1">Candidate's Signature</span>
              </div>
              <div className="border border-slate-200 rounded p-1.5">
                <div className="h-9 flex items-end justify-center border-b border-dashed border-slate-300 pb-0.5" />
                <span className="font-semibold text-slate-700 block mt-1">Invigilator's Signature</span>
              </div>
              <div className="border border-slate-200 rounded p-1.5 bg-slate-50/50">
                <div className="h-9 flex items-center justify-center border-b border-dashed border-slate-300 pb-0.5">
                  <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck size={12} />
                    Verified & Authorized
                  </span>
                </div>
                <span className="font-semibold text-slate-700 block mt-1">Controller of Examinations</span>
              </div>
            </div>

            {/* Examination Instructions Section */}
            <div className="border-t-2 border-slate-900 pt-2 mt-2">
              <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[#142850] mb-1">
                Important Instructions for Candidates
              </h4>
              <ol className="list-decimal list-inside text-[9.5px] sm:text-[10px] text-slate-700 space-y-0.5 leading-tight">
                <li>
                  <strong>Mandatory Entry Pass:</strong> Candidates must bring this printed Admit Card along with their original School Identity Card or Aadhaar Card.
                </li>
                <li>
                  <strong>Reporting Time:</strong> Report to the examination venue by <strong>10:30 AM</strong>. Entry gates close at 10:55 AM. No candidate will be allowed after 11:15 AM.
                </li>
                <li>
                  <strong>Permitted Stationery:</strong> Use only <strong>Blue or Black ballpoint pens</strong>. Rough sheets will be provided in the examination hall.
                </li>
                <li>
                  <strong>Prohibited Items:</strong> Mobile phones, smartwatches, calculators, and electronic gadgets are strictly banned inside the hall.
                </li>
                <li>
                  <strong>Scholarships:</strong> Top 100 students receive scholarship opportunities; top 10 receive <strong>₹1,00,000 scholarship</strong> awards.
                </li>
              </ol>
            </div>

            {/* Footer Helpline */}
            <div className="mt-2.5 pt-1.5 border-t border-slate-200 text-center text-[9px] text-slate-500 flex flex-wrap items-center justify-between gap-1">
              <span>Helpline: <strong>+91 9836269291</strong></span>
              <span>Email: <strong>shiksharthi.edu.institute@gmail.com</strong></span>
              <span>Website: <strong>www.shiksharthi.org</strong></span>
              <span className="text-slate-400 italic">Valid only for SSAT 2026 Examination</span>
            </div>
          </div>

          {/* Bottom helper tip (Screen Only) */}
          <div className="no-print mt-4 text-center">
            <p className="text-xs text-slate-500">
              💡 <strong>Mobile / Phone tip:</strong> Clicking <strong>"Save as PDF"</strong> will automatically download the 1-page official Admit Card directly into your device's Downloads folder.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // MAIN REGISTRATION FORM
  return (
    <section
      id="ssat-register"
      className="py-12 sm:py-20 md:py-24 bg-gradient-to-b from-slate-50 via-gray-100/60 to-slate-50 relative overflow-hidden"
    >
      {/* Decorative ambient background spots */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[250px] bg-[#142850]/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-bold tracking-widest uppercase mb-3">
            <Sparkles size={13} className="text-[#eab308]" />
            Official Application
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#142850] tracking-tight">
            Register for SSAT 2026
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2.5 max-w-md mx-auto">
            Take the first step toward ₹1,00,000 top scholarships. Fill in your details below to reserve your examination slot.
          </p>
        </div>

        {/* Master Form Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xl sm:shadow-2xl overflow-hidden">
          {/* Card Top Brand Banner */}
          <div className="bg-gradient-to-r from-[#142850] via-[#1a3466] to-[#142850] text-white px-5 sm:px-8 py-5 border-b border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
                  <GraduationCap size={20} className="text-[#eab308]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base leading-tight">Class 10 Science Admission Test</h3>
                  <p className="text-white/70 text-[11px] sm:text-xs">Scholarship-based entrance for Class 11</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-medium text-amber-300 self-start sm:self-auto bg-white/10 px-3 py-1 rounded-full border border-amber-300/20">
                <ShieldCheck size={13} />
                <span>100% Free Registration</span>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="px-5 sm:px-8 pt-6 pb-2">
            <div className="flex items-center justify-between">
              {FORM_SECTIONS.map((section, idx) => {
                const Icon = section.icon;
                const isComplete = completedSections[idx];
                const isLast = idx === FORM_SECTIONS.length - 1;
                return (
                  <div key={section.id} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center gap-1.5">
                      <div
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 ${isComplete
                            ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25"
                            : "bg-slate-100 text-slate-400 border border-slate-200"
                          }`}
                      >
                        {isComplete ? (
                          <Check size={14} className="stroke-[3]" />
                        ) : (
                          <Icon size={14} />
                        )}
                      </div>
                      <span
                        className={`text-[10px] sm:text-[11px] font-semibold tracking-wide transition-colors ${isComplete ? "text-emerald-600" : "text-slate-400"
                          }`}
                      >
                        {section.label}
                      </span>
                    </div>
                    {!isLast && (
                      <div className="flex-1 mx-2 sm:mx-3 mb-5">
                        <div className="h-[2px] rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ease-out ${isComplete ? "bg-emerald-400 w-full" : "bg-transparent w-0"
                              }`}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {/* Micro text */}
            <div className="mt-2 text-center">
              <span className="text-[11px] text-slate-400">
                {completedCount === 4 ? (
                  <span className="text-emerald-600 font-semibold">✓ All sections complete — ready to submit</span>
                ) : (
                  <>{completedCount} of 4 sections complete</>
                )}
              </span>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} noValidate className="p-5 sm:p-8 md:p-10 space-y-8">
            {/* SECTION 1: CANDIDATE INFORMATION */}
            <div className="space-y-5">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <User size={14} className="text-[#eab308]" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Candidate Information</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">Student details as per school records</p>
                </div>
              </div>

              {/* Student Name */}
              <div id="ssat-field-studentName">
                <label
                  htmlFor="ssat-input-studentName"
                  className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5"
                >
                  Student Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#eab308] transition-colors">
                    <User size={16} />
                  </div>
                  <Input
                    id="ssat-input-studentName"
                    placeholder="Enter student's full name"
                    value={form.studentName}
                    onChange={(e) => handleChange("studentName", e.target.value)}
                    className={`pl-10 h-11 sm:h-12 rounded-xl text-sm sm:text-base bg-slate-50/60 border-slate-200 focus:bg-white focus:border-[#eab308] focus:ring-[#eab308]/20 transition-all ${errors.studentName ? "border-red-400 focus-visible:ring-red-400" : ""
                      }`}
                  />
                </div>
                {errors.studentName && (
                  <p className="flex items-center gap-1 text-red-500 text-xs mt-1.5 font-medium">
                    <AlertCircle size={12} />
                    {errors.studentName}
                  </p>
                )}
              </div>

              {/* School Name & Board Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div id="ssat-field-schoolName" className="sm:col-span-2">
                  <label
                    htmlFor="ssat-input-schoolName"
                    className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5"
                  >
                    Current School Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#eab308] transition-colors">
                      <Building2 size={16} />
                    </div>
                    <Input
                      id="ssat-input-schoolName"
                      placeholder="E.g. St. Xavier's Collegiate School"
                      value={form.schoolName}
                      onChange={(e) => handleChange("schoolName", e.target.value)}
                      className={`pl-10 h-11 sm:h-12 rounded-xl text-sm sm:text-base bg-slate-50/60 border-slate-200 focus:bg-white focus:border-[#eab308] focus:ring-[#eab308]/20 transition-all ${errors.schoolName ? "border-red-400 focus-visible:ring-red-400" : ""
                        }`}
                    />
                  </div>
                  {errors.schoolName && (
                    <p className="flex items-center gap-1 text-red-500 text-xs mt-1.5 font-medium">
                      <AlertCircle size={12} />
                      {errors.schoolName}
                    </p>
                  )}
                </div>

                <div id="ssat-field-board">
                  <label
                    htmlFor="ssat-input-board"
                    className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5"
                  >
                    Board <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <select
                      id="ssat-input-board"
                      value={form.board}
                      onChange={(e) => handleChange("board", e.target.value as Board)}
                      className={`w-full h-11 sm:h-12 pl-3.5 pr-8 rounded-xl text-sm sm:text-base bg-slate-50/60 border text-slate-800 outline-none transition-all appearance-none cursor-pointer focus:bg-white focus:ring-2 focus:ring-[#eab308]/30 focus:border-[#eab308] ${errors.board ? "border-red-400" : "border-slate-200"
                        }`}
                    >
                      <option value="">Select</option>
                      {BOARDS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                      <ChevronDown size={16} />
                    </div>
                  </div>
                  {errors.board && (
                    <p className="flex items-center gap-1 text-red-500 text-xs mt-1.5 font-medium">
                      <AlertCircle size={12} />
                      {errors.board}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 2: CONTACT DETAILS */}
            <div className="space-y-5">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Phone size={14} className="text-blue-600" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Contact Details</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">For exam day communication & updates</p>
                </div>
              </div>

              {/* Mobiles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Student Mobile */}
                <div id="ssat-field-studentMobile">
                  <label
                    htmlFor="ssat-input-studentMobile"
                    className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5"
                  >
                    Student Mobile <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-[11px] font-bold text-slate-500 bg-slate-200/60 px-1.5 py-0.5 rounded group-focus-within:bg-[#eab308]/15 group-focus-within:text-amber-700 transition-colors">
                        +91
                      </span>
                    </div>
                    <Input
                      id="ssat-input-studentMobile"
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={10}
                      placeholder="10-digit number"
                      value={form.studentMobile}
                      onChange={(e) =>
                        handleChange("studentMobile", e.target.value.replace(/\D/g, ""))
                      }
                      className={`pl-14 h-11 sm:h-12 rounded-xl text-sm sm:text-base bg-slate-50/60 border-slate-200 focus:bg-white focus:border-[#eab308] focus:ring-[#eab308]/20 tracking-wide transition-all ${errors.studentMobile ? "border-red-400 focus-visible:ring-red-400" : ""
                        }`}
                    />
                    {form.studentMobile.length === 10 && validateMobile(form.studentMobile) && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <Check size={16} className="text-emerald-500" />
                      </div>
                    )}
                  </div>
                  {errors.studentMobile && (
                    <p className="flex items-center gap-1 text-red-500 text-xs mt-1.5 font-medium">
                      <AlertCircle size={12} />
                      {errors.studentMobile}
                    </p>
                  )}
                </div>

                {/* Parent Mobile */}
                <div id="ssat-field-parentMobile">
                  <label
                    htmlFor="ssat-input-parentMobile"
                    className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5"
                  >
                    Parent / Guardian Mobile <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-[11px] font-bold text-slate-500 bg-slate-200/60 px-1.5 py-0.5 rounded group-focus-within:bg-[#eab308]/15 group-focus-within:text-amber-700 transition-colors">
                        +91
                      </span>
                    </div>
                    <Input
                      id="ssat-input-parentMobile"
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={10}
                      placeholder="10-digit number"
                      value={form.parentMobile}
                      onChange={(e) =>
                        handleChange("parentMobile", e.target.value.replace(/\D/g, ""))
                      }
                      className={`pl-14 h-11 sm:h-12 rounded-xl text-sm sm:text-base bg-slate-50/60 border-slate-200 focus:bg-white focus:border-[#eab308] focus:ring-[#eab308]/20 tracking-wide transition-all ${errors.parentMobile ? "border-red-400 focus-visible:ring-red-400" : ""
                        }`}
                    />
                    {form.parentMobile.length === 10 && validateMobile(form.parentMobile) && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <Check size={16} className="text-emerald-500" />
                      </div>
                    )}
                  </div>
                  {errors.parentMobile && (
                    <p className="flex items-center gap-1 text-red-500 text-xs mt-1.5 font-medium">
                      <AlertCircle size={12} />
                      {errors.parentMobile}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Address */}
              <div id="ssat-field-email">
                <label
                  htmlFor="ssat-input-email"
                  className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5"
                >
                  Email Address{" "}
                  <span className="text-slate-400 font-normal text-xs">(Optional — for exam updates)</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#eab308] transition-colors">
                    <Mail size={16} />
                  </div>
                  <Input
                    id="ssat-input-email"
                    type="email"
                    placeholder="student@example.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`pl-10 h-11 sm:h-12 rounded-xl text-sm sm:text-base bg-slate-50/60 border-slate-200 focus:bg-white focus:border-[#eab308] focus:ring-[#eab308]/20 transition-all ${errors.email ? "border-red-400 focus-visible:ring-red-400" : ""
                      }`}
                  />
                </div>
                {errors.email && (
                  <p className="flex items-center gap-1 text-red-500 text-xs mt-1.5 font-medium">
                    <AlertCircle size={12} />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* SECTION 3: EXAM DATE SELECTION */}
            <div id="ssat-field-examDate" className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Calendar size={14} className="text-purple-600" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Choose Examination Date <span className="text-red-500">*</span>
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Select your preferred slot</p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-1 rounded-full border border-slate-100 flex items-center gap-1">
                  <MapPin size={10} />
                  Offline · Pen & Paper
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {EXAM_DATES.map((item) => {
                  const isSelected = form.examDate === item.date;
                  return (
                    <div
                      key={item.date}
                      id={`ssat-date-btn-${item.date.replace(/\s/g, "-")}`}
                      onClick={() => handleChange("examDate", item.date)}
                      className={`relative p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all duration-200 select-none group ${isSelected
                          ? "border-[#eab308] bg-gradient-to-br from-amber-500/5 to-amber-400/10 shadow-lg shadow-amber-500/10 ring-1 ring-[#eab308]/40"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50 hover:shadow-md"
                        }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${isSelected
                                ? "bg-[#142850] text-[#eab308]"
                                : "bg-slate-100 text-slate-600"
                              }`}
                          >
                            {item.badge}
                          </span>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${item.seats === "Filling Fast"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-emerald-50 text-emerald-700"
                              }`}
                          >
                            {item.seats}
                          </span>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected
                              ? "border-[#eab308] bg-[#eab308] scale-110"
                              : "border-slate-300 bg-white group-hover:border-slate-400"
                            }`}
                        >
                          {isSelected && <Check size={12} className="text-slate-900 stroke-[3]" />}
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className={`font-extrabold text-sm sm:text-base ${isSelected ? "text-[#142850]" : "text-slate-700"}`}>
                          {item.date}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5">
                          <Clock size={12} className="text-slate-400" />
                          <span>{item.day} • {item.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {errors.examDate && (
                <p className="flex items-center gap-1 text-red-500 text-xs mt-1 font-medium">
                  <AlertCircle size={12} />
                  {errors.examDate}
                </p>
              )}
            </div>

            {/* SECTION 4: DECLARATION & CONSENT — FIXED checkbox */}
            <div id="ssat-field-consent" className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <FileText size={14} className="text-emerald-600" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Declaration & Consent</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">Review and accept the terms</p>
                </div>
              </div>

              {/* Terms summary box */}
              <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-4 space-y-2.5">
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <Award size={14} className="text-amber-600 shrink-0 mt-0.5" />
                  <span>Scholarships worth up to <strong className="text-slate-800">₹1,00,000</strong> awarded strictly on merit basis.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <ShieldCheck size={14} className="text-[#142850] shrink-0 mt-0.5" />
                  <span>Candidates must be currently enrolled as <strong className="text-slate-800">Class 10 Science</strong> students.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <FileText size={14} className="text-slate-500 shrink-0 mt-0.5" />
                  <span>By registering, you agree to follow all SSAT examination rules and guidelines.</span>
                </div>
              </div>

              {/* Consent checkbox — uses only onClick on the wrapper div, no conflicting htmlFor */}
              <div
                role="checkbox"
                aria-checked={form.consent}
                tabIndex={0}
                onClick={() => handleChange("consent", !form.consent)}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    handleChange("consent", !form.consent);
                  }
                }}
                className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-200 cursor-pointer select-none flex items-start gap-3.5 ${form.consent
                    ? "bg-emerald-50/50 border-emerald-400/70 shadow-md shadow-emerald-500/10"
                    : errors.consent
                      ? "bg-red-50/40 border-red-300 shadow-sm shadow-red-500/5"
                      : "bg-slate-50/60 border-slate-200 hover:bg-slate-100/50 hover:border-slate-300"
                  }`}
              >
                <div
                  className={`mt-0.5 w-6 h-6 rounded-lg border-2 shrink-0 flex items-center justify-center transition-all duration-200 ${form.consent
                      ? "bg-emerald-500 border-emerald-500 scale-105"
                      : errors.consent
                        ? "border-red-400 bg-white"
                        : "border-slate-300 bg-white"
                    }`}
                >
                  {form.consent && <Check size={14} className="text-white stroke-[3]" />}
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-semibold ${form.consent ? "text-emerald-800" : "text-slate-800"}`}>
                    I confirm my eligibility & accept the terms
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">
                    I declare that I am a Class 10 Science student preparing for Class 11 admission. I agree to adhere to all SSAT examination guidelines and understand that scholarship allocation is strictly merit-based.
                  </p>
                </div>
              </div>
              {errors.consent && (
                <p className="flex items-center gap-1 text-red-500 text-xs font-medium">
                  <AlertCircle size={12} />
                  {errors.consent}
                </p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-2">
              <Button
                id="ssat-submit-btn"
                type="submit"
                disabled={submitting}
                className={`w-full h-12 sm:h-14 text-sm sm:text-base font-bold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer border-0 ${completedCount === 4
                    ? "text-slate-950 bg-gradient-to-r from-[#eab308] via-amber-400 to-[#d4a307] hover:brightness-105 active:scale-[0.99]"
                    : "text-slate-950 bg-gradient-to-r from-[#eab308] via-amber-400 to-[#d4a307] hover:brightness-105 active:scale-[0.99]"
                  }`}
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={19} className="animate-spin text-slate-900" />
                    <span>Processing Registration...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span>Complete Free Registration</span>
                    <Sparkles size={16} className="text-slate-900" />
                  </span>
                )}
              </Button>

              {/* Security trust badge */}
              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck size={12} />
                <span>Your data is secure and used only for SSAT registration purposes.</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SSATRegistration;
