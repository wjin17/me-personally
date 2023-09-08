FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
COPY package*.json ./

FROM base as dev
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# 2. Rebuild the source code only when needed
FROM dev AS build
ENV SKIP_ENV_VALIDATION=true
RUN npm run build

# 3. Production image, copy all the files and run next
FROM base AS serve
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build /usr/src/app/public ./public

RUN mkdir .next

COPY --from=build --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static

RUN npm install sharp

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]