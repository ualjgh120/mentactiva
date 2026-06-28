import { defineConfig, type PluginOption, type UserConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Definimos un tipo que combine la configuración de Vite con la de Vitest
import type { InlineConfig } from 'vitest'

interface VitestConfigExport extends UserConfig {
  test?: InlineConfig
}

export default defineConfig({
  plugins: [
    react() as PluginOption,
    tailwindcss() as PluginOption,
  ],
  // Configuración de los Tests
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
} as VitestConfigExport)
