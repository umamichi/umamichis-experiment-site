import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Layout from "../components/layout"

const GetMarkdown = () => {
  console.log('useStaticQuery:', useStaticQuery);
  
  // useStaticQuery は gatsby に用意されているメソッド
  // ビルド時にGraphQLでクエリすることができる
  // https://www.gatsbyjs.org/docs/use-static-query/#composing-custom-usestaticquery-hooks
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        totalCount
        edges {
          node {
            id
            html # 本文をHTMLに変換して取得する
            frontmatter {
              title
              date(formatString: "YYYY年MM月DD日")
            }
            excerpt # 本文抜粋
          }
        }
      }
    }
  `);

  console.log('data:', data);

  return (
    <Layout>
      <strong>投稿数 ( {data.allMarkdownRemark.totalCount} ) </strong>
      {data.allMarkdownRemark.edges.map(
        ({
          node: {
            id,
            html,
            frontmatter: { title, date },
            excerpt,
          },
        }) => (
          <div key={id}>
            <Link to="/">{title}</Link>
          {/* //   <div>{date}</div>
          //   <h2>{title}</h2>
          //   <p>本文抜粋：{excerpt}</p>
          //   <div dangerouslySetInnerHTML={{ __html: html }} /> */}
          </div>
        )
      )}

    </Layout>
  )
}

export default GetMarkdown;