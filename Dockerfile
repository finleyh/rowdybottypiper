FROM node:20-alpine
RUN apk add xvfb xvfb-run chromium

WORKDIR /usr/app
COPY . /usr/app

RUN npm install

CMD ["xvfb-run","node","example1.js"]
