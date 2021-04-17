import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { StaticImage, GatsbyImage, Layout as layout } from 'gatsby-plugin-image'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = ({
  data,
}: {
  data: {
    file: {
      childImageSharp: {
        gatsbyImageData: {
          height: number
          images: object
          layout: layout
          placeholder: object
          width: number
        }
      }
    }
  }
}) => {
  console.log('data', data)
  const image = data.file.childImageSharp.gatsbyImageData

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <StaticImage
        src="../images/gatsby-astronaut.png"
        width={300}
        alt="A Gatsby astronaut"
        placeholder="blurred"
        style={{ marginBottom: `1.45rem` }}
      />
      <GatsbyImage image={image} alt="test" />
      <p>
        <Link to="/page-2/">Go to page 2</Link> <br />
        <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
      </p>
    </Layout>
  )
}

export const queryImage = graphql`
  query {
    file(relativePath: { eq: "gatsby-icon.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 590
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
`

export default IndexPage
