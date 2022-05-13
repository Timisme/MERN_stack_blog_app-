1. Initial Setup

- server
    - npm init -y 
    - npm install body-parser cors express mongoose nodemon
    - package.json add `"type":"module"`
    - modify scripts to `"start": "nodemon index.js"`
- client
    - update package.json 
    - npm install --legacy-peer-deps
        - it tells NPM to ignore peer deps and proceed with the installation anyway
    - npm start 
    