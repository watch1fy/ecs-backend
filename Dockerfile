# This Dockerfile uses node:tls image with bun installed as dependency to install and cache node_module
# and then uses oven/bun:latest as runtime to execute ts files in bun runtime

# use the official node-lts image as base
# this is to avoid node-gyp error from oven/bun image
FROM node:lts as base
WORKDIR /usr/src/app
RUN npm i -g bun@1.1.3

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install

RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# using bun as runtime
FROM oven/bun:1.1.3 AS runtime
ENV NODE_ENV production

# get the args
ARG FRONT_END_DOMAIN http://localhost:3000
ARG REDIS_URL

# setting env from ARG
ENV FRONT_END_DOMAIN ${FRONT_END_DOMAIN}
ENV REDIS_URL ${REDIS_URL}

# copy production dependencies and source code into final image
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app .

# run the app
USER bun
EXPOSE 80
ENTRYPOINT [ "bun", "run", "index.ts" ]
