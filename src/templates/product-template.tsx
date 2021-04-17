import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import Layout from '../components/layout'

interface Idata {
  data: {
    contentfulProduct: {
      name: string
      price: string
      slug: string
      productImage: {
        altText: string
        image: {
          gatsbyImageData: IGatsbyImageData
          file: {
            url: string
          }
        }
      }
      description: string
      createdAt: string
    }
  }
  location: {
    pathname: string
  }
}

export default ({ data: { contentfulProduct }, location }: Idata) => {
  console.log('data', contentfulProduct)
  const image = contentfulProduct.productImage.image.gatsbyImageData

  return (
    <Layout>
      <div>
        <h2>{contentfulProduct.name}</h2>
        <small>Added on {contentfulProduct.createdAt}</small>
        <p>price: ${contentfulProduct.price}</p>
        <p>{contentfulProduct.description}</p>
        <div>
          <button
            className="snipcart-add-item"
            data-item-id={contentfulProduct.slug}
            data-item-price={contentfulProduct.price}
            data-item-image={contentfulProduct.productImage.image.file.url}
            data-item-name={contentfulProduct.name}
            data-item-url={location.pathname}
          >
            Add to cart
          </button>
        </div>
        <GatsbyImage
          image={image}
          alt={contentfulProduct.productImage.altText}
        />
      </div>
    </Layout>
  )
}

export const Product = graphql`
  query($slug: String!) {
    contentfulProduct(slug: { eq: $slug }) {
      name
      price
      slug
      productImage {
        altText
        image {
          gatsbyImageData(
            width: 800
            placeholder: BLURRED
            formats: [AUTO, WEBP]
          )
          file {
            url
          }
        }
      }
      description
      createdAt(formatString: "MMMM Do, YYYY, h:mm:ss a")
    }
  }
`
