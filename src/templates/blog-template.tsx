import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import { array } from 'prop-types'

interface INode {
  node: {
    excerpt: string
    html: string
    id: string
    fields: { slug: string }
    frontmatter: { date: string; title: string }
  }
}

interface IPageContent {
  currentPage: number
  isFirstPage: boolean
  isLastPage: boolean
  limit: number
  skip: number
  totalPages: number
}

export default ({
  data,
  pageContext,
}: {
  data: {
    allMarkdownRemark: {
      totalCount: number
      edges: INode[]
    }
  }
  pageContext: IPageContent
}) => {
  const {
    currentPage,
    isFirstPage,
    isLastPage,
    limit,
    skip,
    totalPages,
  }: IPageContent = pageContext
  console.log('data', data.allMarkdownRemark.edges)
  console.log('pageContext', pageContext)
  const nextPage = `/blog/${String(currentPage + 1)}`
  const prevPage =
    currentPage - 1 === 1 ? `/blog` : `/blog/${String(currentPage - 1)}`

  return (
    <Layout>
      <div>
        <h1 style={{ display: 'inlineBlock', borderBottom: '1px solid' }}>
          Gatsby grab blog
        </h1>
        <h4>{data.allMarkdownRemark.totalCount} posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }: INode) => (
          <div key={node.id}>
            <h3>
              <Link to={`/posts${node.fields.slug}`}>
                {node.frontmatter.title}
              </Link>
              <span>- {node.frontmatter.date}</span>
            </h3>
            <p>{node.excerpt}</p>
          </div>
        ))}
      </div>
      <div>
        {!isFirstPage && (
          <Link to={prevPage} rel="prev">
            prev
          </Link>
        )}
        {Array.from({ length: totalPages }, (_, index) => (
          <Link key={index} to={`/blog/${index === 0 ? '' : index + 1}`}>
            {index + 1}
          </Link>
        ))}
        {!isLastPage && (
          <Link to={nextPage} rel="next">
            next
          </Link>
        )}
      </div>
    </Layout>
  )
}

export const getMarkdownPost = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      skip: $skip
      limit: $limit
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "ddd, MMMM DD YYYY")
          }
          html
          excerpt
        }
      }
    }
  }
`
