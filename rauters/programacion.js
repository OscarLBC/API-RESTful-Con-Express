const express = require("express"); //importamos el modulo express
const { cursos } = require("../BASEDATOS/cursos-BD"); //importamos el modulo cursos-DB.js// que es una arreglo  que hace el papel de uan bade de datos llamda cursos
const {programacion} = require("../BASEDATOS/cursos-BD").cursos; //si queremo una parte espefica del arreglo, en este caso fue la parte programacion del arreglo cursos
const routerProgramacion = express.Router(); //creamos una router, el cual en el archivo le asignaremos en un camino o path en el modulo principal app.js


//middleware
routerProgramacion.use(express.json()); //revisa cada solicitud y respuesta que sea json


//metodos para el cursos programmacion


routerProgramacion.get("/",(req,res)=>{ 
   //res.send(JSON.stringify(programacion)); //convertir el arreglo a json
   res.json(programacion); //otra forma de hacerlo mas proffesional
});

//buscar cursos de programacion por el lenguaje
routerProgramacion.get("/:lenguaje",(req,res)=>{
      const lenguaje = req.params.lenguaje; //capturamos el parametro que esta en la url, lenguaje

      const resultado = programacion.filter(cursos => cursos.lenguaje === lenguaje); //filtro en el arreglo con el lenguaje a buscar

      if(resultado.length === 0){ //condicionales si no existe el registro a buscar
        return res.status(202).send("Lenguaje no encontrado en cursos con lengauje "+lenguaje);
      }

      ordenar(req,res,resultado); //funcion para ordenar los resultados

      res.send(JSON.stringify(resultado)); //mostramos el elemento encontrado, se puede enviar con res.json(resuldado)
}) 

//buscar cursos de programacion por el lenguaje y nivel
routerProgramacion.get("/:lenguaje/:nivel", (req,res)=>{
     const lenguaje = req.params.lenguaje;
     const nivel = req.params.nivel;
     const resultado = programacion.filter(cursos => cursos.lenguaje === lenguaje && cursos.nivel === nivel);

     if(resultado.length === 0){
        return res.status(202).send("Lenguaje no encontrado. en cursos con lengauje "+lenguaje+" con el nivel "+nivel);
      }

      res.send(JSON.stringify(resultado));
});

//registros de cursos de programacion con el metodo post
routerProgramacion.post("/",(req,res) => {
     let cursoNuevo = req.body;  //capturamos datos que viene en el cuerpo de la solicitud 
     programacion.push(cursoNuevo); //agremanos el nuevo datos al arreglo
     res.send(programacion); //mostramos el arreglo por completo

});

//actualizar todo los campos de cursos de programacion
routerProgramacion.put("/:id",(req,res)=>{
  let cursoActualizado = req.body; //capturamos datos que viene en el cuerpo de la solicitud
  const id = req.params.id;  //capturamos el parametro id que viene en la url 
  
  const indice = programacion.findIndex(cursos => cursos.id == id); //buscamos con la id, el cursos de programacion en el arreglo y lo guardamos en la variable index

  if(indice >= 0){ //validamos que indece tenga datos
   programacion[indice] = cursoActualizado; //actualizamos los nuevo datos 
  }
  res.send(JSON.stringify(programacion)); //mostramos el arreglo completo

});

//actualizar solo campos deseado
routerProgramacion.patch("/:id",(req,res)=> {
   let infoActualizar = req.body; //capturammos datos del cuerpo de la solicitud
   const id = req.params.id; //capturamos de la id que viene como parametro por la ruta o url "/:id"

   const indice = programacion.findIndex(cursos => cursos.id == id); //consultamos los datos en el arreglo programacion

   if(indice >= 0){ //validamos si existe curso con la id

      const cursoAmodificar = programacion[indice]; //si es asi,  creamo una  ueva constante donde guradara los datos del cursos con id a buscar

      Object.assign(cursoAmodificar,infoActualizar); //metodo que sirve para actualizar los campos idvidual, recibe como parametro cursos a actualizar y los campos actualizar de ese curso 
   }

   res.send(JSON.stringify(programacion)); //mostramos el arreglo completo
   
   
});


//eliminar
routerProgramacion.delete("/:id",(req,res)=>{
     const id = req.params.id; //capturamos la id 

     const indice = programacion.findIndex(cursos => cursos.id == id); //buscamos lo datos del curso

     if(indice >= 0){ //validamos si exista el curso
      programacion.splice(indice,1); //eliminamos los datos de curso del arreglo
     }

     res.send(JSON.stringify(programacion));  //mostramos el arreglo
});


//funciones
function ordenar(req,res,resultado){
    if(req.query.ordenar === "vistas"){
       return res.send(JSON.stringify(resultado.sort((a,b)=> b.vistas - a.vistas)))
    }
}

module.exports = routerProgramacion; //exportamos