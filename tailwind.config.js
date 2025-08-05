module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'], // ← 경로는 프로젝트 구조에 따라 수정
    theme: {
        extend: {
        keyframes: {
            fadeUp: {
            '0%': { opacity: 0, transform: 'translateY(16px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
            },
        },
        animation: {
            fadeUp: 'fadeUp 0.6s ease-out forwards',
        },
        },
    },
    plugins: [],
};
