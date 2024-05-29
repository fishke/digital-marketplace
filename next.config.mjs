// import MillionLint from '@million/lint';
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'utfs.io',
        protocol: 'https',
        port: ""
      }
    ]
  }
};

export default nextConfig;
// export default MillionLint.next({
//   rsc: true
// })(nextConfig);