import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'

const AboutPage = () => {
  return (
    <Layout pageTitle="About the pokemon companion app">
      <p>This is the Ultimate Pokemon Database! it has been built using gatsbyJS and utilizes vercels pokemon graphQL interface</p>
    </Layout>
  )
}



export const Head = () => <Seo title="About Me" />

export default AboutPage