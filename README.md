# Machinevisor
Web application project based on the stack MEAN.

Machinevisor:
 * Allows remote monitoring and control of virtual industrial machines
 * Provide an interactive factory map for machine monitoring
 * Provide different types of charts and a log for storic reports
 * Provide real-time charts
 * Allows registration and login new users
 

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
