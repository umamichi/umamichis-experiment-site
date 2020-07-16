import React from 'react';
import { Link } from 'gatsby';
import styles from './post-link.module.css'; // cssのファイル名は.modulesが必要

console.log('styles:', styles);


// 記事へのリンクを生成する
const PostLink = ({ post }) => (
  <Link to={post.frontmatter.path} className={styles.link}>
    <div className={styles.linkBox}>
        <h2 className={styles.title}>{post.frontmatter.title}</h2>
        <div className={styles.date}>{post.frontmatter.date}</div>
    </div>
  </Link>
)

export default PostLink