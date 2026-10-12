import express from 'express'
import db from '../db.js'
const RVroute = express.Router()

RVroute.put('/',(req,res) =>{
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
    const lista = req.body.rvs
    const newUsers = []
    const errorUsers = []

    async function enviar(params) {
    for await(const element of lista){
        const request = await tabela.findOne({
            matricula:element.matricula
        })
        if(request){
            newUsers.push(element)
        }
        else{
            errorUsers.push(element.matricula)
        }
    }

        for await (const element of newUsers){
    const usuarioRV = {
    RV_Mot: element.RV_Mot,
    RV_Viagems: element.RV_Viagems,
    Disel: element.Disel,
    seguranca: element.seguranca,
    jornada: element.jornada
};
            const rvsUpdate = await tabela.updateOne({
                matricula:element.matricula
            },{$set:{
                justificativa: usuarioRV
            }})
        }
        res.json({message:"deu certo",messageError:`ERRO SIMPLES: as matriculas ${errorUsers} nao existem no banco de dados,portanto RVs de matricula: ${errorUsers} nao atualizados. certifique-se de que esses usuarios existem e tente novamente`,userError:errorUsers})
    }
    
    enviar()

    
})
export default RVroute