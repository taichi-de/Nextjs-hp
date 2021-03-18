import Layout from "../../components/Layout";

export default function BlogId({ blog }) {
  return (
    <Layout title="BlogId">
      <div className="flex-col items-center justify-center font-mono text-gray-200">
        <main className="p-2 my-4">
          <h1 className="text-md">{blog.title}</h1>
          <p className="my-2">{blog.publishedAt}</p>
          <p>{blog.category && `${blog.category.name}`}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: `${blog.body}`,
            }}
          />
        </main>
      </div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const key = {
    headers: { "X-API-KEY": process.env.API_KEY },
  };
  const data = await fetch("https://taizen-dev.microcms.io/api/v1/blog", key)
    .then((res) => res.json())
    .catch(() => null);
  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const key = {
    headers: { "X-API-KEY": process.env.API_KEY },
  };
  const data = await fetch(
    "https://taizen-dev.microcms.io/api/v1/blog/" + id,
    key
  )
    .then((res) => res.json())
    .catch(() => null);
  return {
    props: {
      blog: data,
    },
  };
};
