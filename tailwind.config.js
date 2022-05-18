module.exports = {
    content: ["./src/**/*.{js,jsx}", "./pages/**/*.{js,jsx}"],
    theme: {
      extend: {
        fontFamily: {
          roboto: ["Roboto"],
          inter: ["Inter"],
          condensed: ["Roboto Condensed"]
        },
        colors: {
          caak: {
            primary: "#FF6600",
            black: "#111111",
            darkGray: "#555555",
            lightGray: "#D4D8D8",
            red: "#D4D8D8",
            gray: "#909090",
            light: "#EFEEEF",
          },
        },
      },
    },
    plugins: [],
  };
  