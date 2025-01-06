/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        "primary-100": "var(--primary-color-100)",
        "primary-800": "var(--primary-color-800)",
        nero: "#1D1D1D",
        grayishBlue: "#2D3748",
        lightGrey: "#D1D1D1",
        red: {
          DEFAULT: "#FF0000",
          american: "#B22234",
          radical: "#F93C65",
          sunset: "#FC544B",
        },
        black: {
          DEFAULT: "#000000",
          raisin: "#202224",
          "raisin-900": "rgb(32, 34, 36, 0.9);",
          coral: "#5D6369",
        },
        gray: {
          dim: "#6B6B6B",
          tundora: "#404040",
          devy: "#565656",
          charcoal: "#43474B",
          suva: "#888181",
          ash: "#969CA2",
        },
        white: {
          DEFAULT: "#FFFFFF",
          ghost: "#F5F6FA",
        },
        blue: {
          alice: "#FAFBFD",
          DEFAULT: "#0000FF",
          bondi: "#00B69B",
          dusty: "#7E92A2",
          darkMidnight: "#092C4C",
          dark: "#16151C",
          pale: "#F5F9FF",
        },
        lavenderBlush: "#FFF2F5",
        quratz: "#CFCFEA",
        frostProof: "#D6F4F8",
        mintJelly: "#4AD991",
        mistyRose: "#FFE2E3",
        pampas: "#C4E2D2",
        solitude: "#EAEEF4",
        violet: "#6226EF",
        purple: {
          electric: "#BA29FF",
        },
        orange: {
          sunset: "#EF3826",
        },
        green: {
          mediumTeal: "#00B69B",
        },
      },
      width: {
        "14px": "14px",
        "40px": "40px",
        "320px": "320px",
      },
      height: {
        "14px": "14px",
        "40px": "40px",
        "54px": "54px",
        "320px": "320px",
      },
      fontSize: {
        "14px": "14px",
        "16px": "16px",
        "20px": "20px",
        "22px": "22px",
        "26px": "26px",
        "28px": "28px",
      },
      margin: {
        "20px": "20px",
        "32px": "32px",
        "44px": "44px",
      },
      borderRadius: {
        "14px": "14px",
      },
      gridTemplateColumns: {
        "350px": "repeat(auto-fit, minmax(320px, 1fr))",
      },
      gap: {
        "10px": "10px",
        "18px": "18px",
        "20px": "20px",
      },
    },
  },
  plugins: [],
};
