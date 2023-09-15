import prisma from "../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
};

// Required fields on body: authorEmail, title
// Optional fields on body: content
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { authorEmail, title, content } = req.body;
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: authorEmail } },
    },
  });
  res.json(result);
}
