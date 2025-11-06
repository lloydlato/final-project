import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { studentsAnalyzer } from "../lib/ai";
import GradesReport from "../components/GradesReport";

export default function GradesPage() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [grades, setGrades] = useState([]);
  const [analysisData, setAnalysisData] = useState(null);

  // Fetch subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      const { data, error } = await supabase.from("subjects").select("*");
      if (!error) setSubjects(data);
    };
    fetchSubjects();
  }, []);

  // Fetch grades for selected subject
  const fetchGrades = async (subjectId) => {
    setSelectedSubject(subjects.find((s) => s.id === subjectId));
    const { data, error } = await supabase
      .from("grades")
      .select("id, student:students(name), prelim, midterm, semifinal, final")
      .eq("subject_id", subjectId);
    if (!error) setGrades(data);
  };

  const handleAnalyze = async () => {
    if (!selectedSubject) return;
    const data = await studentsAnalyzer(selectedSubject.id);
    setAnalysisData(data);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-pink-500 mb-6">Grades Management</h2>

      <select
        className="mb-4 px-4 py-2 rounded-md border border-indigo-700 bg-indigo-900 text-white"
        onChange={(e) => fetchGrades(Number(e.target.value))}
      >
        <option value="">Select Subject</option>
        {subjects.map((subj) => (
          <option key={subj.id} value={subj.id}>
            {subj.name}
          </option>
        ))}
      </select>

      {/* Grades Table */}
      {grades.length > 0 && (
        <table className="min-w-full bg-indigo-900/30 text-white rounded-lg mb-4">
          <thead>
            <tr className="border-b border-indigo-700">
              <th className="px-4 py-2">Student</th>
              <th className="px-4 py-2">Prelim</th>
              <th className="px-4 py-2">Midterm</th>
              <th className="px-4 py-2">Semifinal</th>
              <th className="px-4 py-2">Final</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((g) => (
              <tr key={g.id} className="border-b border-indigo-800 hover:bg-indigo-800/40">
                <td className="px-4 py-2">{g.student.name}</td>
                <td className="px-4 py-2">{g.prelim}</td>
                <td className="px-4 py-2">{g.midterm}</td>
                <td className="px-4 py-2">{g.semifinal}</td>
                <td className="px-4 py-2">{g.final}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        onClick={handleAnalyze}
        className="bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-2 rounded-full hover:scale-105 transition mb-4"
      >
        Generate AI Analysis Report
      </button>

      {/* Render PDF Report */}
      {selectedSubject && grades.length > 0 && analysisData && (
        <GradesReport
          subject={selectedSubject}
          grades={grades}
          analysisData={analysisData}
        />
      )}
    </div>
  );
}
