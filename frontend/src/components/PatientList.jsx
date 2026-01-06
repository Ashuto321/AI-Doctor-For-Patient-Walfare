import React, { useState, useEffect } from "react";
import axios from "axios";
import DoctorBotModal from "./DoctorBotModal";

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAdvice, setCurrentAdvice] = useState("");

  const fetchPatients = () => {
    axios.get("http://127.0.0.1:8000/view").then((res) => {
      setPatients(Object.entries(res.data));
    });
  };

  useEffect(() => { fetchPatients(); }, []);

  const getAdvice = async (id) => {
    const res = await axios.get(`http://127.0.0.1:8000/ai-advice/${id}`);
    setCurrentAdvice(res.data.advice);
    setIsModalOpen(true);
  };

  return (
    <div className="mt-10">
      <DoctorBotModal 
        isOpen={isModalOpen} 
        message={currentAdvice} 
        onClose={() => setIsModalOpen(false)} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map(([id, p]) => (
          <div key={id} className="group bg-white/50 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-indigo-200/50 transition-all border-b-4 border-b-indigo-500">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">{p.name}</h3>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <p>Age: <span className="font-bold">{p.age}</span></p>
              <p>BMI: <span className={`font-bold ${p.bmi > 25 ? 'text-red-500' : 'text-green-500'}`}>{p.bmi}</span></p>
              <p className="uppercase text-xs font-black tracking-widest text-indigo-400">{p.verdict}</p>
            </div>
            
            <button 
              onClick={() => getAdvice(id)}
              className="mt-6 w-full flex items-center justify-center gap-2 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-bold hover:bg-indigo-600 hover:text-white transition-all border border-indigo-100"
            >
              🤖 Ask Doctor Bot
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}