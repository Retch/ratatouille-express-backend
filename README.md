# Express Backend for fh-erfurt/Ratatouille

### Run with Node installed

1. Set up mariadb/mysql Database
2. Edit credentials in <code>/app/config/env.js</code>
3. Change forceresync & express port as as needed in <code>server.js</code>
4. Install packages: <code>npm install</code>
5. Run Server: <code>node server.js</code>

### Run the Docker image

1. <code>docker pull ghcr.io/retch/ratatouille-express-backend:main</code>
2. Set credentials as args as shown:<br><code>docker run -e "HOST=10.147.17.100" -e "PORT=3306" -e "USER=admin" -e "PASS=secret" -e "DB=projectdb" -e "FORCERESYNC=false" -p 1001:8000</code>

### Help

#### forceresync

Default: false
Drops database and creates new database
