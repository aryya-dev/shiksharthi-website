const scores = [
  { subject: "Physics", test: "Unit Test – Mechanics", marks: "87 / 100", percentage: "87%" },
  { subject: "Chemistry", test: "Organic Chemistry – Midterm", marks: "92 / 100", percentage: "92%" },
  { subject: "Maths", test: "Calculus & Algebra", marks: "78 / 100", percentage: "78%" },
  { subject: "Physics", test: "Wave Optics Quiz", marks: "45 / 50", percentage: "90%" },
  { subject: "Biology", test: "Genetics Unit Test", marks: "82 / 100", percentage: "82%" },
  { subject: "Chemistry", test: "Chemical Kinetics Quiz", marks: "38 / 50", percentage: "76%" },
];

export default function Scores() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Scores</h1>
        <p className="text-sm text-muted-foreground mt-1">Your test results and performance</p>
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block card-academic overflow-hidden !p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="px-6 py-3 text-left font-semibold text-foreground">Subject</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Test Name</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Marks</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="px-6 py-4">
                  <span className="badge-subject">{s.subject}</span>
                </td>
                <td className="px-6 py-4 text-foreground font-medium">{s.test}</td>
                <td className="px-6 py-4 text-foreground">{s.marks}</td>
                <td className="px-6 py-4 font-semibold text-gold">{s.percentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {scores.map((s, i) => (
          <div key={i} className="card-academic">
            <div className="flex items-center justify-between">
              <span className="badge-subject">{s.subject}</span>
              <span className="text-lg font-bold text-gold">{s.percentage}</span>
            </div>
            <p className="mt-2 text-sm font-medium text-foreground">{s.test}</p>
            <p className="text-xs text-muted-foreground mt-1">Marks: {s.marks}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
