import withPWAInit from "@ducanh2912/next-pwa";

// const withPwa = nextPwa({
//     dest: "public",
//     disable: process.env.NODE_ENV === "development", // 👈 DISABLING PWA IN DEVELOPMENT MODE
//     register: true,
//     skipWaiting: true,
//     runtimeCaching,
// });

// const nextConfig = withPwa({
//     reactStrictMode: false, // 👈 DISABLING THIS TO AVOID DOUBLE RENDER
// });

// export default nextConfig;

const withPWA = withPWAInit({
    dest: "public",
});

export default withPWA({
    reactStrictMode: false,
});
