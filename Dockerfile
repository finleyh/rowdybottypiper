FROM alpine:latest
RUN apk --no-cache add nodejs npm xvfb xvfb-run chromium
WORKDIR /usr/app

COPY . /usr/app
RUN npm install puppeteer-extra puppeteer-extra-plugin-stealth
RUN chmod +x run.sh
ENTRYPOINT ["sh","run.sh"]
