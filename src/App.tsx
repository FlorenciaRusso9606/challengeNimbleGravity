
import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import { getCandidateData, getOpenJobs } from "./service";
import { Candidate } from "./types/candidate";
import { Job } from "./types/job";

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [candidate, setCandidate] = useState<Candidate | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

 useEffect(() => {
    const loadData = async () => {
      try {
        const candidateData = await getCandidateData()
        const jobsData = await getOpenJobs()
console.log("Candidate loaded:", candidateData);
        setCandidate(candidateData)
        setJobs(jobsData)
      } catch (err) {
        setError("Error cargando datos")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

 if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!candidate) return <p>No se pudo cargar candidato</p>;

  return (
    <div>
      <h1>Challenge Nimble Gravity</h1>
      <Form jobs={jobs} candidate={candidate} />
    </div>
  );
}


export default App
