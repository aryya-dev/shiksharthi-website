import { useEffect, useState } from "react";

interface Paper {
  id: number;
  title: string;
  exam_type: string;
  subject: string;
  batch: string;
  year: number;
  file_url: string;
}

export default function UploadPapers() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    exam_type: "Mock Test",
    subject: "",
    batch: "NEET",
    year: new Date().getFullYear(),
  });

  const [file, setFile] = useState<File | null>(null);

  const adminId = localStorage.getItem("user_id");

  const fetchPapers = async () => {
    const res = await fetch(
      "http://localhost:8888/shiksharthi-api/get_papers.php"
    );
    const data = await res.json();
    if (data.success) setPapers(data.data);
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("exam_type", form.exam_type);
    formData.append("subject", form.subject);
    formData.append("batch", form.batch);
    formData.append("year", String(form.year));
    formData.append("uploaded_by", adminId || "");
    formData.append("file", file);

    const res = await fetch(
      "http://localhost:8888/shiksharthi-api/upload_paper.php",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      alert("Paper uploaded successfully");
      setForm({
        title: "",
        exam_type: "Mock Test",
        subject: "",
        batch: "NEET",
        year: new Date().getFullYear(),
      });
      setFile(null);
      fetchPapers();
    } else {
      alert("Upload failed");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this paper?")) return;

    const res = await fetch(
      "http://localhost:8888/shiksharthi-api/delete_paper.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      }
    );

    const data = await res.json();

    if (data.success) {
      fetchPapers();
    }
  };

  return (
    <div className="space-y-10 animate-fade-in">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-navy">
          Upload Previous Question Paper
        </h1>
        <div className="w-16 h-1 bg-gold rounded-full mt-2" />
      </div>

      {/* Upload Form */}
      <form
        onSubmit={handleUpload}
        className="bg-white p-6 rounded-xl shadow-md grid md:grid-cols-2 gap-6"
      >
        <input
          type="text"
          placeholder="Paper Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="border p-3 rounded-lg"
        />

        <select
          value={form.exam_type}
          onChange={(e) =>
            setForm({ ...form, exam_type: e.target.value })
          }
          className="border p-3 rounded-lg"
        >
          <option>Mock Test</option>
          <option>Periodic Test</option>
          <option>Full Syllabus Test</option>
        </select>

        <input
          type="text"
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="border p-3 rounded-lg"
        />

        <select
          value={form.batch}
          onChange={(e) => setForm({ ...form, batch: e.target.value })}
          className="border p-3 rounded-lg"
        >
          <option>NEET</option>
          <option>JEE</option>
          <option>Boards</option>
        </select>

        <input
          type="number"
          value={form.year}
          onChange={(e) =>
            setForm({ ...form, year: Number(e.target.value) })
          }
          className="border p-3 rounded-lg"
        />

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
          className="border p-3 rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 bg-gold text-navy font-semibold py-3 rounded-lg hover:bg-gold/90 transition"
        >
          {loading ? "Uploading..." : "Upload Paper"}
        </button>
      </form>

      {/* Papers List */}
      <div>
        <h2 className="text-xl font-semibold text-navy mb-4">
          Uploaded Papers
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {papers.map((paper) => (
            <div
              key={paper.id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg text-navy">
                {paper.title}
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                {paper.exam_type} • {paper.subject}
              </p>

              <p className="text-xs text-slate-400 mt-1">
                {paper.batch} • {paper.year}
              </p>

              <div className="flex justify-between items-center mt-4">
                <a
                  href={`http://localhost:8888/shiksharthi-api/uploads/${paper.file_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-gold hover:underline"
                >
                  View
                </a>

                <button
                  onClick={() => handleDelete(paper.id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}