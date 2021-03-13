import { InferGetStaticPropsType, NextPage, GetStaticProps } from "next";
import { BlogListResponse } from "../types/blog";
import { client } from "../utils/api";

type StaticProps = {
  siteData: SiteDataResponse;
  blogList: BlogListResponse;
};
type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = (props) => {
  // 省略
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
