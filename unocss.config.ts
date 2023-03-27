import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.1,
      cdn: 'https://esm.sh/',
    }),
    presetTypography({
      cssExtend: {
        'ul,ol': {
          'padding-left': '2.25em',
          'position': 'relative',
        },
      },
    }),
  ],
  transformers:[transformerVariantGroup()],
  shortcuts: [{
    'f-c': 'flex justify-center',
    'f-c-c':'f-c items-center',
    'f-b': 'flex justify-between',
    'f-i': 'flex items-center',
    'base-focus':'focus:(bg-op-20 ring-0 outline-none)',
    link:'border-b hover:border-dashed border-(slate none)',
    'slate-btn':'h-12 px-4 py-2 bg-(slate op-15) rounded-sm hover:bg-op-20',
    textarea: 'w-full px-3 py-3 min-h-12 max-h-36 rounded-sm bg-(slate op-15) resize-none base-focus placeholder:op-50 dark:(placegolder:op-30) scroll-pa-8px'
  }],
})
