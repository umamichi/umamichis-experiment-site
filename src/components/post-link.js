import React from "react"
import { Link } from "gatsby"

// 記事へのリンクを生成する
const PostLink = ({ post }) => (
  <div>
    <Link to={post.frontmatter.slug}>
      {post.frontmatter.title} ({post.frontmatter.date})
    </Link>
  </div>
)

export default PostLink