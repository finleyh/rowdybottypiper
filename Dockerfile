FROM alpine:latest
RUN apk --no-cache add nodejs npm xvfb xvfb-run chromium
WORKDIR /usr/app

COPY . /usr/app
RUN npm install puppeteer-extra puppeteer-extra-plugin-stealth

ENTRYPOINT ["sh","-c","xvfb-run --server-args='-screen 0 1920x1080x24' node example1.js"]
