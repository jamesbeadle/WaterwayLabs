import type { ProjectId } from "../../../../declarations/backend/backend.did";
import type { Component } from "svelte";

export interface Project {
  id: ProjectId;
  name: string;
  backendCanisterId: string;
  frontendCanisterId: string;
  websiteURL: string;
  githubLink: string;
  socialLinks: Array<[string, string]>;
  status: string;
  description: string;
  summary: string;
  mainColour: string;
  secondaryColour: string;
  thirdColour: string;

  component: Component;
  buttonText: string;
  backgroundImage: string;
  screenshot: string;
  twitter?: string;
  selected?: boolean;
  backgroundColor?: string;
}
