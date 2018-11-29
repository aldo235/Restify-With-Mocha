module.exports = {
  apps: [{
    name: "Restful-Api",
    script: "./server.js",
    watch: true,
    ignore_watch: ["public", ".git", "node_modules"],
    watch_options: {
      "followSymlinks": false
    },
    env: {
      "NODE_ENV": "development",
      "APP_ID": "Restful-Api",
      "APP_KEY": "e10adc3949ba59abbe56e057f20f883e",
      "DB_CONNECTION": {
        "mongodb": {
          "driver": 'mongodb',
          "host": 'localhost',
          "port": 27017,
          "database": 'restful'
        }
      }
    }
  }]
}