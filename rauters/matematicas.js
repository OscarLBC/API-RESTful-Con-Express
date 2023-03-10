const express = require("express");
const { cursos } = require("../BASEDATOS/cursos-BD");
const {matematicas} = require("../BASEDATOS/cursos-BD").cursos
const routerMatematicas = express.Router();

//midlleware
routerMatematicas.use(express.json());

// metodos para el cursos matematicas
routerMatematicas.get("/", (req,res)=>{
    res.json(matematicas);
  });


  //buscar cursos matematicas por tema
routerMatematicas.get("/:tema",(req,res)=>{
    const tema = req.params.tema;
    const resultado = matematicas.filter(cursos => cursos.tema === tema);

    if(resultado.length === 0){
      return res.status(404).send("tema no encontrado en cursos con tema "+tema);
    }

    res.json(resultado);
}) ;


//buscar cursos por el por tema y nivel
routerMatematicas.get("/:tema/:nivel", (req,res)=>{
    const tema = req.params.tema;
    const nivel = req.params.nivel;
    const resultado = matematicas.filter(cursos => cursos.tema === tema && cursos.nivel === nivel);

    if(resultado.length === 0){
       return res.status(404).send("tema no encontrado. en cursos con tema "+lenguaje+" con el nivel "+nivel);
     }

     res.json(resultado);
});


//agregar un nuevo curso de matematicas 
routerMatematicas.post("/",(req,res)=>{
const cursoNuevo = req.body;
matematicas.push(cursoNuevo);
res.json(matematicas);
});


//actualizamos todo los datos de un curso de matematicas
routerMatematicas.put("/:id",(req,res)=>{
const cursoActualizado = req.body;
const id = req.params.id;

const indice = matematicas.findIndex(cursos => cursos.id == id);

if(indice >= 0){
  matematicas[indice] = cursoActualizado;
}
 res.json(matematicas);
});

//actualizar solo campos espesifico de un curso de matematicas
routerMatematicas.patch("/:id",(req,res)=> {
  let infoActualizar = req.body; 
  const id = req.params.id; 
  const indice = matematicas.findIndex(cursos => cursos.id == id); 

  if(indice >= 0){ 
     const cursoAmodificar = matematicas[indice]; 
     Object.assign(cursoAmodificar,infoActualizar); 
  }
  res.send(JSON.stringify(matematicas)); 
    
});

//eliminar un curso de matematicas 
routerMatematicas.delete("/:id",(req,res)=>{
const id = req.params.id;
const indece = matematicas.findIndex(cursos => cursos.id == id);

if(indece >= 0){
  matematicas.splice(indece,1);
}

res.json(matematicas);

});

module.exports = routerMatematicas;

