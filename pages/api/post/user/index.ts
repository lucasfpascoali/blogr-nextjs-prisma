import prisma from "../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id: string;
  name: string;
  email: string;
  emailVerified: Date;
  image: string;
};

// Required fields in body: name, email
// Optional fields in body:
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name, email } = req.body;

  const result = await prisma.user.create({
    data: {
      name: name,
      email: email,
    },
  });
  res.json(result);
}
