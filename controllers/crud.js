//Invocamos a la conexion de la DB
const conexion = require('../database/db');

const pool = require('../database/db');

//GUARDAR un REGISTRO
exports.savep = (req, res)=>{
    const Local = req.body.Local;
    const Visitante = req.body.Visitante;
    conexion.query('INSERT INTO partidos SET ?',{Local:Local, Visitante:Visitante}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
         //   console.log(results);   
            res.redirect('/partidos');         
        }
});
};



//AUTORIZA UN REGISTRO
exports.registra_autoriza = (req, res)=>{

    console.log('body');
    console.log(req.body);
    console.log('body');

    const Id_participante = req.body.Id_participante;
    const Id_folder = req.body.Id_folder;
    const Nombre = req.body.Nombre;
    const Alias = req.body.Alias;
    const Contacto = req.body.Contacto;

    const Correo = req.body.Correo;
    const Pass = req.body.Pass;

    console.log(Alias); 

    conexion.query('SELECT * FROM participantes WHERE Alias = ?', [Alias], (err,userdata) => {
        if(userdata.length > 0) {
            console.log('Usuario registrado');

            userdata.forEach(element => {
                console.log(Pass);
                console.log(element.Pass);
                console.log(element.Alias)
 
                if (Pass!=element.Pass) {
                    console.log('password diferente');
//                    req.session.loggedin = false;
//                    req.session.name = element.Alias;

                    res.redirect('/login');
                } else {
                    console.log('password igual');

                    conexion.query('SELECT * FROM participantes WHERE Estatus=1 and Alias = ?', [Alias], (err,userdata) => {
                        if(userdata.length > 0) {
                            console.log('usuario activo ',Alias);
                            //res.session.loggedin = true;
                            //req.session.Alias = element.Alias;
                            
                            res.redirect('/partidos');
//                            res.redirect('partidos/', { error: 'true' });

                          } else {
    
                            console.log('Espere aviso de activación');
         //                   req.session.destroy();
                            //res.redirect('/login');
                            res.render('acceso/', { mensaje: 'Espere aviso de activación via Whatsapp' });
                        }                                   
                      });

                }
            });
        } else {
            console.log('Usuario No registrado');
            console.log({Correo:Correo, Nombre:Nombre});  

            res.redirect('/acceso');    
        
        }
    });
}

//GUARDAR un REGISTRO
exports.registra_save = (req, res)=>{

    const Id_participante = req.body.Id_participante;
    const Id_folder = req.body.Id_folder;
    const Nombre = req.body.Nombre;
    const Alias = req.body.Alias;
    const Contacto = req.body.Contacto;

    const Correo = req.body.Correo;
    const Pass = req.body.Pass;

    console.log(Alias);

    conexion.query('SELECT * FROM participantes WHERE Alias = ?', [Alias], (err,userdata) => {
        if(userdata.length > 0) {
            console.log('Usuario registrado');
            //res.redirect('/login');   
            res.render('acceso', {
                alert: true,
                alertTitle: "Usuario registrado",
                alertMessage: "¡YA EXISTE USUARIO!",
                alertIcon:'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: 'acceso'
            });  
        } else {
            console.log('Usuario No registrado');

            console.log({Correo:Correo, Nombre:Nombre});  

            conexion.query('INSERT INTO participantes SET Nombre=?, Alias=?, Contacto=?, Correo=?, Pass= ?',[Nombre, Alias, Contacto, Correo, Pass], (error, results)=>{

                if(error){
                    console.log(error);
                }else{
                //   console.log(results);   
                //   res.redirect('/partidos');
                
                    console.log('Espere aviso de activación');

                    req.session.loggedin = false;                

                    res.render('acceso', {
                        alert: true,
                        alertTitle: "Espere aviso de activación",
                        alertMessage: "¡USUARIO REGISTRADO!",
                        alertIcon:'info',
                        showConfirmButton: true,
                        timer: false,
                        ruta: ''
                    });  

        }
});
}
});
}
 
//ACTUALIZAR un REGISTRO
exports.updatep = (req, res)=>{
    const Id = req.body.Id;
    const Local = req.body.Local;
    const ML = req.body.ML;
    const MV = req.body.MV;
    const Visitante = req.body.Visitante;


    console.log(Id); 

    console.log({ML:ML, MV:MV});  

    
    conexion.query('UPDATE partidos SET Estatus=1, ML=?, MV=? WHERE Id = ?',[ML, MV, Id], (error, results)=>{
       if(error){
            console.log(error);
        }else{           
      //      console.log(results);

      conexion.query('call SP_Ind_CalculaPuntos(?)',[Id] ,(error, results)=>{
        if(error){
            console.log(error);
        }else{           
            console.log(results);


            res.redirect('/partidos');         
        }
});
      
        }
});
}



//ACTUALIZAR partido inicia
exports.updatepatidoIni = (req, res)=>{
    const Id = req.body.Id;

    console.log(Id); 
    
    conexion.query('UPDATE partidos SET Estatus=2 WHERE Id = ?',[Id], (error, results)=>{
       if(error){
            console.log(error);
        }else{           
            console.log(results);   
            res.redirect('/partidos');    
        }
});
}


//ACTUALIZAR un REGISTRO
exports.quiniela_update = (req, res)=>{
    const Id = req.body.Id;
    const Local = req.body.Local;
    const ML = req.body.ML;
    const MV = req.body.MV;
    const Visitante = req.body.Visitante;
    const Id_p = req.session.Id_participante;

    console.log({ML:ML, MV:MV});  
    console.log(Id);
    console.log('Participante: ',Id_p); 

    conexion.query('UPDATE quiniela SET Estatus = 2 WHERE Id <> ? and Id_participante = ? and Estatus = 0' ,[Id , Id_p], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
//            console.log(results);        
        }
    });

    console.log('Parte 1 Estatus=2 : ');

    conexion.query('UPDATE quiniela SET ML=?, MV=?, Estatus=5 WHERE Id = ?',[ML, MV, Id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
 //           console.log(results);

            console.log('Parte 1 Estatus=0 : ');

            res.redirect('/quinielaC');         
        }
    });
}

//ACTUALIZAR un REGISTRO
exports.campeon_update = (req, res)=>{
    const SubCampeon = req.body.SubCampeon;
    const campeon = req.body.campeon;
    const Id_p = req.session.Id_participante;

    console.log({SubCampeon:SubCampeon}); 
    console.log({campeon:campeon}); 
    console.log('Participante: ',Id_p); 

    conexion.query('UPDATE campeon SET Equipo = ? WHERE Id >0 and Id_partido = 65 and Id_participante = ? ' ,[SubCampeon,Id_p], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
//            console.log(results);        
        }
    });

//    console.log('Parte 1 Estatus=2 : ');

    conexion.query('UPDATE campeon SET Equipo = ? WHERE Id >0 and Id_partido = 66 and Id_participante = ? ' ,[campeon,Id_p], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
 //           console.log(results);

 //           console.log('Parte 1 Estatus=0 : ');

            res.redirect('/quiniela');         
        }
    });
}



exports.participantes_updateNuevo = (req, res)=>{
    const Id_participante = req.body.Id_participante;
    const Id_folder = req.body.Id_folder;
    const Nombre = req.body.Nombre;
    const Alias = req.body.Alias;

    const Pass = req.body.Pass;
 
    const Pago = req.body.Pago;

    const Estatus = req.body.Estatus;

    console.log(Id_participante); 

    console.log({Id_folder:Id_folder, Nombre:Nombre});  

//'UPDATE quiniela SET ML=?, MV=? WHERE Id = ?',[ML, MV, Id]

//    conexion.query('UPDATE participantes SET ? WHERE Id_participante = ?',[{Id_folder:Id_folder, Nombre:Nombre, 
//        Alias:Alias, Contacto:Contacto,Correo:Correo,Pass:Pass,Lugar:Lugar,
//        Puntos:Puntos,Monto:Monto,Pago:Pago,Nivel:Nivel,Ip:Ip,Estatus:Estatus}, Id_participante]

        conexion.query('UPDATE participantes SET Id_folder=?, Nombre=?, Pass=?, Pago=?, Estatus=? WHERE Id_participante = ?',[Id_folder,Nombre,Pass,Pago,Estatus, Id_participante], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
      //      console.log(results);
            
      conexion.query('call SP_AltaUsuario(?)',[Id_participante] ,(error, results)=>{
        if(error){
            console.log(error);
        }else{           
            console.log(results);


            res.redirect('/participantes');          
        }
});
        }
});
};

exports.participantes_update = (req, res)=>{
    const Id_participante = req.body.Id_participante;
    const Id_folder = req.body.Id_folder;
    const Nombre = req.body.Nombre;
    const Alias = req.body.Alias;

    const Pass = req.body.Pass;
 
    const Pago = req.body.Pago;

    const Estatus = req.body.Estatus;

    console.log(Id_participante); 

    console.log({Id_folder:Id_folder, Nombre:Nombre});  

//'UPDATE quiniela SET ML=?, MV=? WHERE Id = ?',[ML, MV, Id]

//    conexion.query('UPDATE participantes SET ? WHERE Id_participante = ?',[{Id_folder:Id_folder, Nombre:Nombre, 
//        Alias:Alias, Contacto:Contacto,Correo:Correo,Pass:Pass,Lugar:Lugar,
//        Puntos:Puntos,Monto:Monto,Pago:Pago,Nivel:Nivel,Ip:Ip,Estatus:Estatus}, Id_participante]

        conexion.query('UPDATE participantes SET Id_folder=?, Nombre=?, Pass=?, Pago=?, Estatus=? WHERE Id_participante = ?',[Id_folder,Nombre,Pass,Pago,Estatus, Id_participante], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            console.log(results);
            res.redirect('/participantes');      
        }
});
};

exports.participantes_update2 = (req, res)=>{
    const Id_participante = req.body.Id_participante;
    const Id_folder = req.body.Id_folder;
    const Nombre = req.body.Nombre;
    const Alias = req.body.Alias;
    const Contacto = req.body.Contacto;

    const Correo = req.body.Correo;
    const Pass = req.body.Pass;
    const Lugar = req.body.Lugar;
    const Puntos = req.body.Puntos;
    const Monto = req.body.Monto;

    const Pago = req.body.Pago;
    const Nivel = req.body.Nivel;
    const Ip = req.body.Ip;
    const Estatus = req.body.Estatus;

    console.log(Id_participante); 

    console.log({Id_folder:Id_folder, Nombre:Nombre});  

//'UPDATE quiniela SET ML=?, MV=? WHERE Id = ?',[ML, MV, Id]

//    conexion.query('UPDATE participantes SET ? WHERE Id_participante = ?',[{Id_folder:Id_folder, Nombre:Nombre, 
//        Alias:Alias, Contacto:Contacto,Correo:Correo,Pass:Pass,Lugar:Lugar,
//        Puntos:Puntos,Monto:Monto,Pago:Pago,Nivel:Nivel,Ip:Ip,Estatus:Estatus}, Id_participante]

        conexion.query('UPDATE participantes SET Id_folder=?, Nombre=?, Alias=?, Contacto=?, Correo=?, Pass=?, Lugar=?, Puntos=?, Monto=?, Pago=?, Nivel=?, Ip=?, Estatus=? WHERE Id_participante = ?',[Id_folder,Nombre,Alias,Contacto,Correo,Pass,Lugar,Puntos,Monto,Pago,Nivel,Ip,Estatus, Id_participante], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            console.log(results);
            res.redirect('/participantes'); 
        }
});
};

