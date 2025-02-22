export type Project = {
  id: string;
  created_at: number;
  project_name: string;
  project_start: string;
  project_end: string;
  location: string;
  deploy_status: "Deployed" | "Not Deployed";
}