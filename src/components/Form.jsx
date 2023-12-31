import { useEffect, useState } from "react"
import Error from "./Error"

function Form({ patients, setPatients, patient, setPatient }) {
  const [name, setName] = useState("")
  const [owner, setOwner] = useState("")
  const [email, setEmail] = useState("")
  const [dischargeDate, setDischargeDate] = useState("")
  const [symptoms, setSymptoms] = useState("")
  const [error, setError] = useState(false)

  useEffect(() => {
    if (Object.keys(patient).length > 0) {
      setName(patient.name)
      setOwner(patient.owner)
      setEmail(patient.email)
      setDischargeDate(patient.dischargeDate)
      setSymptoms(patient.symptoms)
    }
  }, [patient])

  const generateId = () => {
    const random = Math.random().toString(36).substring(2)
    const date = Date.now().toString(36)
    return random + date
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if ([name, owner, email, dischargeDate, symptoms].includes("")) {
      console.log("Hay al menos un campo vacio")
      setError(true)
      return
    }
    setError(false)

    const patientObject = {
      name,
      owner,
      email,
      dischargeDate,
      symptoms
    }

    if (patient.id) {
      patientObject.id = patient.id
      const updatedPatients = patients.map(currentPatient =>
        currentPatient.id === patient.id ? patientObject : currentPatient)
      setPatients(updatedPatients)
      setPatient({})
    } else {
      patientObject.id = generateId()
      setPatients([...patients, patientObject])
    }

    setName("")
    setOwner("")
    setEmail("")
    setDischargeDate("")
    setSymptoms("")
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      >
        {error && <Error><p>Todos los campos son obligatorios</p></Error>}
        <div className="mb-5">
          <label
            htmlFor="mascota"
            className="block text-gray-700 uppercase font-bold">
            Nombre Mascota
          </label>

          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-bold">
            Nombre Propietario
          </label>

          <input
            id="propietario"
            type="text"
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={owner}
            onChange={e => setOwner(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 uppercase font-bold">
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="Email Contacto Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="alta"
            className="block text-gray-700 uppercase font-bold">
            Alta
          </label>

          <input
            id="alta"
            type="date"
            placeholder="Alta"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={dischargeDate}
            onChange={e => setDischargeDate(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="alta"
            className="block text-gray-700 uppercase font-bold">
            Síntomas
          </label>

          <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los Síntomas"
            value={symptoms}
            onChange={e => setSymptoms(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
          value={patient.id ? "Editar Paciente" : "Agregar Paciente"}
        />
      </form>
    </div>
  )
}

export default Form
