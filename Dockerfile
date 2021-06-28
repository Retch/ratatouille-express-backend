FROM node:16-alpine3.12

COPY . /

RUN npm install

EXPOSE 8000

CMD [ "node", "server.js" ]

# Metadata
ARG IMAGE_VERSION=unknown
LABEL \
      org.label-schema.name="ratatouille-backend" \
      org.label-schema.description="Backend for https://github.com/fh-erfurt/Ratatouille" \
      org.label-schema.version="${IMAGE_VERSION}" \
      org.label-schema.vcs-url="https://github.com/Retch/ratatouille-express-backend" \
      org.label-schema.schema-version="1.0"