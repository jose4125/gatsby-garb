import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import netlifyIdentity from 'netlify-identity-widget'

interface Iprops {
  to: string
  children: string
}

const isActive = ({ isCurrent }: { isCurrent: boolean }) => {
  return { className: isCurrent ? 'active' : 'navlink' }
}
const NavLink = (props: Iprops) => <Link getProps={isActive} {...props} />

interface HeaderProps {
  siteTitle: string
}

const Header = ({ siteTitle }: HeaderProps) => {
  useEffect(() => {
    netlifyIdentity.init()
  })

  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <StaticImage
          src="../images/gatsby-icon.png"
          width={40}
          alt="Gatsby logo"
          placeholder="blurred"
        />
        <NavLink to="/">{siteTitle}</NavLink>
        <NavLink to="/blog">blog</NavLink>
        <NavLink to="/products">products</NavLink>
        <div data-netlify-identity-menu></div>
        <div className="snipcart-summary snipcart-checkout">
          <div>
            <strong>my cart</strong>
          </div>
          <div>
            <span className="snipcart-total-items"></span> items
          </div>
        </div>
      </div>
    </header>
  )
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
