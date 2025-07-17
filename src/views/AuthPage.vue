<script setup>
import AuthForm from '@/components/AppAuthForm.vue'
import marvelvideo from '../assets/images/marvelvideo.mp4'
</script>

<template>
  <video
    autoplay
    muted
    loop
    playsinline
    class="absolute inset-0 w-full h-full object-cover bg-center"
  >
    <source :src="marvelvideo" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <div class="flex justify-center items-center h-screen">
    <AuthForm> </AuthForm>
  </div>
</template>
