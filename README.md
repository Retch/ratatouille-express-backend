## Express Backend for fh-erfurt/Ratatouille

[![Docker](https://github.com/Retch/ratatouille-express-backend/actions/workflows/docker-publish.yml/badge.svg?branch=main)](https://github.com/Retch/ratatouille-express-backend/actions/workflows/docker-publish.yml)

### Run with Node installed

1. Set up mariadb/mysql Database
2. Edit credentials in <code>/app/config/env.js</code>
3. Change forceresync & express port as as needed in <code>server.js</code>
4. Install packages: <code>npm install</code>
5. Run Server: <code>node server.js</code>

### Run the Docker image

1. Pull latest Docker image: <code>docker pull ghcr.io/retch/ratatouille-express-backend:main</code>
2. Set credentials as args like this: <code>docker run -e "HOST=10.147.17.100" -e "PORT=3306" -e "USER=admin" -e "PASS=secret" -e "DB=projectdb" -e "FORCERESYNC=false" -p 1001:8000</code>

### Help

#### forceresync

Default: false<br>
Drops database and creates new database

### Docker example usage with compose

```yaml
---
version: "2.1"
services:
  mariadb:
    image: ghcr.io/linuxserver/mariadb:alpine
    container_name: ratatouille-mariadb
    environment:
      - PUID=1000
      - PGID=1000
      - MYSQL_ROOT_PASSWORD=rootpw
      - TZ=Europe/Berlin
      - MYSQL_DATABASE=ratatouille
      - MYSQL_USER=admin
      - MYSQL_PASSWORD=secretpw
    volumes:
      - /home/user/data/ratatouille:/config
    networks:
      - ratatouille-network
    restart: unless-stopped
  express:
    image: ghcr.io/retch/ratatouille-express-backend:main
    container_name: ratatouille-express
    environment:
      - "HOST=ratatouille-mariadb"
      - "PORT=3306"
      - "USER=admin"
      - "PASS=secretpw"
      - "DB=ratatouille"
      - "FORCERESYNC=false"
    networks:
      - ratatouille-network
    ports:
      - 1234:8000
    restart: unless-stopped
```
