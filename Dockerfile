# Usa imagem oficial do Node.js
FROM node:20

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto
COPY package*.json ./
RUN npm install

COPY . .

# Build para produção
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]
