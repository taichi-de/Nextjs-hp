const exitPreview = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const id = toStringId(req.query.id);
  const post = await client.v1.blogs._id(id).$get({
    query: { fields: "id" },
  });

  res.clearPreviewData();
  res.writeHead(307, { Location: post ? `/blogs/${post.id}` : "/" });
  res.end();
};

export default exitPreview;
