import * as React from 'react'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const BlogPost = ({ data, children }) => {
  const image = getImage(data.mdx.frontmatter.image_link)

  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <p>{data.mdx.frontmatter.date}</p>
      <GatsbyImage
      image={image}
      //alt={data.mdx.frontmatter.hero_image_alt}
    />
      {children}
    </Layout>
  )
}

export const query = graphql`
 
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        image_link {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      body
    }
  }
`



export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />

export default BlogPost