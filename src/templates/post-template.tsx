import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

export default ({
  data: post,
}: {
  data: {
    markdownRemark: {
      html: string
      frontmatter: {
        title: string
        date: string
      }
    }
  }
}) => (
  <Layout>
    <div>
      <h1>{post.markdownRemark.frontmatter.title}</h1>
      <p>{post.markdownRemark.frontmatter.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.markdownRemark.html }}></div>
    </div>
  </Layout>
)

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
      excerpt
    }
  }
`
