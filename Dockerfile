# Usar Node.js como base
FROM node:18

WORKDIR /app

# Copiar los archivos necesarios
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir el frontend con Vite
RUN npm run build

EXPOSE 5173

# CMD ["npm", "run", "dev", "--", "--host"]


