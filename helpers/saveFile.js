
const fs = require('fs');
// path
const file = './database/data.json';

const saveDb = ( data ) => {
    // transformar la data a version string mediante modulo JSON
    fs.writeFileSync( file, JSON.stringify(data) );
}

const readDb = () => {
    // si no existe
    if( !fs.existsSync( file ) ){
        return null;
    }

    const info = fs.readFileSync( file, { encoding: 'utf-8' });
    // string a JSON mediante parse
    const data = JSON.parse( info );
    //console.log(data);

    return data;
}   


module.exports = {
    saveDb,
    readDb
}


