# Inspired by: https://www.indellient.com/blog/how-to-dockerize-an-angular-application-with-nginx/

# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:18-slim as build

# Set the working directory
WORKDIR /app

# Add the source code to app
COPY ./ /app/

# Install all the dependencies
RUN npm install

# Set CI environment variable to true to disable angular build cache
ENV CI=true

# Generate the build of the application
RUN npx nx build app-toolbox --verbose=true

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/apps/app-toolbox /usr/share/nginx/html

# Copy the config for fallback route
COPY ./nginx.conf /etc/nginx/conf.d/

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# When the container starts, replace the env.js with values from environment variables
CMD ["/bin/sh", "-c", "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
