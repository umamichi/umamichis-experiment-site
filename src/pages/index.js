import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostLink from "../components/post-link"
// import picture1 from "../images/picture1.jpg";

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  console.log('edges:', edges);
  
  // ブログ一覧
  const Posts = edges
    // 日付があるものだけ選択？
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />);

  return (
    <Layout>
      <SEO title="Home" />
      <h1>index.js</h1>
      {/* <img src={picture1} alt="picture1" style={{ width: `300px`, marginBottom: `1.45rem` }} /> */}
      <div>{Posts}</div>
    </Layout>
  );
}

export default IndexPage

// マークダウンから情報を取得
export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
          }
        }
      }
    }
  }
`
