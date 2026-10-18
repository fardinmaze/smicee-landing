<script setup>
import AnimatedBackground from './components/AnimatedBackground.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import VideoSection from './components/VideoSection.vue'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import PortfolioStrip from './components/PortfolioStrip.vue'
import PlatformSection from './components/PlatformSection.vue'
import ModulesSection from './components/ModulesSection.vue'
import ShowcaseSection from './components/ShowcaseSection.vue'
import LeadsSection from './components/LeadsSection.vue'
import StatsSection from './components/StatsSection.vue'
import AutomationSection from './components/AutomationSection.vue'
import CtaSection from './components/CtaSection.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <ScrollProgress />
  <AnimatedBackground />
  <SiteHeader />
  <main>
    <HeroSection />
    <PortfolioStrip />
    <VideoSection />
    <PlatformSection />
    <ModulesSection />
    <ShowcaseSection />
    <LeadsSection />
    <StatsSection />
    <AutomationSection />
    <CtaSection />
  </main>
  <SiteFooter />
</template>

<style>
/* content sits above the fixed animated background */
main,
footer {
  position: relative;
  z-index: 1;
}
</style>
