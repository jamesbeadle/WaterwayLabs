<div class="contact-info">
  <h2 class="contact-title">Contact Information</h2>
  <div class="contact-box">
    <div class="absolute ellipse-1"></div>
    <div class="absolute ellipse-2"></div>
    <div class="content">
      <p class="email-label">Email:</p>
      <a href="mailto:hello@waterwaylabs.xyz" class="email-link">hello@waterwaylabs.xyz</a>
    </div>
  </div>
</div>

<style>
  .contact-info {
    @apply px-4 mb-20 lg:mb-0;
  }

  .contact-title {
    @apply mb-6 text-2xl font-medium font-mona;
  }

  .contact-box {
    @apply relative rounded-lg p-6 overflow-hidden mt-10 w-[90%] lg:max-w-md;
  }

  .content {
    @apply relative z-10;
  }

  .email-label {
    @apply mb-2 text-lg font-inter;
  }

  .email-link {
    @apply text-blue-400 transition hover:text-blue-300 font-inter;
  }
  .ellipse-1 {
    width: 256px;
    height: 256px;
    background: rgba(79, 168, 246, 0.2);
    filter: blur(240px);
    position: absolute;
    top: 10%;
    left: 25%;
  }

  .ellipse-2 {
    width: 240px;
    height: 240px;
    background: rgba(244, 223, 253, 0.2);
    filter: blur(320px);
    position: absolute;
    bottom: 20%;
    right: 30%;
  }

  @media (max-width: 1023px) {
    .contact-info {
      @apply mb-16; 
    }
  }
</style>