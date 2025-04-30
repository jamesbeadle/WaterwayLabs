<script lang="ts">
	interface Props {
		className: string;
    fill:string;
  };
    
  let { className, fill } : Props = $props();
</script>

<svg 
  xmlns="http://www.w3.org/2000/svg"
  class={className}
  viewBox="0 0 24 24"
  fill="none"
>

<g clip-path="url(#clip0_13_220)">
  <path d="M19 7.001C19 10.866 15.866 14.001 12 14.001C8.134 14.001 5 10.866 5 7.001C5 3.134 8.134 0 12 0C15.866 0 19 3.134 19 7.001ZM17.402 14.181C15.896 15.318 14.028 16.001 12 16.001C9.97 16.001 8.101 15.316 6.593 14.179C2.521 15.972 0 21.555 0 24H24C24 21.577 21.4 15.994 17.402 14.181Z" {fill} />
  </g>
  <defs>
  <clipPath id="clip0_13_220">
  <rect width="24" height="24" {fill}/>
  </clipPath>
  </defs>
</svg>
