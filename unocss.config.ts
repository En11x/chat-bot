import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
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
          position: 'relative',
        },
      },
    }),
  ],
  shortcuts:[{
    'fc':'flex justify-center',
    'fb': 'flex justify-between'
  }]
})
