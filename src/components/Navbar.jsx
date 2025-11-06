import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-indigo-950 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <h1 className="font-bold text-xl text-pink-500">StudentPortal</h1>
      <div className="flex gap-4">
        <Link className="hover:text-pink-400" to="/">Home</Link>
        <Link className="hover:text-pink-400" to="/students">Students</Link>
        <Link className="hover:text-pink-400" to="/subjects">Subjects</Link>
        <Link className="hover:text-pink-400" to="/grades">Grades</Link>
      </div>
    </nav>
  );
}
