const MongoClient = require("mongodb").MongoClient;

module.exports = class Conexion{

  constructor(){

    this.__bd;
  }

  iniciar(){

    return new Promise((cumplida, falla) => {

      MongoClient.connect(

        process.env.CONEXION_MONGO,

        (err, conexion) => {

          if(err) return falla(`MONGO_CONEXION: ${err.stack}`);

          this.__bd = conexion;

          cumplida(this);


       })

    })
  }

  getVisitas(){

    return this.__bd.collection("visitas")

          .findOne({_id: "ACTUALES"})

  }

  nuevaVisita(visitas = 0){

    return this.__bd.collection("visitas")

      .updateOne({_id: "ACTUALES"}, 

        {

          "$set": {

            visitas: visitas + 1

          }

        },

        {
          upsert: true
        }
      )
  }

}
