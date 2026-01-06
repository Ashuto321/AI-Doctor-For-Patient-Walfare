import React, { useState } from "react";
import axios from "axios";

export default function PatientForm() {
  const [formData, setFormData] = useState({ name: "", age: "", weight: "", height: "", gender: "Male" });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/add", formData).then(() => alert("Patient Added!"));
  };

  return (
    <div className="flex justify-center items-center py-10">
      {/* Outer Glow Container */}
      <div className="p-[2px] rounded-3xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 shadow-2xl">
        
        {/* The Glass Form */}
        <form onSubmit={handleSubmit} className="glass-card p-10 rounded-[22px] w-96 flex flex-col gap-5">
          <h2 className="text-3xl font-black text-white text-center mb-2 tracking-tight">Register</h2>
          
          <div className="space-y-4">
            <input 
              className="w-full bg-white/20 border border-white/30 p-3 rounded-xl text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white/50 transition-all"
              placeholder="Full Name"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            
            <div className="flex gap-2">
              <input 
                className="w-1/2 bg-white/20 border border-white/30 p-3 rounded-xl text-white placeholder-white/70 outline-none"
                placeholder="Age" type="number"
                onChange={(e) => setFormData({...formData, age: e.target.value})}
              />
              <select 
                className="w-1/2 bg-white/20 border border-white/30 p-3 rounded-xl text-white outline-none"
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
              >
                <option className="text-gray-800" value="Male">Male</option>
                <option className="text-gray-800" value="Female">Female</option>
              </select>
            </div>

            <input 
              className="w-full bg-white/20 border border-white/30 p-3 rounded-xl text-white placeholder-white/70 outline-none"
              placeholder="Weight (kg)" type="number"
              onChange={(e) => setFormData({...formData, weight: e.target.value})}
            />
            <input 
              className="w-full bg-white/20 border border-white/30 p-3 rounded-xl text-white placeholder-white/70 outline-none"
              placeholder="Height (cm)" type="number"
              onChange={(e) => setFormData({...formData, height: e.target.value})}
            />
          </div>

          <button className="mt-4 py-4 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:bg-indigo-50 hover:scale-[1.02] active:scale-95 transition-all">
            Analyze Health →
          </button>
        </form>
      </div>
    </div>
  );
}