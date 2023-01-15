import { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '~/components/Layout'
import { apiClient } from '~/utils/apiClient'
import type { ArticleInfo } from '$/service/article'

export type Query = {
  id: number
}

const Article: NextPage = () => {
  const router = useRouter()
  const [article, setArticle] = useState<ArticleInfo | null>(null)
  useEffect(() => {
    apiClient.article
      ._articleId(Number.parseInt(router.query.id as string, 10))
      .$get()
      .then((article) => {
        setArticle(article)
      })
  }, [router.query.id])
  return (
    <Layout>
      <Head>
        <title>{article?.title ?? 'Loading...'}</title>
      </Head>
      {article ? (
        <>
          <h1>{article.title}</h1>
          <pre>{article.body}</pre>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Layout>
  )
}

export default Article
