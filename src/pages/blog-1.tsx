import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Layout from '../components/layout'

const getMarkdownPost = graphql`
  {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date
          }
          html
          excerpt
        }
      }
    }
  }
`

export default () => {
  const data: any = useStaticQuery(getMarkdownPost)

  return (
    <Layout>
      <div>
        <h1 style={{ display: 'inlineBlock', borderBottom: '1px solid' }}>
          Gatsby grab blog
        </h1>
        <h4>{data.allMarkdownRemark.totalCount} posts</h4>
        {data.allMarkdownRemark.edges.map(
          ({
            node,
          }: {
            node: {
              id: string
              frontmatter: { title: string; date: string }
              fields: { slug: string }
              excerpt: string
            }
          }) => (
            <div key={node.id}>
              <h3>
                <Link to={`/posts${node.fields.slug}`}>
                  {node.frontmatter.title}
                </Link>
                <span>- {node.frontmatter.date}</span>
              </h3>
              <p>{node.excerpt}</p>
            </div>
          )
        )}
      </div>
    </Layout>
  )
}
