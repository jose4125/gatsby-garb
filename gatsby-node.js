const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const PostTemplate = path.resolve('./src/templates/post-template.tsx')
const BlogTemplate = path.resolve('./src/templates/blog-template.tsx')
const ProductTemplate = path.resolve('./src/templates/product-template.tsx')

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === 'MarkdownRemark') {
    const { createNodeField } = actions
    const slug = createFilePath({ node, getNode, basePath: 'posts' })
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      allContentfulProduct {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  const posts = result.data.allMarkdownRemark.edges

  /* programmatically creates internal post pages */
  posts.forEach(({ node: post }) => {
    createPage({
      path: `posts${post.fields.slug}`,
      component: PostTemplate,
      context: {
        slug: post.fields.slug,
      },
    })
  })

  /* programmatically creates pagination in main blog page */
  const postPerPage = 2
  const totalPages = Math.ceil(posts.length / postPerPage)
  Array.from({ length: totalPages }).forEach((_, index) => {
    const currentPage = index + 1
    const isFirstPage = index === 0
    const isLastPage = currentPage === totalPages

    console.log('skip', index * postPerPage)
    createPage({
      path: isFirstPage ? '/blog' : `/blog/${currentPage}`,
      component: BlogTemplate,
      context: {
        limit: postPerPage,
        skip: index * postPerPage,
        isFirstPage,
        isLastPage,
        currentPage,
        totalPages,
      },
    })
  })

  /* programmatically creates internal product pages */
  const products = result.data.allContentfulProduct.edges
  products.forEach(({ node: product }) => {
    createPage({
      path: `/products/${product.slug}`,
      component: ProductTemplate,
      context: {
        slug: product.slug,
      },
    })
  })
}
