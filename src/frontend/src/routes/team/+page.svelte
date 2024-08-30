<script lang="ts">
    import { onMount } from "svelte";
    import { isLoading } from "$lib/stores/global-stores";
    import Layout from "../Layout.svelte";
  
    onMount(async () => {
      try {
        
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      } finally {
        isLoading.set(false);
      }
    });
  </script>
  
  <Layout>
    <div class="flex items-center justify-center flex-col mt-16 mb-16">
      <p>Waterway Labs Team</p>
      <p>Zoe Duffy: Managing Director</p>
      <p>Kelly Howlett: Head of Operations</p>
      <p>James Beadle: Development Manager</p>
      <p>George Robinson: Community Manager</p>
      <p>Josh Wray: Head of Promotion</p>
    </div>
  </Layout>
  