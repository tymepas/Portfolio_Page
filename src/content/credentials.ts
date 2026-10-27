// Credentials checked against the original certificate documents supplied by Garvit.
// Those documents are private reference files: never copy them into public/.
// Certificate IDs, verification codes, QR codes, and score reports are deliberately
// omitted. Add a verification link only once an official public URL is approved.
//
// Internship records and recommendation letters stay unpublished until Garvit
// confirms their details; see the credentials milestone notes before adding any.

export type Credential = {
  slug: string;
  title: string;
  /** What kind of document this is, e.g. an assessment or a job simulation. */
  type: string;
  issuer: string;
  /** ISO date from the certificate, used for the machine-readable <time> value. */
  issued: string;
  issuedLabel: string;
  detail?: string;
};

export const credentials: Credential[] = [
  {
    slug: "futureskills-prime-data-science-assessment",
    title: "Master's in Data Science Assessment Certificate",
    type: "Assessment certificate",
    issuer: "FutureSkills Prime / IT-ITeS SSC, NASSCOM",
    issued: "2025-10-11",
    issuedLabel: "October 2025",
    // The certificate's scorecard spans modules M001–M015 and prints the overall total.
    // By Garvit's choice, only the Gold category (70% and above) is displayed, not the score.
    detail: "Gold category. Assessment aligned to IT-ITeS SSC NASSCOM competency standards.",
  },
  {
    slug: "topmentor-data-science-program",
    title: "Master's in Data Science Program Completion Certificate",
    type: "Program completion",
    issuer: "TopMentor",
    issued: "2025-09-13",
    issuedLabel: "September 2025",
    detail: "Certificate of completion for the program's requirements.",
  },
  {
    slug: "deloitte-data-analytics-job-simulation",
    title: "Deloitte Data Analytics Job Simulation",
    type: "Job simulation",
    issuer: "Forage",
    issued: "2025-07-10",
    issuedLabel: "July 2025",
    detail: "Practical exercises in data analysis and forensic technology.",
  },
];

export const historicalCredentials: Credential[] = [
  {
    slug: "microsoft-mta-python",
    title: "Microsoft Technology Associate (MTA): Introduction to Programming Using Python",
    type: "Historical credential",
    issuer: "Microsoft",
    issued: "2022-02-05",
    issuedLabel: "February 2022",
    detail: "Microsoft retired the MTA program in 2022.",
  },
];
