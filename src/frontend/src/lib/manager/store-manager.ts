//import { DataHashService } from "$lib/services/data-hash-service";
import { DataHashService } from "$lib/services/data-hash-service";
import { ProjectService } from "$lib/services/project-service";
import { TeamService } from "$lib/services/team-service";
import { projectStore } from "$lib/stores/project-store";
import { teamStore } from "$lib/stores/team-store";
import { isError, replacer } from "$lib/utils/helpers";

class StoreManager {
  private dataHashService: DataHashService;
  private projectService: ProjectService;
  private teamService: TeamService;

  private categories: string[] = ["projects", "team_members"];

  constructor() {
    this.dataHashService = new DataHashService();
    this.projectService = new ProjectService();
    this.teamService = new TeamService();
  }

  async syncStores(): Promise<void> {
    const newHashesResult = await this.dataHashService.getDataHashes();

    if (!newHashesResult) {
      return;
    }

    let newHashes = newHashesResult.dataHashes;

    let error = isError(newHashes);
    if (error) {
      console.error("Error fetching data hashes.");
      return;
    }

    let dataHashes = newHashesResult.dataHashes;

    for (const category of this.categories) {
      const categoryHash = newHashes.find((hash) => hash.category === category);

      if (categoryHash?.hash !== localStorage.getItem(`${category}_hash`)) {
        await this.syncCategory(category);
        localStorage.setItem(`${category}_hash`, categoryHash?.hash || "");
      } else {
        this.loadFromCache(category);
      }
    }
  }

  private async syncCategory(category: string): Promise<void> {
    switch (category) {
      case "projects":
        const updatedProjects = await this.projectService.getProjects();
        if (updatedProjects) {
          projectStore.setProjects(updatedProjects.projects);
          localStorage.setItem(
            "projects",
            JSON.stringify(updatedProjects, replacer),
          );
        }
        break;
      case "team_members":
        const updatedTeamMembers = await this.teamService.getTeamMembers();
        teamStore.setTeamMembers(updatedTeamMembers);
        localStorage.setItem(
          "team_members",
          JSON.stringify(updatedTeamMembers, replacer),
        );
        break;
    }
  }

  private loadFromCache(category: string): void {
    const cachedData = localStorage.getItem(category);

    switch (category) {
      case "projects":
        const cachedProjects = JSON.parse(cachedData || "[]");
        projectStore.setProjects(cachedProjects);
        break;
      case "team_members":
        const cachedTeamMembers = JSON.parse(cachedData || "[]");
        teamStore.setTeamMembers(cachedTeamMembers);
        break;
    }
  }
}

export const storeManager = new StoreManager();
