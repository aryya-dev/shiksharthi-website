import { useEffect, useState } from "react";

interface Student {
  id: number;
  name: string;
  email: string;
  roll_number: string;
  batch: string;
  section: string | null;
  year: number;
}

export default function ManageStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    email: "",
    password: "",
    roll_number: "",
    batch: "NEET",
    section: "A",
    year: 2026,
  });

  const fetchStudents = () => {
    fetch("http://localhost:8888/shiksharthi-api/get_students.php")
      .then(res => res.json())
      .then(data => {
        if (data.success) setStudents(data.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const openEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      id: student.id,
      name: student.name,
      email: student.email,
      password: "",
      roll_number: student.roll_number,
      batch: student.batch,
      section: student.section || "A",
      year: student.year,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const url = editingStudent
      ? "http://localhost:8888/shiksharthi-api/update_student.php"
      : "http://localhost:8888/shiksharthi-api/add_student.php";

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setShowModal(false);
          setEditingStudent(null);
          fetchStudents();
        } else {
          alert(data.message);
        }
      });
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this student?")) return;

    fetch("http://localhost:8888/shiksharthi-api/delete_student.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) fetchStudents();
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-navy">Manage Students</h1>
        <button
          onClick={() => {
            setEditingStudent(null);
            setFormData({
              id: 0,
              name: "",
              email: "",
              password: "",
              roll_number: "",
              batch: "NEET",
              section: "A",
              year: 2026,
            });
            setShowModal(true);
          }}
          className="px-4 py-2 bg-gold text-navy rounded-lg font-semibold"
        >
          + Add Student
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-left">
          <thead className="bg-slate-100 text-sm">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Roll</th>
              <th className="p-4">Batch</th>
              <th className="p-4">Section</th>
              <th className="p-4">Year</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-t hover:bg-slate-50">
                <td className="p-4">{s.name}</td>
                <td className="p-4">{s.email}</td>
                <td className="p-4">{s.roll_number}</td>
                <td className="p-4">{s.batch}</td>
                <td className="p-4">{s.section || "-"}</td>
                <td className="p-4">{s.year}</td>
                <td className="p-4">
  <div className="flex items-center gap-2">

    <button
      onClick={() => openEdit(s)}
      className="px-3 py-1.5 text-xs font-semibold rounded-md 
                 bg-blue-50 text-blue-700 
                 hover:bg-blue-100 transition duration-150"
    >
      Edit
    </button>

    <button
      onClick={() => handleDelete(s.id)}
      className="px-3 py-1.5 text-xs font-semibold rounded-md 
                 bg-red-50 text-red-600 
                 hover:bg-red-100 transition duration-150"
    >
      Delete
    </button>

  </div>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingStudent ? "Edit Student" : "Add Student"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">

              <input
                type="text"
                value={formData.name}
                required
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <input
                type="email"
                value={formData.email}
                required
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              {!editingStudent && (
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full border p-2 rounded"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              )}

              <input
                type="text"
                value={formData.roll_number}
                required
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  setFormData({ ...formData, roll_number: e.target.value })
                }
              />

              <select
                value={formData.batch}
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  setFormData({ ...formData, batch: e.target.value })
                }
              >
                <option>NEET</option>
                <option>JEE</option>
                <option>Boards</option>
              </select>

              <select
                value={formData.section}
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  setFormData({ ...formData, section: e.target.value })
                }
              >
                <option>A</option>
                <option>B</option>
              </select>

              <input
                type="number"
                value={formData.year}
                required
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  setFormData({ ...formData, year: Number(e.target.value) })
                }
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingStudent(null);
                  }}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-gold text-navy rounded"
                >
                  {editingStudent ? "Update" : "Save"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}