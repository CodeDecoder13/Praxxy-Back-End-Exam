<template>
  <div class="video-player">
    <video
      ref="videoRef"
      class="video-js vjs-default-skin vjs-big-play-centered"
      controls
      preload="auto"
      :poster="thumbnail"
      data-setup="{}"
    >
      <source :src="url" type="video/mp4" />
      <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a
        web browser that supports HTML5 video
      </p>
    </video>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

const props = defineProps({
  url: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    default: ''
  }
})

const videoRef = ref(null)
let player = null

// Initialize the video player
const initializePlayer = () => {
  if (player) {
    player.dispose()
  }
  
  player = videojs(videoRef.value, {
    controls: true,
    fluid: true,
    responsive: true,
    playbackRates: [0.5, 1, 1.5, 2],
    sources: [{
      src: props.url,
      type: 'video/mp4'
    }],
    poster: props.thumbnail || ''
  })
}

// Watch for URL changes and update the player
watch(() => props.url, (newUrl, oldUrl) => {
  if (newUrl !== oldUrl) {
    if (player) {
      player.src({
        src: newUrl,
        type: 'video/mp4'
      })
      player.load()
    }
  }
})

onMounted(() => {
  initializePlayer()
})

onBeforeUnmount(() => {
  if (player) {
    player.dispose()
  }
})
</script>

<style>
.video-player {
  width: 100%;
  height: 100%;
}

/* Add VideoJS theme customization */
:deep(.video-js) {
  width: 100%;
  height: 100%;
}

:deep(.vjs-big-play-button) {
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%);
}
</style>
