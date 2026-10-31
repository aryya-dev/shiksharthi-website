import { useState, useMemo } from "react";
import { addRegistration } from "@/lib/ssatDatabase";
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

  // SUCCESS CONFIRMATION SLIP
  if (success) {
    return (
      <section id="ssat-register" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-gray-100/70 to-slate-50">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden transition-all">
            {/* Top decorative header */}
            <div className="bg-[#142850] text-white px-6 py-8 text-center relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-36 h-36 bg-[#eab308]/15 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -left-12 -bottom-12 w-36 h-36 bg-[#eab308]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 mb-3.5">
                <CheckCircle2 size={30} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Registration Confirmed!</h2>
              <p className="text-white/70 text-xs sm:text-sm mt-1 max-w-sm mx-auto">
                Shiksharthi Scholarship Admission Test (SSAT 2026)
              </p>
            </div>

            {/* Slip content */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Registration ID Banner */}
              <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-amber-500/10 border border-amber-300/60 rounded-xl p-4 sm:p-5 text-center">
                <span className="text-[11px] font-bold tracking-widest uppercase text-amber-800">
                  Your Official Registration ID
                </span>
                <div className="flex items-center justify-center gap-3 mt-1.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#142850] font-mono tracking-wider">
                    {success.regId}
                  </span>
                  <button
                    type="button"
                    onClick={copyRegId}
                    aria-label="Copy Registration ID"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-amber-300/80 text-xs font-semibold text-slate-700 hover:bg-amber-50 active:scale-95 transition-all shadow-xs cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} className="text-amber-600" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Take a screenshot or save this number for exam day admit verification.
                </p>
              </div>

              {/* Student details summary */}
              <div className="rounded-xl border border-slate-200 divide-y divide-slate-100 text-sm">
                <div className="flex justify-between items-center py-2.5 px-4 bg-slate-50/60">
                  <span className="text-xs text-slate-500 font-medium">Candidate Name</span>
                  <span className="font-semibold text-slate-800 text-right">{success.studentName}</span>
                </div>
                <div className="flex justify-between items-center py-2.5 px-4">
                  <span className="text-xs text-slate-500 font-medium">Target Standard</span>
                  <span className="font-semibold text-slate-800 text-right">Class 10 Science</span>
                </div>
                <div className="flex justify-between items-center py-2.5 px-4 bg-slate-50/60">
                  <span className="text-xs text-slate-500 font-medium">School & Board</span>
                  <span className="font-semibold text-slate-800 text-right truncate max-w-[200px]">
                    {success.schoolName} ({success.board})
                  </span>
                </div>
                <div className="flex justify-between items-center py-2.5 px-4">
                  <span className="text-xs text-slate-500 font-medium">Examination Date</span>
                  <span className="font-bold text-[#142850] text-right">{success.examDate}</span>
                </div>
                <div className="flex justify-between items-center py-2.5 px-4 bg-slate-50/60">
                  <span className="text-xs text-slate-500 font-medium">Exam Timing</span>
                  <span className="font-semibold text-slate-800 text-right">11:00 AM – 1:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2.5 px-4 bg-slate-50/60">
                  <span className="text-xs text-slate-500 font-medium">Registered Contact</span>
                  <span className="font-semibold text-slate-800 text-right">
                    {success.studentMobile}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2.5 px-4">
                  <span className="text-xs text-slate-500 font-medium">Mode & Venue</span>
                  <span className="font-semibold text-[#142850] text-right">
                    Offline • Shiksharthi Campus
                  </span>
                </div>
              </div>

              {/* Notice Box */}
              <div className="flex items-start gap-3 p-3.5 bg-blue-50/80 border border-blue-100 rounded-xl text-xs text-slate-700 leading-relaxed">
                <ShieldCheck size={18} className="text-[#142850] shrink-0 mt-0.5" />
                <span>
                  Your registration is recorded. Please arrive at the examination venue at least <strong>30 minutes</strong> before 11:00 AM. Bring a printed or digital copy of this Registration ID along with your school ID card.
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  type="button"
                  onClick={() => window.print()}
                  variant="outline"
                  className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold rounded-xl h-11 cursor-pointer"
                >
                  <Printer size={16} className="mr-2 text-slate-500" />
                  Print / Save Pass
                </Button>
                <Button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-[#142850] hover:bg-[#0f1f3d] text-white font-semibold rounded-xl h-11 cursor-pointer"
                >
                  Register Another Student
                </Button>
              </div>
            </div>
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
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isComplete
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
                        className={`text-[10px] sm:text-[11px] font-semibold tracking-wide transition-colors ${
                          isComplete ? "text-emerald-600" : "text-slate-400"
                        }`}
                      >
                        {section.label}
                      </span>
                    </div>
                    {!isLast && (
                      <div className="flex-1 mx-2 sm:mx-3 mb-5">
                        <div className="h-[2px] rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ease-out ${
                              isComplete ? "bg-emerald-400 w-full" : "bg-transparent w-0"
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
                    className={`pl-10 h-11 sm:h-12 rounded-xl text-sm sm:text-base bg-slate-50/60 border-slate-200 focus:bg-white focus:border-[#eab308] focus:ring-[#eab308]/20 transition-all ${
                      errors.studentName ? "border-red-400 focus-visible:ring-red-400" : ""
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
                      className={`pl-10 h-11 sm:h-12 rounded-xl text-sm sm:text-base bg-slate-50/60 border-slate-200 focus:bg-white focus:border-[#eab308] focus:ring-[#eab308]/20 transition-all ${
                        errors.schoolName ? "border-red-400 focus-visible:ring-red-400" : ""
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
                      className={`w-full h-11 sm:h-12 pl-3.5 pr-8 rounded-xl text-sm sm:text-base bg-slate-50/60 border text-slate-800 outline-none transition-all appearance-none cursor-pointer focus:bg-white focus:ring-2 focus:ring-[#eab308]/30 focus:border-[#eab308] ${
                        errors.board ? "border-red-400" : "border-slate-200"
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
                      className={`pl-14 h-11 sm:h-12 rounded-xl text-sm sm:text-base bg-slate-50/60 border-slate-200 focus:bg-white focus:border-[#eab308] focus:ring-[#eab308]/20 tracking-wide transition-all ${
                        errors.studentMobile ? "border-red-400 focus-visible:ring-red-400" : ""
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
                      className={`pl-14 h-11 sm:h-12 rounded-xl text-sm sm:text-base bg-slate-50/60 border-slate-200 focus:bg-white focus:border-[#eab308] focus:ring-[#eab308]/20 tracking-wide transition-all ${
                        errors.parentMobile ? "border-red-400 focus-visible:ring-red-400" : ""
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
                    className={`pl-10 h-11 sm:h-12 rounded-xl text-sm sm:text-base bg-slate-50/60 border-slate-200 focus:bg-white focus:border-[#eab308] focus:ring-[#eab308]/20 transition-all ${
                      errors.email ? "border-red-400 focus-visible:ring-red-400" : ""
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
                      className={`relative p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all duration-200 select-none group ${
                        isSelected
                          ? "border-[#eab308] bg-gradient-to-br from-amber-500/5 to-amber-400/10 shadow-lg shadow-amber-500/10 ring-1 ring-[#eab308]/40"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              isSelected
                                ? "bg-[#142850] text-[#eab308]"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {item.badge}
                          </span>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              item.seats === "Filling Fast"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-emerald-50 text-emerald-700"
                            }`}
                          >
                            {item.seats}
                          </span>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected
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
                className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-200 cursor-pointer select-none flex items-start gap-3.5 ${
                  form.consent
                    ? "bg-emerald-50/50 border-emerald-400/70 shadow-md shadow-emerald-500/10"
                    : errors.consent
                      ? "bg-red-50/40 border-red-300 shadow-sm shadow-red-500/5"
                      : "bg-slate-50/60 border-slate-200 hover:bg-slate-100/50 hover:border-slate-300"
                }`}
              >
                <div
                  className={`mt-0.5 w-6 h-6 rounded-lg border-2 shrink-0 flex items-center justify-center transition-all duration-200 ${
                    form.consent
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
                className={`w-full h-12 sm:h-14 text-sm sm:text-base font-bold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer border-0 ${
                  completedCount === 4
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
