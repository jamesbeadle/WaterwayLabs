
<script lang="ts">
  import { loadingText } from "$lib/stores/global-stores";
	interface Props {
		className: string;
    };
    
    let { className } : Props = $props();
</script>

<div class="flex justify-center items-center h-screen">
  <div
    class={`${className} flex flex-col justify-center items-center h-screen pulse-text-color`}
  >
    <img src="logo.png" alt="logo" />
    {$loadingText}
  </div>
</div>

<style>
  @keyframes pulse {
    0%,
    100% {
      fill: #ffffff;
    }
    50% {
      fill: #2ce3a6;
    }
  }
  @keyframes pulse-text {
    0%,
    100% {
      color: #ffffff;
    }
    50% {
      color: #2ce3a6;
    }
  }
  .pulse-color {
    animation: pulse 2s infinite;
  }
  .pulse-text-color {
    animation: pulse-text 2s infinite;
  }
</style>
