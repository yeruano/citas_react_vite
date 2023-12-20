import { useEffect, useState } from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import PatientList from "./components/PatientList";

function App() {
  const [patients, setPatients] = useState([])
  const [patient, setPatient] = useState({})

  useEffect(() => {
    const getLocalStorage = () => {
      const patientsLocalStorage = JSON.parse(localStorage.getItem("patients")) ?? []
      setPatients(patientsLocalStorage)
    }
    getLocalStorage()
  }, [])

  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients))
  }, [patients])

  const deletePatient = patientId => {
    const updatedPatients = patients.filter(patient => patient.id !== patientId)
    setPatients(updatedPatients)
  }

  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex">
        <Form
          patients={patients}
          setPatients={setPatients}
          patient={patient}
          setPatient={setPatient}
        />
        <PatientList
          patients={patients}
          setPatient={setPatient}
          deletePatient={deletePatient}
        />
      </div>
    </div>
  )
}

export default App
