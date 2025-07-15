module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-satorare`,
      options: {
        path: `${__dirname}/src/components/OgImage.jsx`,
        width: 1200,
        height: 630,
        fonts: [
          {
            name: `Inter`,
            path: `${__dirname}/src/assets/fonts/Inter-Regular.ttf`,
            weight: 400,
            style: "normal",
          },
          {
            name: `Inter`,
            path: `${__dirname}/src/assets/fonts/Inter-Bold.ttf`,
            weight: 700,
            style: "normal",
          },
        ],
        target_nodes: ["MarkdownRemark"], // Add your node types here
      },
    },
    // ... other plugins
  ],
};
