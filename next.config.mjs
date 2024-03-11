/** @type {import('next').NextConfig} */
const nextConfig = {
	
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push(
      {
        test: /\.md$/,
        // This is the asset module.
        type: 'asset/source',
      }
    )
    return config
  },
    typescript: {
     ignoreBuildErrors: true,
  },
  output:"export",
  basePath:process.env.HOST === "Vercel" ? "/" : "/Tour-of-Json-Schema"
  

};

export default nextConfig;
