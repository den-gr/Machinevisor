* Compile typescript code  `npm run build`
* Run server `npm run start`
* Depevelop mode (run and automatic compile in case of changes) `npm run dev`  
* Run simulation of machines `npm run machine_start`

# API
* Link to [HTTP API](https://app.swaggerhub.com/apis/DenGuzawr22/Machinevisor)
* For describe socket.io api we use AsyncAPI
    * For open documentation go to ./public/doc/index.html
    * If serve is active you can go to https://localhost:8080/doc
    * For create new version of api: 
        1. Update the file ./public/doc/asycapi.yaml
        2. Run `npm run generate_async_doc`
