import { Button } from "./Button";
import { Input } from "./Input";
import { useState } from "react";
import { Candidate } from "../types/candidate";
import { Job } from "../types/job";
import { applyToJob } from "../service";
interface FormProps {
  jobs: Job[];
  candidate: Candidate;
}

export default function Form({ jobs, candidate }: FormProps) {
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [repoUrls, setRepoUrls] = useState<Record<string, string>>({});

  const [error, setError] = useState<string | null>(null);

  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (jobId: string) => {
    setError(null);
    setSuccess(null);
    const repoUrl = repoUrls[jobId];
    if (!repoUrl) {
      setError("Debes ingresar la URL de tu repositorio.");
      return;
    }
    try {
      setSubmitting(jobId);

        await applyToJob(candidate, jobId, repoUrl);
      setSuccess("Postulación enviada correctamente");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(null);
    }
  }
    return (
  <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
    <form className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 flex flex-col gap-8">

      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800">
          Postulación a posiciones abiertas
        </h1>
        <p className="text-slate-500 mt-2">
          Completá tu repositorio para aplicar
        </p>
      </div>
    {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-300 text-green-700 p-3 rounded-lg text-sm">
          {success}
        </div>
      )}
      <ul className="flex flex-col gap-6">
        {jobs.map((job) => (
          <li
            key={job.id}
            className="border border-slate-200 rounded-xl p-6 flex flex-col gap-4 bg-slate-50 hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-slate-700">
              {job.title}
            </h2>

            <Input
              label="URL de tu repositorio de GitHub"
              placeholder="https://github.com/tu-usuario/tu-repo"
              value={repoUrls[job.id] || ""}
              onChange={(e) =>
                setRepoUrls((prev) => ({
                  ...prev,
                  [job.id]: e.target.value,
                }))
              }
            />

            <div className="flex justify-end">
              <Button
                onClick={() => handleSubmit(job.id)}
                disabled={submitting === job.id}
                className="bg-blue-700 text-white hover:bg-blue-600"
              >
                {submitting === job.id ? "Enviando..." : "Aplicar"}
              </Button>
            </div>
          </li>
        ))}
      </ul>

  
    </form>
  </div>
);
  };

