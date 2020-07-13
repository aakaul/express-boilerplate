FROM node:alpine as builder

WORKDIR /usr/app

COPY ./package.json ./

RUN npm i 

COPY ./ ./

CMD ["npm","run","build"]


FROM nginx

COPY --from=builder /usr/app/build /usr/share/nginx/html


#efe297aad7ff

#docker run -it -p '3000:3000'  -v /usr/app(WORKDIR)/node_modules -v $(pwd):/usr/app(WORKDIR)   efe297aad7ff