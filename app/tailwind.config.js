module.exports = {
  content: ["./pages/**/*.tsx"],
  theme: {
    container: {
      center: true
    },
    extend: {}
  },
  plugins: [require("@tailwindcss/forms")]
};
