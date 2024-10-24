<script lang="ts">
    import Layout from "../Layout.svelte";
    import { enhance } from "$app/forms";

    let name = "";
    let email = "";
    let message = "";
    let formStatus = "";

    function handleSubmit() {
        formStatus = "Sending...";
    }
</script>

<Layout overrideBackground={true}>
    <main class="min-h-screen px-4 py-12 text-white bg-[#272727] sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
            <div class="flex flex-col items-center mb-20 translate-y-12 md:flex-row md:items-start">
                <div class="md:w-1/2">
                    <span class="px-3 py-1 text-xs text-[#272727] bg-white font-semi rounded-full">CONTACT US</span>
                    <h1 class="mt-2 mb-0 text-5xl leading-tight font-semi font-mona font-h2">
                        WE'D LOVE TO <br> HEAR FROM YOU!
                    </h1>
                </div>
                <div class="md:w-1/2">
                    <p class="font-light font-body font-inter" style="margin-top: 30px;">
                        At Waterway Labs, your feedback is important to us! Whether you have a question, a suggestion, or simply want to share your experience, we're all ears. Our goal is to make sure you have the best possible experience, and your input helps us get there.

                        Feel free to send us a message, and we'll get back to you as soon as possible.
                    </p>
                </div>
            </div>
            
            <!-- Top divider -->
            <div class="mb-12 border-t-2 border-[#4E4E4E] mx-auto"></div>
            
            <div class="flex flex-col items-start gap-8 md:flex-row">
                <!-- Contact Form -->
                <div class="w-full md:w-1/2">
                    <h2 class="mb-6 text-2xl font-med font-mona">Send us a message</h2>
                    <form method="POST" use:enhance={() => {
                        return ({ result }) => {
                            if (result.type === 'success') {
                                formStatus = "Message sent successfully!";
                                name = "";
                                email = "";
                                message = "";
                            } else {
                                formStatus = "Failed to send message. Please try again.";
                            }
                        };
                    }} on:submit|preventDefault={handleSubmit} class="space-y-6">
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-300">Name</label>
                            <input type="text" id="name" name="name" bind:value={name} required 
                                   class="w-full p-3 text-gray-900 transition bg-gray-100 rounded-md font-inter focus:ring-2 focus:ring-blue-500 focus:outline-none">
                        </div>

                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-300">Email</label>
                            <input type="email" id="email" name="email" bind:value={email} required 
                                   class="w-full p-3 text-gray-900 transition bg-gray-100 rounded-md font-inter focus:ring-2 focus:ring-blue-500 focus:outline-none">
                        </div>

                        <div>
                            <label for="message" class="block mb-2 text-sm font-medium text-gray-300">Message</label>
                            <textarea id="message" name="message" bind:value={message} required 
                                      class="w-full p-3 text-gray-900 transition bg-gray-100 rounded-md font-inter focus:ring-2 focus:ring-blue-500 focus:outline-none" rows="5"></textarea>
                        </div>

                        <button type="submit" 
                                class="w-full px-4 py-3 font-medium text-white transition duration-150 ease-in-out bg-blue-600 rounded-md font-inter hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Send Message
                        </button>
                    </form>
                    
                    {#if formStatus}
                        <p class="mt-6 text-lg font-medium font-inter" class:text-green-400={formStatus.includes("success")} class:text-red-400={formStatus.includes("Failed")}>
                            {formStatus}
                        </p>
                    {/if}
                </div>

                <!-- Contact Information -->
                <div class="w-full md:w-1/2">
                    <h2 class="mb-6 text-2xl font-med font-mona">Contact Information</h2>
                    <div class="relative bg-[#272727] rounded-lg p-6 overflow-hidden mt-6">
                        <!-- Ellipse 1 -->
                        <div class="absolute w-64 h-64 bg-[rgba(79,168,246,0.2)] filter blur-[240px] top-[10%] left-[25%]"></div>
                        <!-- Ellipse 2 -->
                        <div class="absolute w-60 h-60 bg-[rgba(244,223,253,0.2)] filter blur-[320px] bottom-[20%] right-[30%]"></div>
                        
                        <div class="relative z-10">
                            <p class="mb-2 text-lg font-inter">Email:</p>
                            <a href="mailto:hello@waterwaylabs.xyz" class="text-blue-400 transition hover:text-blue-300 font-inter">hello@waterwaylabs.xyz</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</Layout>

<style>
    body {
        overflow-x: hidden;
    }
</style>
