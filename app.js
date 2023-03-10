const express = require("express"); //importamos el modulo express
const cursosBD = require("./BASEDATOS/cursos-BD") ; //importamos el modulo que hace el papel de base de datos
const app = express(); //creamos una app que tenaga el metodo express

//mmidlleware
app.use(express.json());

//router
const routerProgramacion = require("./rauters/programacion"); //importamos el modulo programacion.js
app.use("/api/cursos/programacion",routerProgramacion); //le agreamos el camino o path al roueter de programacion
const routerMatematicas = require("./rauters/matematicas");//importamos el modulo matematicas.js
app.use("/api/cursos/matematicas",routerMatematicas);//le agreamos el camino o path al roueter de matematicas


//routing
app.get("/",(req,res)=>{ //ruta raiz del pryecto
  res.end("mi primer servidor con express"); //mensaje al cliente
});

app.get("/api/cursos",(req,res)=>{ //metos para mostrar todos los cursos
   res.send(JSON.stringify(cursosBD.cursos)); //
});


//poner escuchar el servidor
const PUERTO = process.env.PORT || 3000; //puerto donde estara escuchando el serivdor
app.listen(PUERTO,()=> {
  console.log("el servidor esta escuchando en el puerto "+PUERTO + " .....");
});