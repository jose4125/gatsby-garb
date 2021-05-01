import React, { useEffect, useState } from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image'
import netlifyIdentity from 'netlify-identity-widget'
import Layout from '../components/layout'

interface Idata {
  data: {
    allContentfulProduct: {
      edges: [node: Iproduct]
    }
  }
}

interface Iproduct {
  node: {
    id: string
    slug: string
    name: string
    price: number
    private: boolean
    active: boolean
    productImage: {
      altText: string
      image: IGatsbyImageData
    }
  }
}

export default ({ data: { allContentfulProduct } }: Idata) => {
  console.log('datal', allContentfulProduct)
  const [products, setProducts] = useState<Iproduct[]>([])

  useEffect(() => {
    getProducts()
    netlifyIdentity.on('login', user => getProducts(user))
    netlifyIdentity.on('logout', () => getProducts())
  }, [])

  const getProducts = (user?: netlifyIdentity.User) => {
    console.log('user', user)
    const allProducts = allContentfulProduct.edges.filter(
      ({ node: product }) => product.active
    )
    const publicProducts = allContentfulProduct.edges.filter(
      ({ node: product }) => !product.private && product.active
    )
    const productList =
      netlifyIdentity.currentUser() !== null ? allProducts : publicProducts
    setProducts(productList)
  }

  return (
    <Layout>
      <h1>Products</h1>
      {products.map(({ node: product }: Iproduct) => {
        console.log('product', product.productImage)
        const image = getImage(product.productImage.image)
        console.log('image', image)
        return (
          <div key={product.id}>
            <Link to={`/products/${product.slug}`}>
              <h2>{product.name}</h2>
              <p>price: ${product.price}</p>
              {image && (
                <GatsbyImage image={image} alt={product.productImage.altText} />
              )}
            </Link>
            <hr />
          </div>
        )
      })}
    </Layout>
  )
}

export const produtsQuery = graphql`
  {
    allContentfulProduct {
      edges {
        node {
          id
          slug
          name
          price
          private
          active
          productImage {
            altText
            image {
              gatsbyImageData(
                width: 400
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )
              file {
                url
              }
            }
          }
        }
      }
    }
  }
`
