import { extendTheme } from '@mui/joy/styles';

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          plainBg: 'var(--color-white)',
          plainColor: 'var(--color-cyan-500)',
          plainHoverBg: 'var(--color-cyan-500)',
          plainHoverColor: 'var(--color-white)',
          plainActiveBg: 'var(--color-cyan-500)',
          plainActiveColor: 'var(--color-white)',

          outlinedBg: 'var(--color-white)',
          outlinedColor: 'var(--color-cyan-500)',
          outlinedBorder: '1px solid var(--color-cyan-500)',
          outlinedHoverBg: 'var(--color-cyan-500)',
          outlinedHoverColor: 'var(--color-white)',
          outlinedHoverBorder: '1px solid var(--color-cyan-500)',
          outlinedActiveBg: 'var(--color-cyan-500)',
          outlinedActiveColor: 'var(--color-white)',
          outlinedActiveBorder: '1px solid var(--color-cyan-500)',

          softBg: 'color-mix(in srgb, var(--color-cyan-500), transparent 30%)',
          softColor: 'var(--color-white)',
          softHoverBg: 'var(--color-cyan-500)',
          softHoverColor: 'var(--color-white)',
          softActiveBg: 'var(--color-cyan-500)',
          softActiveColor: 'var(--color-white)',

          solidBg: 'var(--color-cyan-500)',
          solidHoverBg: 'var(--color-cyan-600)',
          solidActiveBg: 'var(--color-cyan-600)',
        },
        neutral: {
          outlinedBorder: 'var(--color-gray-400)',
          solidBg: 'color-mix(in srgb, var(--color-cyan-500), transparent 50%)',

          softBg: 'var(--color-white)',
          softBorder:
            'color-mix(in srgb, var(--color-gray-500), transparent 50%)',
        },
        danger: {
          outlinedBg: 'var(--color-white)',
          outlinedColor: 'var(--color-rose-500)',
          outlinedBorder: '1px solid var(--color-rose-500)',
          outlinedHoverBg: 'var(--color-rose-500)',
          outlinedHoverColor: 'var(--color-white)',
          outlinedHoverBorder: '1px solid var(--color-rose-500)',
          outlinedActiveBg: 'var(--color-rose-500)',
          outlinedActiveColor: 'var(--color-white)',
          outlinedActiveBorder: '1px solid var(--color-rose-500)',

          solidBg: 'var(--color-rose-500)',
          solidHoverBg: 'var(--color-rose-600)',
          solidActiveBg: 'var(--color-rose-600)',
        },
        divider: 'var(--color-gray-400)',
      },
    },
  },
  // components: {
  //   JoySelect: {
  //     defaultProps: {
  //       indicator: '↕',
  //     },
  //   },
  // },
});
