<script lang="ts">
	interface Props {
		className: string;
  };
    
  let { className } : Props = $props();
</script>
<img class={`${className}`} src="/project-images/golfpad-token.png" alt="golfpad" />