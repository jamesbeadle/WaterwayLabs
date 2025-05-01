<script lang="ts">
    import LocalSpinner from "../shared/local-spinner.svelte";
    import Modal from "../shared/modal.svelte";
    import type { Project, ProjectStatus, UpdateProject, WaterwayLabsApp } from "../../../../../declarations/backend/backend.did";
    import { projectStore } from "$lib/stores/project-store";
    import { projectStatuses, waterwayLabsApps } from "$lib/constants/app.constants";

    interface Props {
        onClose: () => void;
        title: string;
        project: Project;
    }

    let { onClose, title, project }: Props = $props();
    let isLoading = $state(false);
    let formData = $state({
        name: project.name as string | null,
        backendCanisterId: project.backendCanisterId as string | null,
        frontendCanisterId: project.frontendCanisterId as string | null,
        websiteURL: project.websiteURL as string | null,
        githubLink: project.githubLink as string | null,
        socialLinks: project.socialLinks as [string, string][] | null,
        status: project.status as ProjectStatus | null,
        description: project.description as string | null,
        summary: project.summary as string | null,
        mainColour: project.mainColour as string | null,
        secondaryColour: project.secondaryColour as string | null,
        thirdColour: project.thirdColour as string | null,
        app: project.app as WaterwayLabsApp | null,
    });

    let socialLinkInput = $state({ platform: "", url: "" });
    let isFormValid = $derived(
        Object.values(formData).some((value) => value !== null && value !== undefined)
    );

    function addSocialLink() {
        if (socialLinkInput.platform && socialLinkInput.url) {
            formData.socialLinks = [
                ...(formData.socialLinks || []),
                [socialLinkInput.platform, socialLinkInput.url],
            ];
            socialLinkInput = { platform: "", url: "" };
        }
    }

    function removeSocialLink(index: number) {
        if (formData.socialLinks) {
            formData.socialLinks = formData.socialLinks.filter((_, i) => i !== index);
        }
    }

    async function updateProject() {
        if (!isFormValid) return;
        isLoading = true;
        try {
            /*
            const dto: UpdateProject = {
                app: formData.app ?? undefined,
                name: formData.name ?? undefined,
                backendCanisterId: formData.backendCanisterId ?? undefined,
                frontendCanisterId: formData.frontendCanisterId ?? undefined,
                websiteURL: formData.websiteURL ?? undefined,
                githubLink: formData.githubLink ?? undefined,
                socialLinks: formData.socialLinks ?? undefined,
                status: formData.status ?? undefined,
                description: formData.description ?? undefined,
                summary: formData.summary ?? undefined,
                mainColour: formData.mainColour ?? undefined,
                secondaryColour: formData.secondaryColour ?? undefined,
                thirdColour: formData.thirdColour ?? undefined,
            };
            await projectStore.updateProject(dto);
            */
            onClose();
        } catch (error) {
            console.error("Failed to update project:", error);
        } finally {
            isLoading = false;
        }
    }
</script>

<Modal {onClose} {title}>
    <div class="flex flex-col items-center justify-start w-full space-y-6">
        {#if isLoading}
            <LocalSpinner />
        {:else}
            <div class="flex flex-col w-full space-y-4">
                <div class="flex flex-col">
                    <label for="name" class="text-white mb-1">Project Name</label>
                    <input
                        id="name"
                        type="text"
                        bind:value={formData.name}
                        class="p-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
                    />
                </div>

                <div class="flex flex-col">
                    <label for="backendCanisterId" class="text-white mb-1">Backend Canister ID</label>
                    <input
                        id="backendCanisterId"
                        type="text"
                        bind:value={formData.backendCanisterId}
                        class="p-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
                    />
                </div>

                <div class="flex flex-col">
                    <label for="frontendCanisterId" class="text-white mb-1">Frontend Canister ID</label>
                    <input
                        id="frontendCanisterId"
                        type="text"
                        bind:value={formData.frontendCanisterId}
                        class="p-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
                    />
                </div>

                <div class="flex flex-col">
                    <label for="websiteURL" class="text-white mb-1">Website URL</label>
                    <input
                        id="websiteURL"
                        type="url"
                        bind:value={formData.websiteURL}
                        class="p-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
                    />
                </div>

                <div class="flex flex-col">
                    <label for="githubLink" class="text-white mb-1">GitHub Link</label>
                    <input
                        id="githubLink"
                        type="url"
                        bind:value={formData.githubLink}
                        class="p-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
                    />
                </div>

                <div class="flex flex-col">
                    <label class="text-white mb-1">Social Links</label>
                    <div class="flex flex-col sm:flex-row gap-2 mb-2">
                        <input
                            type="text"
                            bind:value={socialLinkInput.platform}
                            placeholder="Platform (e.g., Twitter)"
                            class="p-2 bg-gray-700 text-white border border-gray-600 rounded-lg flex-1"
                        />
                        <input
                            type="url"
                            bind:value={socialLinkInput.url}
                            placeholder="URL"
                            class="p-2 bg-gray-700 text-white border border-gray-600 rounded-lg flex-1"
                        />
                        <button
                            type="button"
                            onclick={addSocialLink}
                            class="px-4 py-2 bg-BrandBlue text-white rounded-lg"
                            disabled={!socialLinkInput.platform || !socialLinkInput.url}
                        >
                            Add
                        </button>
                    </div>
                    {#each formData.socialLinks ?? [] as [platform, url], index}
                        <div class="flex items-center gap-2">
                            <span class="text-gray-300">{platform}: {url}</span>
                            <button
                                type="button"
                                onclick={() => removeSocialLink(index)}
                                class="text-red-400 hover:text-red-600"
                            >
                                Remove
                            </button>
                        </div>
                    {/each}
                </div>

                <div class="flex flex-col">
                    <label for="status" class="text-white mb-1">Status</label>
                    <select
                        id="status"
                        bind:value={formData.status}
                        class="p-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
                    >
                        <option value={null}>No Change</option>
                        {#each Object.values(projectStatuses) as status}
                            <option value={status}>{status}</option>
                        {/each}
                    </select>
                </div>

                <div class="flex flex-col">
                    <label for="description" class="text-white mb-1">Description</label>
                    <textarea
                        id="description"
                        bind:value={formData.description}
                        class="p-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
                        rows="4"
                    ></textarea>
                </div>

                <div class="flex flex-col">
                    <label for="summary" class="text-white mb-1">Summary</label>
                    <textarea
                        id="summary"
                        bind:value={formData.summary}
                        class="p-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
                        rows="3"
                    ></textarea>
                </div>

                <div class="flex flex-col sm:flex-row gap-4">
                    <div class="flex flex-col flex-1">
                        <label for="mainColour" class="text-white mb-1">Main Color</label>
                        <input
                            id="mainColour"
                            type="color"
                            bind:value={formData.mainColour}
                            class="p-1 bg-gray-700 border border-gray-600 rounded-lg"
                        />
                    </div>
                    <div class="flex flex-col flex-1">
                        <label for="secondaryColour" class="text-white mb-1">Secondary Color</label>
                        <input
                            id="secondaryColour"
                            type="color"
                            bind:value={formData.secondaryColour}
                            class="p-1 bg-gray-700 border border-gray-600 rounded-lg"
                        />
                    </div>
                    <div class="flex flex-col flex-1">
                        <label for="thirdColour" class="text-white mb-1">Third Color</label>
                        <input
                            id="thirdColour"
                            type="color"
                            bind:value={formData.thirdColour}
                            class="p-1 bg-gray-700 border border-gray-600 rounded-lg"
                        />
                    </div>
                </div>

                <div class="flex flex-col">
                    <label for="app" class="text-white mb-1">App</label>
                    <select
                        id="app"
                        bind:value={formData.app}
                        class="p-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
                    >
                        <option value={null}>No Change</option>
                        {#each Object.values(waterwayLabsApps) as app}
                            <option value={app}>{app}</option>
                        {/each}
                    </select>
                </div>

                <button
                    class="{isFormValid
                        ? 'bg-BrandBlue hover:bg-BrandBlue/90'
                        : 'bg-gray-600 cursor-not-allowed'} text-white px-4 py-2 rounded-lg w-full transition-colors"
                    disabled={!isFormValid}
                    onclick={updateProject}
                >
                    Update Project
                </button>
            </div>
        {/if}
    </div>
</Modal>