import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const slug = req.query["slug"];

    if (!slug || typeof slug !== "string") {
        res.status(404).json({ message: "Not found" });
        return;
    }

    const data = await prisma.shortLink.findFirst({
        where: { slug: { equals: slug } },
    });

    if (!data) {
        res.status(404).json({ message: "Slug not found" });
        return;
    }

    return res.json(data);
};
