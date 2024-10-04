FROM node:20
 
WORKDIR /app
 
COPY . /app/
 
RUN npm ci
 
EXPOSE 8900
 
CMD ["node", "app.js"]