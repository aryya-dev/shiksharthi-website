import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Eye,
  EyeOff,
  ArrowLeftCircle,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "http://localhost:8888/shiksharthi-api/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: rollNumber,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("role", data.role);
        localStorage.setItem("name", data.name);

        if (data.role === "admin") {
          navigate("/portal/admin-dashboard");
        } else {
          navigate("/portal/dashboard");
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again.");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-navy p-4">

      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 z-20">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white hover:text-navy"
        >
          <ArrowLeftCircle className="h-5 w-5" />
          Back to Home
        </button>
      </div>

      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative w-full max-w-md">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10 border border-gold/30">
            <GraduationCap className="h-8 w-8 text-gold" />
          </div>

          <h1 className="text-3xl font-bold text-white">Shiksharthi</h1>

          <p className="mt-2 text-sm tracking-wider uppercase text-white/70 font-medium">
            Academic Institute · Kolkata
          </p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-2xl">
          <h2 className="text-center text-xl font-semibold text-navy mb-1">
            Student Portal
          </h2>

          <p className="mb-6 text-center text-sm text-gray-600">
            Sign in to access your dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-navy">
                Roll Number / Email
              </label>

              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="admin@shiksharthi.org"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-navy outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-navy">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-navy outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-navy"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-gold py-3 text-navy font-semibold shadow-md hover:bg-gold/90 transition duration-200"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Forgot your password?{" "}
            <a
              href="https://wa.me/919007063109"  
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold hover:underline"
            >
              Contact Admin
            </a>
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-white/60">
          © 2026 Shiksharthi Academic Institute. All rights reserved.
        </p>
      </div>
    </div>
  );
}