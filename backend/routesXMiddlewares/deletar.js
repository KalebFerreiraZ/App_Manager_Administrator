import express from 'express'
import db from '../db.js'

const deleteRoute = express.Router()
deleteRoute.put('/',(req,res) =>{
     let tabela;

    const data = new Date();
    const mes = data.toLocaleString("pt-BR", {
    month: "long"
    });
    
    if (mes === "janeiro") {
    // Janeiro
    tabela = db.collection('janeiro')
} else if (mes === "fevereiro") {
    // Fevereiro
     tabela = db.collection('fevereiro')
} else if (mes === "março") {
    // Março
     tabela = db.collection('marco')
} else if (mes === "abril") {
    // Abril
     tabela = db.collection('abril')
} else if (mes === "maio") {
    // Maio
     tabela = db.collection('maio')
} else if (mes === "junho") {
    // Junho
     tabela = db.collection('junho')
} else if (mes === "julho") {
    // Julho
    tabela = db.collection('julho')
} else if (mes === "agosto") {
    // Agosto
     tabela = db.collection('agosto')
} else if (mes === "setembro") {
    // Setembro
     tabela = db.collection('setembro')
} else if (mes === "outubro") {
    // Outubro
     tabela = db.collection('outubro')
} else if (mes === "novembro") {
    // Novembro
     tabela = db.collection('novembro')
} else if (mes === "dezembro") {
    // Dezembro
    tabela = db.collection('dezembro')
}
    const usuarios = req.body.usuarios
    async function enviar(params) {
        if(!usuarios || typeof usuarios == 'string'){
            res.json({message:"usuarios nao existem"})
            return;
        }
    for(const element of usuarios){

        if(element.matricula){
        const deleting = await tabela.deleteOne({
            matricula:element.matricula
    })
}
    } 
    res.json({message:"Usuarios deletados com sucesso."})  
}
enviar()
})
export default deleteRoute