/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "v5.airtableusercontent.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
