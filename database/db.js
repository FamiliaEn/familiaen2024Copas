//2 - Invocamos a MySQL y realizamos la conexion
const mysql = require('mysql');

const connection = mysql.createConnection({
    //Con variables de entorno
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE,
    port : process.env.DB_PORT,
//    protocol : process.env.DB_PROTOCOL,    
    stringifyObjects:true,
    multipleStatements: true,
    dateStrings : 'DATETIME',
    connectTimeout : 60000
});

const pool = mysql.createPool({
  //Con variables de entorno
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_DATABASE,
  port : process.env.DB_PORT,
  //protocol : process.env.DB_PROTOCOL,    
  stringifyObjects:true,
  multipleStatements: true,
  dateStrings : 'DATETIME',
  connectionLimit:4,
  debug    :  false,
  connectTimeout : 60000
});


//connection.connect((error)=>{
  //  if (error) {
  //    console.error('El error de conexión es: ' + error);
  //   return;
  //  }
  //  console.log('¡Conectado a la Base de Datos!');
  //});


  pool.getConnection((err,connection)=> {
    if(err)
    throw err;
    console.log('Database connected successfully');
    connection.release();
  }); 


  //module.exports = connection;

  module.exports = pool;