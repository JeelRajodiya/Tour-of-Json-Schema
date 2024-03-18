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

  output:process.env.HOST ==="Vercel" ? "standalone" : "export",
  basePath:process.env.HOST === "Vercel" ? "" : "/Tour-of-Json-Schema"
  

};

export default nextConfig;
