const express = require('express');
const router = express.Router();

//Invocamos a la conexion de la DB
const conexion = require('./database/db');

//RUTA PARA MOSTRAR TODOS LOS REGISTROS
//router.get('/', (req, res)=>{     
    
//    conexion.query('SELECT * FROM participantes where 1=2',(error, results)=>{
//        if(error){
//            throw error;
//        } else {                                                                
//            res.render('famL.ejs', {data:results});                                               
//        }   
//    })

//})

//ruta para enviar los datos en formato json
router.get('/datap', (req, res)=>{     

//	console.log('Debug partidos L ',req.session.loggedin);
//	console.log('Debug partidos A ',req.session.Alias);

   
    conexion.query('SELECT P.Id,L.clave ClaveL,P.Local,P.ML,P.MV,P.Visitante,V.Clave ClaveV FROM partidos as P, paises as L, paises as V WHERE P.Visitante = V.nombre and P.Local = L.nombre',(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            datap = JSON.stringify(results);
            res.send(datap);          
        }   
    })
})

//ruta para enviar los datos en formato json
router.get('/quiniela_data1', (req, res)=>{     

    const Id_p = req.session.Id_participante;


//	console.log('Debug quiniela L ',req.session.loggedin);
//    console.log('Debug quiniela Id ',req.session.Id_participante);
//    console.log('Debug quiniela 2 ',req.session.Alias);


    conexion.query('SELECT Q.Id,P.Id Id_P,L.clave ClaveL,P.Local,Q.ML,Q.MV,P.Visitante,V.Clave ClaveV,P.Fecha,P.Horario,P.Estadio,Q.Estatus Estatus FROM partidos as P, paises as L, paises as V, quiniela as Q WHERE P.Id > 48 and P.Visitante = V.nombre and P.Local = L.nombre and P.Id = Q.Id_partido and Q.Id_participante=? \
    union all \
    SELECT Q.Id,P.Id Id_P,Q.clave ClaveL,P.Local,null,null,Q.equipo,V.Clave ClaveV,P.Fecha,P.Horario,P.Estadio,Q.Estatus Estatus FROM partidos as P, paises as V, campeon as Q WHERE P.Id > 48 and Q.equipo = V.nombre and P.Id = Q.Id_partido and Q.Id_participante=? \
    order by Id_P',[Id_p,Id_p],(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            datap = JSON.stringify(results);
            res.send(datap);          
        }   
    })
})


//ruta para enviar los datos en formato json
router.get('/quiniela_data', (req, res)=>{     

    const Id_p = req.session.Id_participante;


//	console.log('Debug quiniela L ',req.session.loggedin);
//    console.log('Debug quiniela Id ',req.session.Id_participante);
//    console.log('Debug quiniela 2 ',req.session.Alias);


    conexion.query('SELECT Q.Id,P.Id Id_P,L.clave ClaveL,P.Local,Q.ML,Q.MV,P.Visitante,V.Clave ClaveV,P.Fecha,P.Horario,P.Estadio,Q.Estatus Estatus FROM partidos as P, paises as L, paises as V, quiniela as Q WHERE P.Estatus = 0 and P.Visitante = V.nombre and P.Local = L.nombre and P.Id = Q.Id_partido and Q.Id_participante=? order by Id_P',[Id_p],(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            datap = JSON.stringify(results);
            res.send(datap);          
        }   
    })
})

//ruta para enviar los datos en formato json
router.get('/quinielas_data', (req, res)=>{     

    const Id_p = req.session.Id_participante;
    console.log('Folder ',globalfolder);
 
//	console.log('Debug quiniela L ',req.session.loggedin);
//    console.log('Debug quiniela Id ',req.session.Id_participante);
//    console.log('Debug quiniela A ',req.session.Alias);

    conexion.query('SELECT Q.Id, concat_ws(P.Descripcion, P.Id,  P.Id)  Id_P ,R.Alias,L.clave ClaveL,P.Local,Q.ML,Q.MV,P.Visitante,V.Clave ClaveV   \
    FROM partidos as P, paises as L, paises as V, quiniela as Q, participantes R, folder F    \
    WHERE P.Visitante = V.nombre and P.Local = L.nombre and P.Id = Q.Id_partido \
    and Q.Id_participante=R.Id_participante and Q.Id_participante=F.Id_participante and F.folder = ? \
    union all \
    SELECT Q.Id,concat_ws(P.Descripcion, P.Id,  P.Id)  Id_P ,R.Alias,Q.clave ClaveL,P.Local,null,null,Q.equipo,V.Clave ClaveV \
    FROM partidos as P, paises as V, campeon as Q, participantes R, folder F \
    WHERE P.Id > 48 and Q.equipo = V.nombre and P.Id = Q.Id_partido and Q.Id_participante=R.Id_participante and Q.Id_participante=F.Id_participante and F.folder = ? \
    order by 1,2',[globalfolder,globalfolder],(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            datap = JSON.stringify(results);
            res.send(datap);          
        }   
    })
})


//ruta para enviar los datos en formato json
router.get('/puntos_data', (req, res)=>{     

    const Id_p = req.session.Id_participante;
//    const Id_Alias = req.session.Alias;

//	console.log('Debug quiniela L ',req.session.loggedin);
    console.log('Debug quiniela Id ',req.session.Id_participante);
//    console.log('Debug quiniela A ',req.session.Alias);

    conexion.query('SELECT PU.Id,PA.nombre as Id_participante,PU.Id_partido,PR.ML,PR.MV,Q.ML Mi_ML,Q.MV Mi_MV,PU.Local,  \
    PU.Visitante,Total,Puntos_local,Puntos_empate,Puntos_visita  \
    	FROM puntos AS PU 	JOIN participantes AS PA ON PU.Id_participante = PA.Id_participante \
        JOIN quiniela AS Q ON PU.Id_partido=Q.Id_partido and PU.Id_participante = Q.Id_participante \
        JOIN partidos AS PR ON PU.Id_partido=PR.Id \
        where PU.Id_participante=? order by Id',[Id_p],(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            datap = JSON.stringify(results);
            res.send(datap);          
        }   
    })
})

//ruta para enviar los datos en formato json Calendario
router.get('/calendario_data', (req, res)=>{     
    conexion.query('SELECT P.Id,P.Local,L.clave ClaveL,V.Clave ClaveV,P.Visitante,date_format(P.Fecha, "%d-%m-%Y") as Fecha,P.Horario,P.Estadio,P.Estatus FROM partidos as P, paises as L, paises as V WHERE P.Visitante = V.nombre and P.Local = L.nombre order by P.Estatus, P.Fecha asc',(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            datap = JSON.stringify(results);
            res.send(datap);          
        }   
    })
})


//ruta para enviar los datos en formato json Resultados
router.get('/resultados_data', (req, res)=>{     
    conexion.query('SELECT Id,Local,ML,MV,Visitante,date_format(Fecha, "%d-%m-%Y") as Fecha,Horario,Estadio,Estatus FROM partidos WHERE Estatus=1 order by Id',(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            datap = JSON.stringify(results);
            res.send(datap);          
        }   
    })
})


//ruta para enviar los datos en formato json Paises
router.get('/paises_data', (req, res)=>{     
    conexion.query('SELECT * FROM paises',(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            datap = JSON.stringify(results);
            res.send(datap);          
        }   
    })
})

//ruta para enviar los datos en formato json
router.get('/mundial_data', (req, res)=>{     
    conexion.query('SELECT * FROM mundiales',(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            datap = JSON.stringify(results);
            res.send(datap);          
        }   
    })
})


//ruta para enviar los datos en formato json
router.get('/estadios_data', (req, res)=>{     
    conexion.query('SELECT * FROM estadios',(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            datap = JSON.stringify(results);
            res.send(datap);          
        }   
    })
})

//RUTA QUE NOS LLEVA AL FORMULARIO PARA DAR DE ALTA UN NUEVO REGISTRO
//router.get('/create', (req,res)=>{
//    res.render('create');
//})

//RUTA QUE NOS LLEVA AL FORMULARIO PARA DAR DE ALTA UN NUEVO REGISTRO
router.get('/createp', (req,res)=>{
    res.render('createp');
})

//RUTA QUE NOS LLEVA AL FORMULARIO PARA DAR DE ALTA UN NUEVO REGISTRO
router.get('/createq', (req,res)=>{
    res.render('createq');
})


//RUTA PARA EDITAR UN REGISTRO SELECCIONADO
router.get('/partidos_edit/:Id', (req,res)=>{    
    const Id = req.params.Id;
    conexion.query('SELECT P.Id,L.clave ClaveL,P.Local,P.ML,P.MV,P.Visitante,V.Clave ClaveV,date_format(Fecha, "%d-%m-%Y") as Fecha,Horario,Estadio,Estatus FROM partidos as P, paises as L, paises as V WHERE P.Visitante = V.nombre and P.Local = L.nombre and P.Id=?',[Id] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('partidos_edit.ejs', {user:results[0]});            
        }        
    });
});


//RUTA PARA EDITAR UN REGISTRO SELECCIONADO
router.get('/partidos_Inicia/:Id', (req,res)=>{    
    const Id = req.params.Id;
    conexion.query('SELECT P.Id,L.clave ClaveL,P.Local,P.ML,P.MV,P.Visitante,V.Clave ClaveV,date_format(Fecha, "%d-%m-%Y") as Fecha,Horario,Estadio,Estatus FROM partidos as P, paises as L, paises as V WHERE P.Visitante = V.nombre and P.Local = L.nombre and P.Id=?',[Id] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('partidos_Inicia.ejs', {user:results[0]});            
        }        
    });
});

//RUTA PARA EDITAR UN REGISTRO SELECCIONADO
router.get('/quiniela_edit/:Id', (req,res)=>{    
    const Id = req.params.Id;

 //   console.log('Debug edita quiniela B ',req.params.Id);

    conexion.query('SELECT Q.Id Id,P.Id Id_P,L.clave ClaveL,P.Local,Q.ML,Q.MV,P.Visitante,V.Clave ClaveV,L.Ranking LRanking,V.Ranking VRanking,P.Fecha,P.Horario,P.Estadio FROM partidos as P, paises as L, paises as V, quiniela as Q WHERE P.Visitante = V.nombre and P.Local = L.nombre and P.Id = Q.Id_partido and Q.Id=?',[Id] , (error, results) => {                    
        if (error) {
            throw error;
        }else{            
            res.render('quiniela_edit.ejs', {user:results[0]});            
        }        
    });
});


//RUTA PARA EDITAR UN REGISTRO SELECCIONADO
router.get('/puntos_edit/:Id', (req,res)=>{    
    const Id = req.params.Id;
    conexion.query('SELECT Id,Visitante FROM puntos WHERE Id=?',[Id] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('puntos_edit.ejs', {user:results[0]});            
        }        
    });
});

router.get('/participantes_dat', (req, res)=>{     
    conexion.query('SELECT * FROM participantes',(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            datap = JSON.stringify(results);
            res.send(datap);          
        }   
    })
});

router.get('/participantes_dat2', (req, res)=>{     
    conexion.query('SELECT * FROM participantes',(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            datap = JSON.stringify(results);
            res.send(datap);          
        }   
    })
});
//ruta para enviar los datos en formato json

router.get('/participantes_datF1', (req, res)=>{ 
       
    console.log('Folder ',globalfolder);
 
    pool.query('SELECT L.Lugar Lugar, P.Alias Alias, P.Puntos Puntos FROM lugar L, participantes P where L.Id_participante = P.Id_participante and L.Id_folder=?',[globalfolder] ,(error, results)=>{
         if(error){
            console.log(error);
            console.error(err);
            return;
        } else {                                                   
            datap = JSON.stringify(results);
            res.send(datap);          
        }   
    })

});

    
//RUTA PARA EDITAR UN REGISTRO SELECCIONADO
router.get('/participante_edit/:Id', (req,res)=>{    
    const Id = req.params.Id;
    conexion.query('SELECT * FROM participantes WHERE Id_participante=?',[Id] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('participante_edit.ejs', {user:results[0]});            
        }        
    });
});

router.get('/participante_editN/:Id', (req,res)=>{    
    const Id = req.params.Id;
    conexion.query('SELECT * FROM participantes WHERE Id_participante=?',[Id] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('participante_editN.ejs', {user:results[0]});            
        }        
    });
});

router.get('/participante_edit2/:Id', (req,res)=>{    
    const Id = req.params.Id;
    conexion.query('SELECT * FROM participantes WHERE Id_participante=?',[Id] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('participante_edit2.ejs', {user:results[0]});            
        }        
    });
});

//RUTA PARA ELIMINAR UN REGISTRO SELECCIONADO
router.get('/participante_del/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM participantes WHERE Id_participante = ?',[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/participantes');         
        }
    })
});


//RUTA para Quinielas
router.get('/quinielas', (req,res)=>{
    res.render('quinielas');
})

//RUTA para calendario
router.get('/calendario', (req,res)=>{
    res.render('calendario');
})

//RUTA para paises
router.get('/paises', (req,res)=>{
    res.render('paises');
})

//RUTA para mundiales
router.get('/mundiales', (req,res)=>{
    res.render('mundiales');
})

//RUTA para musica
router.get('/musica', (req,res)=>{
    res.render('musica');
})

//RUTA para quiniela
router.get('/estadios', (req,res)=>{
    res.render('estadios');
})

//RUTA para menu4
router.get('/guia', (req,res)=>{
    res.render('guia');
})

//RUTA para menu4
router.get('/menu4', (req,res)=>{
    res.render('menu4');
})

//RUTA para menu3
router.get('/menu3', (req,res)=>{
    res.render('menu3');
})

//RUTA para resultados
router.get('/resultados', (req,res)=>{
    res.render('resultados');
})


//Invocamos los metodos para el CRUD
const crud = require('./controllers/crud');
//const LoginController = require('../controllers/LoginController');

const { json } = require('express');
const pool = require('./database/db');


// usamos router.post porque en el formulario el method="POST"

router.post('/savep', crud.savep);
router.post('/updatep', crud.updatep);
router.post('/updatepatidoIni', crud.updatepatidoIni);
router.post('/participantes_update', crud.participantes_update);
router.post('/participantes_update2', crud.participantes_update2);
router.post('/participantes_updateNuevo', crud.participantes_updateNuevo);
router.post('/registra_save', crud.registra_save);
router.post('/registra_autoriza', crud.registra_autoriza);
router.post('/quiniela_update', crud.quiniela_update);
router.post('/campeon_update', crud.campeon_update);

//router.post('/registra_autoriza', (req,res)=>{
//    console.log(req.body)


    //    req.session.my_variable='Hello world';
 //   req.session.my_variable='aaaa';
 //   console.log('my_variable');
 //   res.render('crud.registra_autoriza');
      
//});


module.exports = router; 
