import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;

  if (method == "POST") {
    const jsonBody = JSON.parse(body);
    const url = jsonBody["url"];

    if (!url) {
      res.statusCode = 500;
      res.json({ message: "Link to short is not set!" });
      return;
    }

    // Check if slug exists
    var exists = false;
    var slug: string;
    do {
      slug = Math.random().toString(36).slice(2, 7);
      const response = await prisma.shortLink.findFirst({
        where: {
          slug: {
            equals: slug,
          },
        },
      });

      if (response) {
        exists = true;
      }
    } while (exists);

    const response = await prisma.shortLink.create({
      data: {
        url: url,
        slug: slug,
      },
    });

    res.statusCode = 201;
    res.json({ link: response, message: "Link is now short" });
    return;
  } else {
    res.statusCode = 402;
    res.json({ message: "Wrong request method used!" });
    return;
  }
};
