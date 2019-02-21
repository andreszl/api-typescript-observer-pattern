//Actividad: Observer
//Tecnico : Observer
//Centro de operacion : Subject 

interface Subject {
    register(observer: Observer) : void;
    unregister(observer: Observer): void;
    notify(): void;
}

interface Observer {
    update(temperature: number): void;    
}

class CenterOperation implements Subject{
    
    private temperature: number;
    private observers : Observer[] = [];
    private io : any;

    constructor(server: any, io : any){
        this.io = io;
        this.createSocket(server, this.io);
        this.temperature = 0;
    }

    public setTemperature(temp: number) : void{
        console.log('CenterOperation: new temperature measurement:' + temp);
        this.temperature = temp;
        this.notify();
    }

    public register(newObserver: Observer) : void{
        this.observers.push(newObserver)
    }

    public unregister(deleteObserver: Observer): void{
       let index = this.observers.indexOf(deleteObserver);
       this.observers.splice(index, 1);
    }
    public notify(): void{
        for (let observer of this.observers) {
            observer.update(this.temperature);            
        }
    }

    
    public createSocket(server : any, socket: any){

        this.io = socket(server);

        this.io.on('connection', (socket : any) => {        
            socket.on("new user", () =>  {
                console.log('new user')
            })   
        },        
        this.io.on('new message' , (message) => {
            console.log(message)
            message.emit('user says', message)
        })  ,
        this.io.on('disconnect', (socket) => {
           socket.broadcast.emit("user disconnected", { message: "new user disconnected"} )
        })
        )     
       
        
        console.log(this.io.sockets._events)

    }
}


class Activity implements Observer {
    private subject: Subject;
    
    constructor(WeatherStation: Subject){
        this.subject = WeatherStation;
        WeatherStation.register(this);
    }
    
    public update(temperature: number){
       console.log('Activity: I need to update my display');
    }

}


class Technical implements Observer {
    private subject: Subject;
    
    constructor(WeatherStation: Subject){
        this.subject = WeatherStation;
        WeatherStation.register(this);
    }
    
    public update(temperature: number){
       if(temperature >25){
            console.log('Tecnical: its not here, turning myself on...');
       }else{
            console.log('Tecnical: its nice and cool, turning myself off...');
       }
    }
}


// let centerOperation = new CenterOperation('io');
// let activity = new Activity(centerOperation);
// let technical = new Technical(centerOperation);

// centerOperation.setTemperature(20);
// centerOperation.setTemperature(30);


export default CenterOperation;