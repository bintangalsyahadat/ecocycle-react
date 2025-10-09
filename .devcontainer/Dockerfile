FROM node:20-slim

WORKDIR /deploy/workdir

USER root

RUN apt-get update && apt-get install -y \
    git \
    openssh-client \
    && rm -rf /var/lib/apt/lists/*

COPY workdir/package*.json ./
RUN npm install

RUN chown -R node:node /deploy

USER node