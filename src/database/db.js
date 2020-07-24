//importar a dependencia do sqlite3

const sqlite3 =require("sqlite3").verbose()

//criar o objeto que ira fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

// utilizar o objeto de banco de dados para nossa operações
 
    db.serialize(() => {

   //com comandos sql eu vou:

    //1criar uma tabela    

   
    db.run(`
       CREATE TABLE IF NOT EXISTS places(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
           address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT

        );
    `) 

    //2 inserir dados na tabela

    
            
   

//4 deletar um dado da tabela

    db.run(`DELETE FROM places where id= ?`,[2],function(err){
      if(err) {
             return console.log(err)
      }
         console.log("Registro deletado com sucesso")

    })
 //3 consultar dados da tabela
 db.all(`SELECT * FROM places`,function(err,rows){
    if(err) {
        return console.log(err)
     }

    console.log("Aqui estão seus registros")
    console.log(rows)
})

})

