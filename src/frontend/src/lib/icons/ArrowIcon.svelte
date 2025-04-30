<script lang="ts">
	interface Props {
		className: string;
    fill:string;
  };
    
    let { className, fill } : Props = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  class={className}
  fill="none"
  viewBox="0 0 47 47"
>
<circle cx="23.5" cy="23.5" r="23.5" fill='white' />
<path d="M21.0753 33L19 30.8783L25.8486 23.997L19 17.1217L21.0753 15L30 23.997L21.0753 33Z" {fill} />
</svg>
