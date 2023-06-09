FROM node:18-alpine
RUN mkdir -p /home/user/app/node_modules && chown -R node:node /home/user/app
WORKDIR /home/user/app
COPY package*.json ./
RUN npm install
COPY --chown=node:node . .
EXPOSE 3080

CMD ["npm run start"]