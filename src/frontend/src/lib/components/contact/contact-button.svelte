<script lang="ts">
    export let type: "button" | "submit" | "reset" = "button";
</script>

<button
  {type}
  class="w-[90%] mb-10 px-4 py-3 font-medium text-white transition duration-150 
         ease-in-out bg-WaterwayBlue rounded-md font-inter hover:bg-WaterwayGreen 
         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
         lg:w-full lg:max-w-md"
>
  Send Message
</button>