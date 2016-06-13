FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
ENV NODE_ENV production
ENV NPM_CONFIG_PRODUCTION false
ENV DEBUG app*
ENV PORT 8080
ENV DATABASE_URL mongodb://heroku_72vsvrmw:rl7hd5113dkqf45fp6nd7ilfa0@ds033797.mlab.com:33797/heroku_72vsvrmw
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 8080
CMD [ "npm", "start" ]
