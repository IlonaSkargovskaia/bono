/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "bono-webapp-causes-images.s3.amazonaws.com",
            },
        ],
    },
};

export default nextConfig;
