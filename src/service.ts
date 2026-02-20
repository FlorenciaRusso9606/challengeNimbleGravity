import { Candidate } from "./types/candidate";

const BASE_URL =
  "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

export const getCandidateData = async () => {
  const response = await fetch(
    `${BASE_URL}/api/candidate/get-by-email?email=russoflorencia96@gmail.com`,
  );

  if (!response.ok) {
    throw new Error("Error al obtener candidato");
  }
  const data = await response.json();
  return data;
};

export const getOpenJobs = async () => {
  const response = await fetch(`${BASE_URL}/api/jobs/get-list`);

  if (!response.ok) {
    throw new Error("Error al obtener la lista de trabajos disponibles");
  }
  const data = await response.json();
  return data;
};

export const applyToJob = async (
  candidate: Candidate,
  jobId: string,
  repoUrl: string,
) => {
  const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uuid: candidate.uuid,
      jobId,
      candidateId: candidate.candidateId,
      applicationId: candidate.applicationId,
      repoUrl,
    }),
  });
  console.log("Sending body:", {
    uuid: candidate.uuid,
    jobId,
    candidateId: candidate.candidateId,
    repoUrl,
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al enviar postulación");
  }

  return data;
};
