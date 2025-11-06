import axios from "axios";
import { supabase } from "./supabase";

// Gemini AI client
const GEMINI_API_URL = "https://api.generativeai.google/v1beta2/models/gemini-1.5/outputs";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

/**
 * Analyze students for a given subject using Gemini AI
 * @param {string} subjectId
 * @returns {Promise<Object>} JSON with analysis, passedStudents, failedStudents
 */
export async function studentsAnalyzer(subjectId) {
  try {
    // 1️⃣ Fetch students and grades filtered by subject
    const { data: gradesData, error } = await supabase
      .from("grades")
      .select(`
        id,
        student_id,
        student:students(name),
        prelim,
        midterm,
        semifinal,
        final
      `)
      .eq("subject_id", subjectId);

    if (error) throw error;

    if (!gradesData || gradesData.length === 0) {
      return {
        analysis: "No data found for this subject.",
        passedStudents: [],
        failedStudents: [],
      };
    }

    // 2️⃣ Convert data to string for AI input
    const payloadText = gradesData
      .map(
        (g) =>
          `${g.student.name}: Prelim=${g.prelim}, Midterm=${g.midterm}, Semifinal=${g.semifinal}, Final=${g.final}`
      )
      .join("\n");

    // 3️⃣ Send to Gemini API
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${API_KEY}`,
      {
        prompt: `Analyze the following students' grades for subject ${subjectId} and return a JSON with keys "analysis", "passedStudents", and "failedStudents". Consider passing grade = 75.\n\n${payloadText}`,
        temperature: 0.7,
        max_output_tokens: 500,
      }
    );

    const aiText = response.data?.candidates?.[0]?.content?.[0]?.text;

    if (!aiText) throw new Error("No response from Gemini API");

    // 4️⃣ Parse JSON returned by Gemini
    const json = JSON.parse(aiText);

    return json;
  } catch (err) {
    console.error("studentsAnalyzer error:", err.message);
    return {
      analysis: "Error analyzing data.",
      passedStudents: [],
      failedStudents: [],
    };
  }
}
