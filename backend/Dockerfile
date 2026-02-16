FROM node:18-alpine

WORKDIR /app

ENV PORT=5000
ENV MONGO_URI=mongodb+srv://ayushs:Aayush28@cluster0.cl24ook.mongodb.net/Personal_DB
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000
CMD ["npm", "start"]