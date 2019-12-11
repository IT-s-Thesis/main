FROM node:10.16.3

# set working directory
WORKDIR /app
COPY . /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
RUN npm install --silent

EXPOSE 5001
# start app
CMD ["npm", "start"]