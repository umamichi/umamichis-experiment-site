/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  // metaタグ
  siteMetadata: {
    title: `Umamichi Frontend Developer 🎠`,
    description: `this is Umamichi's Frontend Develop Blog 🎠`,
    author: `@umamichi`,
    hoge: `hoge`
  },
  /* Your site config here */
  plugins: [
    // ローカルファイルのデータをGatsbyに渡せるプラグイン
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/blog`,
        name: "blog",
      },
    },
    // マークダウンを扱うプラグイン
    "gatsby-transformer-remark",
  ],
}
