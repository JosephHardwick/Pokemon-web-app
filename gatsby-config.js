/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Pokemon Companion App`,
    description: `database of pokemon`,
    author: `@gatsbyjs`,
  },
  
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/blog/`,
      },
    },
    `gatsby-plugin-mdx`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    
    {
      resolve: "gatsby-source-graphql",
      options: {
        // This type will contain remote schema Query type
        typeName: "PokeAPI",
        // This is field under which it's accessible
        fieldName: "pokeapi",
        url: `https://graphql-pokeapi.vercel.app/api/graphql`,
      },
    },
    `gatsby-plugin-postcss`, // Add this plugin for CSS Modules support

  ],
};