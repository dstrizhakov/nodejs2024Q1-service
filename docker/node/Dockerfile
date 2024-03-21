FROM node:20.11.1 as build

WORKDIR /app
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .

FROM node:20.11.1 as main
WORKDIR /app
COPY --from=build /app /app
CMD ["npm", "run", "start:docker"]
EXPOSE ${PORT}