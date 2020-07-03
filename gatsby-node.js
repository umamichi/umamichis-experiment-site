exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  // blogのテンプレートを指定
  const blogPostTemplate = require.resolve(`./src/templates/blog-template.js`)

  // graphQLでマークダウンファイルを取得する
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

  // Handle errors - エラーハンドリング
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // マークダウンファイル分だけ、createPageする  action.createPage から取得したmethod
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      // pathを指定
      path: node.frontmatter.slug,
      component: blogPostTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
      },
    })
  })
}