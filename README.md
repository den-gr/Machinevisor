# Machinevisor

## Building
1. `docker-compose build` build the project
2. `docker-compose up` run the project
3. Open https://localhost:8080 and then ignore unsafe warning of browser (we use unsigned certificate for SSL). Close this web page 
4. Open https://localhost:4200 and again ignore unsafe warning of browser 
    You can register a new user or login with:
    * Email: `homer@unibo.it`
    * Password: `admin`
5. `Ctrl + C` allow to exit
6. `docker-compose down` shut down the containers

## Documentation
How to find API documentation you can read in the `backend` folder readme
