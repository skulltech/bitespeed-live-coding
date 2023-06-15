import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { FromSchema } from "json-schema-to-ts";
import "dotenv/config";
import {
  envToLogger,
  createShortUrlBody,
  createShortUrlReply,
  generateUrlId,
  redirectQuery,
} from "./utils";

const prisma = new PrismaClient();

export const app = Fastify({
  // @ts-ignore
  logger: envToLogger[process.env.NODE_ENV] ?? true,
});

app.post<{
  Body: FromSchema<typeof createShortUrlBody>;
  Reply: FromSchema<typeof createShortUrlReply>;
}>(
  "/createShortUrl",
  {
    schema: {
      body: createShortUrlBody,
      response: {
        200: createShortUrlReply,
      },
    },
  },
  async (request, reply) => {
    const { longUrl } = request.body;

    // Try to insert 5 times
    for (let i = 0; i < 5; i++) {
      try {
        const urlId = generateUrlId();
        const url = await prisma.url.create({
          data: { longUrl, urlId },
        });
        return {
          urlId: url.urlId,
        };
      } catch (error) {
        // @ts-ignore. Make sure error is actually unique constraint error
        if (error.code != "P2002") throw error;
      }
    }

    // Reply with internal server error
    reply.status(500).send();
  }
);

app.get<{ Querystring: FromSchema<typeof redirectQuery> }>(
  "/redirect",
  {
    schema: {
      querystring: redirectQuery,
    },
  },
  async (request, reply) => {
    const { urlId } = request.query;

    const url = await prisma.url.findUnique({
      where: {
        urlId,
      },
    });

    if (url) reply.redirect(url.longUrl);
    else reply.callNotFound();
  }
);
