# use the official node-lts image as base
# this is to avoid node-gyp error from oven/bun image
FROM node:lts as base
WORKDIR /usr/src/app
RUN npm i -g bun

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

# copy production dependencies and source code into final image
FROM oven/bun:latest AS release
ENV FRONT_END_DOMAIN=http://localhost:3000
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app .

# run the app
USER bun
EXPOSE 8080
ENTRYPOINT [ "bun", "run", "index.ts" ]