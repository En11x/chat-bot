import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import UnoCSS from 'unocss/astro'
import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
  // Enable React to support React JSX components.
  integrations: [react(), UnoCSS()],
  output: 'server',
  adapter: vercel(),
})
