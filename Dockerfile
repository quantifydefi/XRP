FROM node:16.14.0-alpine

# create destination directory
RUN mkdir -p /usr/src/evmx-ui
WORKDIR /usr/src/evmx-ui


ARG AMCHARTS_LICENSE
ARG BASE_GRAPHQL_SERVER_URL
ARG BASE_URL
ARG GA_ID

ENV ENVBASE_GRAPHQL_SERVER_URL=$BASE_GRAPHQL_SERVER_URL
ENV AMCHARTS_LICENSE=$AMCHARTS_LICENSE
ENV BASE_URL=$BASE_URL
ENV GA_ID=$GA_ID

# update and install dependency
RUN apk update && apk upgrade
RUN apk --no-cache add curl

# copy the app, note .dockerignore
COPY . /usr/src/evmx-ui/

RUN npm install

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build


# start the app
CMD [ "npm", "start" ]
