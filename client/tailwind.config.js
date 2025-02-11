/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily :{
        zentry :['zentry','sanf-serif'],

        general: ['general','sanf-serif'],

        'circular-wed' :['curcular-wed','sanf-serif'],

        'robert-medium' :['robert-medium','sanf-serif'],

        'robert-regular' :['robert-regular','sanf-serif'],
      },
      colors:{
        "primary":"#2452d1",
        "primary-light":"#ffc929",
        "secondary":"#00b050",
        "secondary-light":"#0b1a78",
        "orther1":"#FCCC63",
        "other2":"#1DA1F2"
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-none': {
          '-webkit-overflow-scrolling': 'touch',
          'scrollbar-width': 'none', // Ẩn thanh cuộn trên Firefox
          '&::-webkit-scrollbar': {
            display: 'none', // Ẩn thanh cuộn trên Chrome, Safari
          },
        },
        
      });
    },
  ],
}