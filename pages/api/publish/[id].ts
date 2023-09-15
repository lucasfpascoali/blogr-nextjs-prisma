import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const postId = String(req.query.id);
  const post = await prisma.post.update({
    where: { id: postId },
    data: { published: true },
  });
  res.json(post);
}
