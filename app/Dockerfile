FROM node:20-alpine

# Define working directory
WORKDIR /usr/src/app

# takes both package json and copies them in the docker image
COPY package*.json ./

# install all dependencies on the base image
RUN npm install

# Exponer el puerto
EXPOSE 3000

# Comando por defecto
CMD ["npx", "ts-node-dev", "--respawn", "--transpile-only", "src/index.ts"]
