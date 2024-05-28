FROM node:12.8.1

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY server/package*.json /app/server/

#  “Ci” will install packages directly from the lock file.
RUN npm --prefix server ci

# Copy typescript (everything needed to compile)
COPY server/tsconfig.json /app/server
COPY server/src /app/server/src

# Copy migration files
COPY database/migrations /app/database/migrations
COPY server/db-migrate /app/server/db-migrate

# Copy entrypoint
COPY webserver.start.sh /app/

# Compile TypeScript (in workdir)
RUN npm --prefix server run tsc

# If you are building your code for production
#RUN npm ci --only=production

CMD [ "bash", "webserver.start.sh"]
