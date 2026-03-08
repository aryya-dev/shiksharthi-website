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

export default function PreviousPapersPage() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const batch = localStorage.getItem("batch");

  useEffect(() => {
    fetch(`http://localhost:8888/shiksharthi-api/get_papers.php?batch=${batch}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setPapers(data.data);
      });
  }, [batch]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy">
        Previous Question Papers
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {papers.map(p => (
          <div
            key={p.id}
            className="bg-white p-5 rounded-xl shadow"
          >
            <h3 className="font-semibold text-lg text-navy">
              {p.title}
            </h3>

            <p className="text-sm text-slate-500">
              {p.exam_type} • {p.subject}
            </p>

            <p className="text-xs text-slate-400">
              Year: {p.year}
            </p>

            <a
              href={`http://localhost:8888/shiksharthi-api/uploads/${p.file_url}`}
              target="_blank"
              className="text-gold font-semibold mt-3 inline-block"
            >
              Download Paper
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}