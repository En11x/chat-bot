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
    fc: 'flex justify-center',
    fb: 'flex justify-between',
    fi: 'flex items-center',
    link:'border-b hover:border-dashed border-(slate none)'
  }],
})
