import React from "react";
import Layout from "../components/Layout";

import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";

import { BlogListResponse } from "../types/blog";
import { SiteDataResponse } from "../types/siteData";
import { client } from "../utils/api";

type StaticProps = {
  siteData: SiteDataResponse;
  blogList: BlogListResponse;
};
type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = (props) => {
  const { siteData, blogList } = props;

  return (
    <Layout title="About">
      <div className="p-8 overflow-y-scroll leading-loose text-center text-white md:w-4/12 overscroll-y-auto h-4/5 sm:w-full">
        <h1>{siteData.title}</h1>
        <section>
          <h2 className="text-4xl text-red-700">ブログ一覧</h2>
          <ul>
            {blogList.contents.map((blog) => (
              <li key={blog.id}>
                <Link href={`/blogs/${blog.id}`}>
                  <a className="text-lg text-gray-400">{blog.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const siteDataPromise = client.v1.sitedata.$get({
    query: { fields: "title" },
  });

  const blogListPromise = client.v1.blogs.$get({
    query: { fields: "id,title" },
  });

  const [siteData, blogList] = await Promise.all([
    siteDataPromise,
    blogListPromise,
  ]);

  return {
    props: { siteData, blogList },
    revalidate: 60,
  };
};

export default Page;
