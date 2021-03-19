
const Task = require("./task");
/* 
    _list:
        { 'uuid-1232134-2141245': {id: 12, desc: asdasd, completeAt: 324213} }
*/

class Tasks {

    _list = {};

    constructor() {
        this._list = {};
    }

    // getter
    get listArr() {
        const list = [];
        // regresa un arreglo de todas las llaves
        Object.keys(this._list).forEach( key => {
            //console.log( key );
            const task = this._list[key];
            list.push( task );
        });

        return list;

    } 

    // crear tarea
    createTask( desc = '' ) {
        const task = new Task( desc );
        // con esto, _list apunta al sector del objeto que tenga task.id
        this._list[task.id] = task;

    }

    // cargar datos desde JSON
    uploadTasksFromArr( tasks = [] ) {
    
        tasks.forEach( task => {
            // console.log( task.id );
            this._list[task.id] = task;
        })
    }

    // Listado completo de la lista de tareas
    // Completada: verde
    // Pendiente: rojo

    // 1. Recoger ropa :: Completada
    // 2. Hacer almuerzo :: Pendiente
    /*fullList() {
        Object.keys(this._list).forEach( (key, index) => {
            const task = this._list[key];
            const i = (index + 1).toString() + '.';
            
            if(task.completeAt === null) {
                console.log( `${ i.green }`, this._list[key].desc, '::', 'Pendiente'.red);                
            }
            else{
                console.log( `${ i.green }`, this._list[key].desc, '::', 'Completada'.green);
            }
        });

    }*/
    
    // Codigo optimizado
    fullList() {
        // salto de linea
        console.log();
        this.listArr.forEach( (task, index) => {

            const idx = `${ index + 1 }.`.green;
            //desestructurar
            const { desc, completeAt } = task;
            const state = ( completeAt )
                ? 'Completada'.green
                : 'Pendiente'.red;

            console.log(`${ idx } ${ desc } :: ${ state }`);

        });
    }

    /*
        Muesta el listado de tareas (complete = true => Completadas
                                     complete = fase => Pendientes
                                    )
    */
    listTaskComplete( complete = true ) {
        
        console.log();
        let index = 0;
        
        this.listArr.forEach( task => {

            const { desc, completeAt } = task;
            const state = ( completeAt )
                ? 'Completada'.green
                : 'Pendiente'.red;
            
            if( complete ) {
                // Mostrar completadas
                if( completeAt ) {
                    index += 1;
                    const idx = `${ index }.`.green;
                    console.log(`${ (index + '.').green } ${ desc } :: ${ completeAt.green }`);
                }
            }
            else{
                // Mostrar pendientes
                if( !completeAt ) {
                    index += 1;
                    console.log(`${ (index + '.').green } ${ desc } :: ${ state }`);
                }
            }
        });
    }

    // Eliminar tarea
    deleteTask( id = '') {

        if( this._list[id] ) {
            delete this._list[id];
        }


    }

    //
    toggleCompletes( ids = [] ) {

        ids.forEach( id => {

            const task = this._list[id];
            if ( !task.completeAt ) {
                // generar la fecha actual
                task.completeAt = new Date().toISOString();
            }

        });

        this.listArr.forEach( task => {
            // si no existe o incluye en mi arreglo de ids la tarea.id que se encuentra registrada hacer
            if ( !ids.includes(task.id) ) {
                this._list[task.id].completeAt = null;
            }
        });
    }

}


module.exports = Tasks;
