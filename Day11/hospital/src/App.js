import React from "react";


// Reusable Button Component

const Button = ({ label, onClick, type = "primary" }) => {
  const styles = {
    primary: {
      backgroundColor: "#2563eb",
      color: "white",
    },
    secondary: {
      backgroundColor: "#e5e7eb",
      color: "#111827",
    },
    danger: {
      backgroundColor: "#dc2626",
      color: "white",
    },
  };

  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 16px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        marginRight: "10px",
        ...styles[type],
      }}
    >
      {label}
    </button>
  );
};


// Reusable Card Component

const Card = ({ title, children }) => {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        marginBottom: "20px",
      }}
    >
      <h2 style={{ marginBottom: "12px", color: "#1f2937" }}>
        {title}
      </h2>

      {children}
    </div>
  );
};


// Reusable Layout Component

const Layout = ({ children }) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f3f4f6",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <header
        style={{
          backgroundColor: "#1d4ed8",
          color: "white",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "30px",
        }}
      >
        <h1>City Hospital Management System</h1>
      </header>

      {children}
    </div>
  );
};


// Doctor Component

const DoctorCard = ({ doctor }) => {
  return (
    <Card title={doctor.name}>
      <p>
        <strong>Specialization:</strong>{" "}
        {doctor.specialization}
      </p>

      <p>
        <strong>Experience:</strong>{" "}
        {doctor.experience} years
      </p>

      <div style={{ marginTop: "15px" }}>
        <Button
          label="Book Appointment"
          onClick={() =>
            alert(`Appointment booked with ${doctor.name}`)
          }
        />

        <Button
          label="View Profile"
          type="secondary"
          onClick={() =>
            alert(`Viewing ${doctor.name} profile`)
          }
        />
      </div>
    </Card>
  );
};


// Patient Component

const PatientCard = ({ patient }) => {
  return (
    <Card title={patient.name}>
      <p>
        <strong>Age:</strong> {patient.age}
      </p>

      <p>
        <strong>Disease:</strong> {patient.disease}
      </p>

      <div style={{ marginTop: "15px" }}>
        <Button
          label="Check Reports"
          onClick={() =>
            alert(`Opening reports for ${patient.name}`)
          }
        />

        <Button
          label="Discharge"
          type="danger"
          onClick={() =>
            alert(`${patient.name} discharged`)
          }
        />
      </div>
    </Card>
  );
};


// Hospital Dashboard

const HospitalDashboard = () => {
  const doctors = [
    {
      id: 1,
      name: "Dr. Bhushan Jadhav",
      specialization: "Cardiologist",
      experience: 12,
    },
    {
      id: 2,
      name: "Dr. Abhijit Rathore",
      specialization: "Neurologist",
      experience: 9,
    },
  ];

  const patients = [
    {
      id: 1,
      name: "Praful Dalwi",
      age: 45,
      disease: "Heart Disease",
    },
    {
      id: 2,
      name: "Laukik Rupne",
      age: 30,
      disease: "Migraine",
    },
  ];

  return (
    <Layout>
      <h2 style={{ marginBottom: "20px" }}>Doctors</h2>

      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          doctor={doctor}
        />
      ))}

      <h2 style={{ margin: "30px 0 20px" }}>
        Patients
      </h2>

      {patients.map((patient) => (
        <PatientCard
          key={patient.id}
          patient={patient}
        />
      ))}
    </Layout>
  );
};


// Root App Component

export default function App() {
  return <HospitalDashboard />;
}