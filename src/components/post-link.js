import React from 'react';
import { Link } from 'gatsby';
import styles from './post-link.module.css'; // cssのファイル名は.modulesが必要

console.log('styles:', styles);


// 記事へのリンクを生成する
const PostLink = ({ post }) => (
  <div className={styles.linkBox}>
    <Link to={post.frontmatter.slug} className={styles.link}>
      <h2 className={styles.title}>{post.frontmatter.title}</h2>
      <div className={styles.date}>{post.frontmatter.date}</div>
    </Link>
  </div>
)

export default PostLink