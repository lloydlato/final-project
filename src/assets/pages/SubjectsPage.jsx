import React, { useState } from "react";

export default function Subjects() {
  const [subjects, setSubjects] = useState([
    { id: 1, name: "Mathematics", code: "MATH101", description: "Basic concepts of mathematics" },
    { id: 2, name: "Physics", code: "PHY102", description: "Fundamentals of physics" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [form, setForm] = useState({ name: "", code: "", description: "" });

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Open modal for Add or Edit
  const openModal = (subject = null) => {
    if (subject) {
      setEditingSubject(subject);
      setForm(subject);
    } else {
      setEditingSubject(null);
      setForm({ name: "", code: "", description: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // Save subject (Add or Edit)
  const handleSave = (e) => {
    e.preventDefault();

    if (editingSubject) {
      setSubjects(
        subjects.map((s) =>
          s.id === editingSubject.id ? { ...editingSubject, ...form } : s
        )
      );
    } else {
      const newSubject = { id: Date.now(), ...form };
      setSubjects([...subjects, newSubject]);
    }

    closeModal();
  };

  // Delete subject
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      setSubjects(subjects.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-black text-white p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-pink-500 tracking-wide">
          Subjects Management
        </h2>
        <button
          onClick={() => openModal()}
          className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-2 rounded-full font-semibold hover:scale-105 transform transition"
        >
          + Add Subject
        </button>
      </div>

      {/* Subjects Table */}
      <div className="overflow-x-auto bg-indigo-900/30 backdrop-blur-lg rounded-lg shadow-lg border border-indigo-800">
        <table className="min-w-full text-left text-gray-200">
          <thead className="bg-indigo-800 text-pink-400 uppercase text-sm tracking-wider">
            <tr>
              <th className="px-6 py-4">Subject Name</th>
              <th className="px-6 py-4">Code</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.length > 0 ? (
              subjects.map((subject) => (
                <tr
                  key={subject.id}
                  className="hover:bg-indigo-800/40 border-b border-indigo-700"
                >
                  <td className="px-6 py-4">{subject.name}</td>
                  <td className="px-6 py-4">{subject.code}</td>
                  <td className="px-6 py-4">{subject.description}</td>
                  <td className="px-6 py-4 flex justify-end gap-3">
                    <button
                      onClick={() => openModal(subject)}
                      className="bg-purple-600 hover:bg-purple-700 px-4 py-1 rounded-full text-sm transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(subject.id)}
                      className="bg-pink-600 hover:bg-pink-700 px-4 py-1 rounded-full text-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-400">
                  No subjects available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-indigo-950 p-8 rounded-xl w-full max-w-md shadow-xl border border-indigo-700">
            <h3 className="text-2xl font-semibold mb-6 text-pink-400">
              {editingSubject ? "Edit Subject" : "Add Subject"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Subject Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md bg-indigo-900 border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">Code</label>
                <input
                  type="text"
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md bg-indigo-900 border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  required
                  className="w-full px-4 py-2 rounded-md bg-indigo-900 border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 rounded-full bg-gray-600 hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 font-semibold"
                >
                  {editingSubject ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
