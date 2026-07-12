FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
# Copia as pastas e arquivos para dentro do container
COPY src/ ./src/
COPY public/ ./public/
EXPOSE 3000
CMD ["node", "src/index.js"]
