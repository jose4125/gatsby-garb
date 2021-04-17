import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import Layout from '../components/layout'

const getImageData = graphql`
  {
    allFile {
      edges {
        node {
          relativePath
          size
          extension
          birthTime
        }
      }
    }
  }
`

interface ImageNode {
  relativePath: string
  size: number
  extension: string
  birthTime: string
}

interface EdgeNode {
  node: ImageNode
}

interface Edges {
  edges: EdgeNode[]
}

export default () => {
  const imageData: any = useStaticQuery(getImageData)
  const edgesList: Edges['edges'] = imageData.allFile.edges

  return (
    <Layout>
      <div>
        <h1>hello page 3</h1>
        <table>
          <thead>
            <tr>
              <th>relative path</th>
              <th>size</th>
              <th>extension</th>
              <th>birth time</th>
            </tr>
          </thead>
          <tbody>
            {edgesList.map(({ node }: EdgeNode) => (
              <tr key={node.relativePath}>
                <td>{node.relativePath}</td>
                <td>{node.size}</td>
                <td>{node.extension}</td>
                <td>{node.birthTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/page-2">go to page 2</Link>
      </div>
    </Layout>
  )
}
