import { DataHashService } from "$lib/services/data-hash-service";
import { ProjectService } from "$lib/services/project-service";
import { TeamService } from "$lib/services/team-service";
import { projectStore } from "$lib/stores/project-store";
import { teamStore } from "$lib/stores/team-store";
import { replacer } from "$lib/utils/helpers";
import type { DataHash } from "../../../../declarations/backend/backend.did";

class StoreManager {
  private dataHashService: DataHashService;
  private projectService: ProjectService;
  private teamService: TeamService;

  private categories: string[] = ["projects", "team_members"];

  private isSyncing = false;

  constructor() {
    this.dataHashService = new DataHashService();
    this.projectService = new ProjectService();
    this.teamService = new TeamService();
  }

  async syncStores(): Promise<void> {
    if (this.isSyncing) {
      return;
    }
    console.log("syncing stores");
    this.isSyncing = true;
    try {
      await this.syncAppDataHashes();
    } catch (error) {
      console.error("Error syncing stores:", error);
      throw error;
    } finally {
      this.isSyncing = false;
    }
  }

  private async syncAppDataHashes(): Promise<void> {
    const appDataHashes = await this.dataHashService.getDataHashes();
    if (appDataHashes == undefined) {
      return;
    }
    console.log(appDataHashes);
    for (const category of this.categories) {
      const categoryHash = appDataHashes.dataHashes.find(
        (hash: DataHash) => hash.category === category,
      );
      if (categoryHash?.hash !== localStorage.getItem(`${category}_hash`)) {
        await this.syncCategory(category);
        localStorage.setItem(`${category}_hash`, categoryHash?.hash || "");
      } else {
        await this.loadFromCache(category);
      }
    }
  }

  private async syncCategory(category: string): Promise<void> {
    switch (category) {
      case "projects":
        const projectsResult = await this.projectService.getProjects();
        if (projectsResult) {
          let updatedProjects = projectsResult.projects.sort(
            (a, b) => a.id - b.id,
          );
          projectStore.setProjects(updatedProjects);
          localStorage.setItem(
            "projects",
            JSON.stringify(updatedProjects, replacer),
          );
        }
        break;
      case "team_members":
        const teamMembersResult = await this.teamService.getTeamMembers();
        if (teamMembersResult) {
          let updateTeamMembers = teamMembersResult;
          teamStore.setTeamMembers(updateTeamMembers);
          localStorage.setItem(
            "team_members",
            JSON.stringify(updateTeamMembers, replacer),
          );
        }
        break;
    }
  }

  private loadFromCache(category: string): void {
    console.log("loading from cached");
    console.log(category);
    const cachedData = localStorage.getItem(category);

    switch (category) {
      case "projects":
        const cachedProjects = JSON.parse(cachedData || "[]");
        projectStore.setProjects(cachedProjects);
        console.log(cachedProjects);
        break;
      case "team_members":
        const cachedTeamMembers = JSON.parse(cachedData || "[]");
        teamStore.setTeamMembers(cachedTeamMembers);
        break;
    }
  }
}

export const storeManager = new StoreManager();
