FROM node:12.7.0-alpine

# create destination directory
RUN mkdir -p /usr/src/qc-nuxt-defi-server
WORKDIR /usr/src/qc-defi-nuxt-server

# update and install dependency
RUN apk update && apk upgrade

# copy the app, note .dockerignore
COPY . /usr/src/qc-defi-nuxt-server/
RUN npm install

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build

# start the app
CMD [ "npm", "start" ]
