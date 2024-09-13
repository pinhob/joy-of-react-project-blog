import React from 'react';

import BlogHero from '@/components/BlogHero';

import { MDXRemote } from 'next-mdx-remote/rsc';

import styles from './postSlug.module.css';

import { loadBlogPost } from '@/helpers/file-helpers';
import CodeSnippet from '@/components/CodeSnippet';


export const getPostData = React.cache(async (postSlug) => {
  return await loadBlogPost(postSlug);
});

export async function generateMetadata({ params }, parent) { 
  const metadata = await getPostData(params.postSlug);

  return {
    title: metadata.frontmatter.title,
    description: metadata.frontmatter.abstract
  }
}


async function BlogPost({ params }) {
  const post = await getPostData(params.postSlug)

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={post.frontmatter.title}
        publishedOn={post.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote 
          source={post.content}
          components={{
            pre: CodeSnippet
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
