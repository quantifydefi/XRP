FROM node:16.14.0-alpine

# create destination directory
RUN mkdir -p /usr/src/qc-nuxt-defi-server
WORKDIR /usr/src/qc-defi-nuxt-server

# update and install dependency
RUN apk update && apk upgrade
RUN apk --no-cache add curl

# copy the app, note .dockerignore
COPY . /usr/src/qc-defi-nuxt-server/
RUN npm install

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build

HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1

# start the app
CMD [ "npm", "start" ]
