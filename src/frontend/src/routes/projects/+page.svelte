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
    <div class="m-4 mx-8">
        <p class="text-lg my-4">Information on all projects under development by Waterway Labs can be found here:</p>
        <div class="flex flex-col space-y-2">
            <a href="https://openfpl.xyz/whitepaper">https://openfpl.xyz/whitepaper</a>
            <a href="https://icpfa.org/whitepaper">https://icpfa.org/whitepaper</a>
            <a href="https://companiesdao.com/whitepaper">https://companiesdao.com/whitepaper</a>
            <a href="https://footballgod.xyz/whitepaper">https://footballgod.xyz/whitepaper</a>
            <a href="https://openbook.services/whitepaper">https://openbook.services/whitepaper</a>
            <a href="https://opencare.services/whitepaper">https://opencare.services/whitepaper</a>
            <a href="https://golfpad.xyz/whitepaper">https://golfpad.xyz/whitepaper</a>
            <a href="https://doxxed.app/whitepaper">https://doxxed.app/whitepaper</a>
            <a href="https://icp.casino/whitepaper">https://icp.casino/whitepaper</a>
            <a href="https://betty.bingo/whitepaper">https://betty.bingo/whitepaper</a>
            <a href="https://opencore.live/whitepaper">https://opencore.live/whitepaper</a>
        </div>
        <p class="text-lg my-4">We will also be assisting with development of the following projects:</p>
        <div class="flex h-full flex-col space-y-2">
            <a href="https://chainofcommand.xyz/whitepaper">https://chainofcommand.xyz/whitepaper</a>
            <a href="https://opendna.xyz/whitepaper">https://opendna.xyz/whitepaper</a>
            <a href="https://opennfl.xyz/whitepaper">https://opennfl.xyz/whitepaper</a>
        </div>
    </div>
  </Layout>
  