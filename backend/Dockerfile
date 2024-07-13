# Gunakan image node resmi
FROM node:18

# Buat direktori kerja di dalam container
WORKDIR /imageapp/src/app

# Copy file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies

RUN npm install

# Copy seluruh kode aplikasi ke direktori kerja
COPY . .

# Ekspose port aplikasi
EXPOSE 8000

# Perintah untuk menjalankan aplikasi
CMD [ "node", "app.js" ]
