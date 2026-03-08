const tests = [
  { subject: "Physics", date: "Mar 1, 2026", syllabus: "Electromagnetism, Wave Optics", status: "Upcoming" as const },
  { subject: "Chemistry", date: "Mar 5, 2026", syllabus: "Organic Chemistry – Full", status: "Upcoming" as const },
  { subject: "Maths", date: "Mar 10, 2026", syllabus: "Differential Equations, Matrices", status: "Upcoming" as const },
  { subject: "Physics", date: "Feb 18, 2026", syllabus: "Mechanics – Newton's Laws", status: "Completed" as const },
  { subject: "Chemistry", date: "Feb 12, 2026", syllabus: "Chemical Kinetics", status: "Completed" as const },
  { subject: "Biology", date: "Feb 8, 2026", syllabus: "Genetics & Evolution", status: "Completed" as const },
];

export default function TestSchedule() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Test Schedule</h1>
        <p className="text-sm text-muted-foreground mt-1">Upcoming and past examinations</p>
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block card-academic overflow-hidden !p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="px-6 py-3 text-left font-semibold text-foreground">Subject</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Date</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Syllabus</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="px-6 py-4 font-medium text-foreground">{test.subject}</td>
                <td className="px-6 py-4 text-muted-foreground">{test.date}</td>
                <td className="px-6 py-4 text-muted-foreground">{test.syllabus}</td>
                <td className="px-6 py-4">
                  <span className={test.status === "Upcoming" ? "status-upcoming" : "status-completed"}>
                    {test.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {tests.map((test, i) => (
          <div key={i} className="card-academic">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-foreground">{test.subject}</p>
                <p className="text-xs text-muted-foreground mt-1">{test.date}</p>
              </div>
              <span className={test.status === "Upcoming" ? "status-upcoming" : "status-completed"}>
                {test.status}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{test.syllabus}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
