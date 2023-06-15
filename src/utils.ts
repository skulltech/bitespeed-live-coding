export const generateUrlId = () => (Math.random() + 1).toString(36).slice(2, 8);

export const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
    },
  },
  production: true,
  test: false,
};

// Schema of POST body of createShortUrl endpoint
export const createShortUrlBody = {
  type: "object",
  properties: {
    longUrl: {
      type: "string",
    },
  },
  required: ["longUrl"],
} as const;

// Schema of success response of createShortUrl endpoint
export const createShortUrlReply = {
  type: "object",
  properties: {
    urlId: {
      type: "string",
    },
  },
  required: ["urlId"],
} as const;

// Schema of query string of redirect endpoint
export const redirectQuery = {
  type: "object",
  properties: {
    urlId: {
      type: "string",
    },
  },
  required: ["urlId"],
} as const;
