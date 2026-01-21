/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
            },
            {
                protocol: 'https',
                hostname: '*.googleusercontent.com',
                port: '',
                pathname: '**',
            },
        ],
    },
    outputFileTracingIncludes: {
        '/**/*': ['./node_modules/.prisma/client/**/*'],
        '/': ['./node_modules/.prisma/client/**/*'],
    },
};

module.exports = nextConfig;
