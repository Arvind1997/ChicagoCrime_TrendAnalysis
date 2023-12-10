/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        'MYSQL_HOST': 'localhost',
        'MYSQL_PORT': '3306',
        'MYSQL_DATABASE': 'project_adt',
        'MYSQL_USER': 'root',
        'MYSQL_PASSWORD': 'root',
        'PORT': '3001',
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
