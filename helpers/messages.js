
require('colors');


const showMenu = () => {

    return new Promise( resolve => {
        
        console.clear();
        console.log('========================='.green);
        console.log('  Seleccione una opcion  '.green);
        console.log('=========================\n'.green);
    
        console.log(`${ '1.'.green } Crear tarea`);
        console.log(`${ '2.'.green } Listar tareas`);
        console.log(`${ '3.'.green } Listar tareas completadas`);
        console.log(`${ '4.'.green } Listar tareas pendientes`);
        console.log(`${ '5.'.green } Completar tarea(s)`)
        console.log(`${ '6.'.green } Borrar tarea`);
        console.log(`${ '0.'.green } Salir\n`);
    
        // crear interfaz para mostrar y recibir informacion del usuario
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        // se utiliza para mostrar informacion al usuario
        readline.question('Seleccione una opcion: ', (opt) => {
            readline.close();
            resolve(opt);
        });
    });    
}

const pause = () => {
    
    return new Promise( resolve => {
        
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        // se utiliza para mostrar informacion al usuario
        readline.question(`Presione ${ 'ENTER'.green } para continuar\n`, (opt) => {
            readline.close();
            resolve();
        });    
    });
}


module.exports = {
    showMenu,
    pause
}


