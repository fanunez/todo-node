
// Importacion de paquetes de terceros
require('colors');

// Importaciones propias
//const { showMenu, pause } = require('./helpers/messages');
const { inquirerMenu, 
        pause,
        readInput,
        listTaskDelete,
        confirm,
        showCheckList
} = require('./helpers/inquirer');

const { saveDb, readDb } = require('./helpers/saveFile');


const Task = require('./models/task');
const Tasks = require('./models/tasks');


console.clear();


const main = async() => {

    let opt = '';
    const tasks = new Tasks();    

    const tasksDb = readDb();

    if(tasksDb){
        // Establecer tareas
        tasks.uploadTasksFromArr( tasksDb );
    }

    // Menu
    do {
        // Esperar hasta resolve
        // opt = await showMenu();
        opt = await inquirerMenu();

        switch ( opt ) {
            // Crear tarea
            case '1':
                const desc = await readInput('Descripcion:');
                tasks.createTask( desc );
                console.log('\n  ¡Tarea creada!'.yellow.bgWhite);
                break;
            // Listar tareas
            case '2':
                tasks.fullList();
                break;
            // Listar tareas completadas
            case '3':
                tasks.listTaskComplete();
                break;
            // Listar tareas pendientes
            case '4':
                tasks.listTaskComplete(false);
                break;
            // Completar tareas(s)
            case '5':
                const ids = await showCheckList( tasks.listArr )
                tasks.toggleCompletes( ids );
                break;
            // Borrar tarea
            case '6':
                const id = await listTaskDelete( tasks.listArr );
                if ( id !== '0' ){
                    const confirmDelete = await confirm('¿Está seguro que desea borrar el elemento?');
                    if( confirmDelete ) {
                        tasks.deleteTask( id );
                        console.log('\n  Tarea borrada'.red.bgWhite);
                    }
                }
                break;

        }
        // guardar los cambios del arreglo en el archivo JSON de salida
        saveDb( tasks.listArr );
        await pause();

    } while( opt !== '0' );
    
    
}

main();


