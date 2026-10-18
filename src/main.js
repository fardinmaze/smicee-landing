import { createApp } from 'vue'
import App from './App.vue'
import { ScrollTrigger } from './lib/motion.js'
import './assets/main.css'

createApp(App).mount('#app')

// Images and fonts change the page height; re-measure the scroll animations when they are in
window.addEventListener('load', () => ScrollTrigger.refresh())
document.fonts?.ready.then(() => ScrollTrigger.refresh())
