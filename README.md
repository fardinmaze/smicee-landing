# SMICEE landing

Landing page for SMICEE (Smart Office). Vue 3 + Vite + JavaScript, plain CSS.

Content comes from https://smicee.com/ (see src/data/content.js). Design follows NextCart (indigo/magenta/amber, rounded pills, big radii) with a Monday-style friendly tone.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview  # serve the production build
```

## Structure

```
public/images/   logos and screenshots from smicee.com
src/
  assets/main.css   design tokens + base styles
  data/content.js   ALL page copy
  directives/       v-reveal scroll-in animation
  components/       one file per section
```

`@` is an alias for `src/` (e.g. `import X from '@/components/X.vue'`).
