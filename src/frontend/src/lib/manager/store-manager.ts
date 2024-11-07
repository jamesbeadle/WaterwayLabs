//import { DataHashService } from "$lib/services/data-hash-service";
import { ProjectService } from "$lib/services/project-service";
import { projectStore } from "$lib/stores/project-store";
import { isError, replacer } from "$lib/utils/Helpers";

class StoreManager {
  //private dataHashService: DataHashService;
  private projectService: ProjectService;

  private categories: string[] = ["projects"];

  constructor() {
    //this.dataHashService = new DataHashService();
    this.projectService = new ProjectService();
  }

  async syncStores(): Promise<void> {
    // Comment out hash checking for now
    /*const newHashes = await this.dataHashService.getDataHashes();

    let error = isError(newHashes);
    if (error) {
      console.error("Error fetching data hashes.");
      return;
    }*/

    for (const category of this.categories) {
      // For now, just sync directly
      await this.syncCategory(category);
    }
  }

  private async syncCategory(category: string): Promise<void> {
    switch (category) {
      case "projects":
        const updatedProjects = await this.projectService.getProjects();
        projectStore.setProjects(updatedProjects);
        localStorage.setItem(
          "projects",
          JSON.stringify(updatedProjects, replacer),
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
    }
  }
}

export const storeManager = new StoreManager();
