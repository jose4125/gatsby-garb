/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './header'
import './layout.css'

const getSiteMetadata: void = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        author
      }
    }
  }
`

interface LayoutProps {
  children: React.ReactNode
}

interface Metadata {
  title: string
  author: string
}

const Layout = ({ children }: LayoutProps) => {
  const data: any = useStaticQuery(getSiteMetadata)
  const { title, author }: Metadata = data.site.siteMetadata

  return (
    <>
      <Header siteTitle={title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
          }}
        >
          © {new Date().getFullYear()}, Built by {author}
        </footer>
      </div>
    </>
  )
}

export default Layout
