/** @type {import('tailwindcss').Config} */
// Colorway: light aluminium case, near-white alphas, navy modifiers, one yellow Enter key.
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        case: { DEFAULT: '#E3E6EA', deep: '#D6DAE0', line: '#C3C9D2' },
        alpha: { DEFAULT: '#F7F8F9', side: '#CDD3DB' },
        ink: { DEFAULT: '#151B2B', soft: '#3F4A5E', mute: '#566074' },
        mod: { DEFAULT: '#1C2640', side: '#0C1222', legend: '#C9D2E6', soft: '#2A3656' },
        enter: { DEFAULT: '#FFC21A', side: '#C98F00', ink: '#1C2640' }
      },
      fontFamily: {
        sans: ['"Pretendard Variable"', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', '"Apple SD Gothic Neo"', '"Noto Sans KR"', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', '"JetBrains Mono"', '"Pretendard Variable"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      maxWidth: {
        measure: '42rem'
      }
    },
  },
  plugins: [],
}
