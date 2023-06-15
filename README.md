# bitespeed-live-coding

Live coding assignment at BiteSpeed.

## Local development

1. Bring up a local Postgres instance by running
   ```
   docker compose up
   ```
2. Apply database migrations by running
   ```
   yarn prisma migrate dev
   ```
3. Run the Fastify server using
   ```
   yarn start
   ```
