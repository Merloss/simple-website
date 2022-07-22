module.exports = {
  darkMode: "class",
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`,
  ],
  theme: {
    extend: {
      keyframes: {
        wavey: {
          "0%": { transform: "rotate(0.0deg)" },
          "15%": { transform: "rotate(14.0deg)" },
          "30%": { transform: "rotate(-8.0deg)" },
          "40%": { transform: "rotate(14.0deg)" },
          "50%": { transform: "rotate(-4.0deg)" },
          "60%": { transform: "rotate(10.0deg)" },
          "70%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
        skeleton: {
          "0%": {
            opacity: 0.1,
            transform: " translateX(-300%)",
          },
          "50%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0.1,
            transform: " translateX(300%)",
          },
        },
      },
      animation: {
        wavey: "wavey 1.5s infinite",
        skeleton: "skeleton 2s infinite",
      },
    },
  },
};
