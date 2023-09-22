FROM node:12.8.1

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /app/

#  “Ci” will install packages directly from the lock file.
RUN npm ci

# Copy typescript (everything needed to compile)
COPY tsconfig.json /app
COPY src /app/src

# Copy migration files
COPY db-migrate /app/db-migrate

# Copy entrypoint
COPY webserver.start.sh /app

# Compile TypeScript (in workdir)
RUN npm run tsc

# If you are building your code for production
#RUN npm ci --only=production

CMD [ "bash", "webserver.start.sh"]
