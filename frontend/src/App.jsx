import React from 'react';
import PatientForm from "./components/PatientForm";
import PatientList from "./components/PatientList";
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Patient Management System
      </h1>

      <PatientForm />
      <PatientList />
    </div>
  );
}
