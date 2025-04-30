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
  viewBox="0 0 24 24"
>

<path d="M19 2C20.654 2 22 3.346 22 5V19C22 20.654 20.654 22 19 22H5C3.346 22 2 20.654 2 19V5C2 3.346 3.346 2 5 2H19ZM24 5C24 2.239 21.762 0 19 0H5C2.238 0 0 2.239 0 5V19C0 21.761 2.238 24 5 24H19C21.762 24 24 21.761 24 19V5ZM11 17H9V20H7V17H5V14H11V17ZM9 4H7V12H9V4ZM19 9H13V12H15V20H17V12H19V9ZM17 4H15V7H17V4Z" {fill}/>
</svg>
