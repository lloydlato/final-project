import React, { useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner.jsx";

export default function StudentsPage() {
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", course: "CS" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", course: "IT" },
  ]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", course: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const openModal = (student = null) => {
    if (student) {
      setEditingStudent(student);
      setForm(student);
    } else {
      setEditingStudent(null);
      setForm({ name: "", email: "", course: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (editingStudent) {
        setStudents(students.map((s) => s.id === editingStudent.id ? { ...editingStudent, ...form } : s));
        toast.success("Student updated successfully!");
      } else {
        setStudents([...students, { id: Date.now(), ...form }]);
        toast.success("Student added successfully!");
      }
      setIsModalOpen(false);
      setEditingStudent(null);
      setForm({ name: "", email: "", course: "" });
      setLoading(false);
    }, 500);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((s) => s.id !== id));
      toast.success("Student deleted successfully!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-pink-500">Students Management</h2>
        <button onClick={() => openModal()} className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-2 rounded-full font-semibold hover:scale-105 transform transition">
          + Add Student
        </button>
      </div>

      {loading ? <Spinner /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <div key={student.id} className="bg-indigo-900/50 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-indigo-700 hover:scale-105 transition">
              <h3 className="text-lg font-bold text-pink-400">{student.name}</h3>
              <p>Email: {student.email}</p>
              <p>Course: {student.course}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => openModal(student)} className="bg-purple-600 px-3 py-1 rounded-full hover:bg-purple-700">Edit</button>
                <button onClick={() => handleDelete(student.id)} className="bg-pink-600 px-3 py-1 rounded-full hover:bg-pink-700">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50" onClick={closeModal}>
          <div className="bg-indigo-950 p-8 rounded-xl w-full max-w-md shadow-xl border border-indigo-700" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-semibold mb-6 text-pink-400">{editingStudent ? "Edit Student" : "Add Student"}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="w-full px-4 py-2 rounded-md bg-indigo-900 border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-pink-500" />
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required className="w-full px-4 py-2 rounded-md bg-indigo-900 border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-pink-500" />
              <input type="text" name="course" value={form.course} onChange={handleChange} placeholder="Course" required className="w-full px-4 py-2 rounded-md bg-indigo-900 border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-pink-500" />

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={closeModal} className="px-5 py-2 rounded-full bg-gray-600 hover:bg-gray-700 transition">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 font-semibold">{editingStudent ? "Update" : "Add"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
