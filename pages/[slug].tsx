export const getStaticProps = async (context) => {
  const slug = context.params?.slug;
  const draftKey = context.previewData?.draftKey;
  const content = await fetch(
    `https://taizen-dev.microcms.io/api/v1/blogs/${slug}${
      draftKey !== undefined ? `?draftKey=${draftKey}` : ""
    }`,
    { headers: { "X-API-KEY": process.env.apiKey || "" } }
  ).then((res) => res.json());
  return {
    props: {
      content,
    },
  };
};
