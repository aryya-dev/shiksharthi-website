import { Download } from "lucide-react";

const assignments = [
  { id: 1, title: "Electromagnetism Problem Set – 20 Questions", subject: "Physics", deadline: "Mar 3, 2026", status: "Pending" as const },
  { id: 2, title: "Organic Chemistry – Reaction Mechanisms Worksheet", subject: "Chemistry", deadline: "Mar 5, 2026", status: "Pending" as const },
  { id: 3, title: "Differential Equations – Practice Sheet", subject: "Maths", deadline: "Feb 28, 2026", status: "Overdue" as const },
  { id: 4, title: "Newton's Laws Application Problems", subject: "Physics", deadline: "Feb 20, 2026", status: "Submitted" as const },
  { id: 5, title: "Genetics Crossword & Diagram Sheet", subject: "Biology", deadline: "Feb 18, 2026", status: "Submitted" as const },
];

const statusClass: Record<string, string> = {
  Pending: "status-pending",
  Overdue: "status-overdue",
  Submitted: "status-completed",
};

export default function Assignments() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Assignments</h1>
        <p className="text-sm text-muted-foreground mt-1">Track and download your assignments</p>
      </div>

      <div className="space-y-3">
        {assignments.map((a) => (
          <div key={a.id} className="card-academic flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="badge-subject">{a.subject}</span>
                <span className={statusClass[a.status]}>{a.status}</span>
              </div>
              <h3 className="mt-2 text-sm font-semibold text-foreground">{a.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">Deadline: {a.deadline}</p>
            </div>
            <button className="btn-gold flex items-center gap-2 shrink-0 self-start sm:self-center text-xs py-2 px-4">
              <Download className="h-3.5 w-3.5" />
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}