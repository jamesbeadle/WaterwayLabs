export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  linkDisplay: string;
  status: "Design" | "Development" | "Live" | "Decentralized";
  summary: string;
  primaryColour: string;
  secondaryColour: string;
}
