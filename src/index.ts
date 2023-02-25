import 'reflect-metadata';
import server from './Server';
import config from "config"
import 'source-map-support/register'
import Container from 'typedi';
import InstanceConfig from './config/initialInstantiations.config';
// Start the server
const port = Number( config.get<number>("PORT") || 5001);
server.main().then(app=>{
    app.listen(port, () => {
        console.info('Express server started on port: ' + port);
    });
    
    InstanceConfig.instance().forEach(x=>{
        Container.get(x)
    })

})



// Todo:
/* 
casual
docker | docker-compose for mysql redis and all also
debug (logger middleware)
redis 
nginx
testing example (unit test)
rabbitmq 
cli generator complete
db seeder integration
update readme
executable
*/
