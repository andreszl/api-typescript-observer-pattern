import path from 'path'
import express, { Application } from 'express';
import  morgan  from "morgan";
import cors from "cors";
import config from 'config'
import http from 'http'
import io from 'socket.io';

import CenterOperation from './observer_pattern/Observer'


import gamesRoutes from './routes/gamesRoutes';

class Server {
    public app: Application;
    private server: http.Server;
    private centerOperation ?: CenterOperation;
    
    constructor(){
        this.app = express();
        this.server = http.createServer(this.app);     
        this.centerOperation = undefined;
        this.config(); 
        this.routes();
    }

    config(): void {
        this.app.set('port', config.get('express.port') || 3000);
        this.app.use(express.static(config.get('public')));
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void {
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, [ '/', config.get('public'), 'index.html' ].join('')));
        });
        this.app.use('/api/games', gamesRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server listening on port ${this.app.get('port')}`)
            
        });
        this.centerOperation = new CenterOperation(this.server, io);      
    }

}

const server = new Server();
server.start();