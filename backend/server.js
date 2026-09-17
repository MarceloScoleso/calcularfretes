// IMPORTAR O MODULO EXPRESS - framework de aplicação web para Node.js
const express = require('express');

// MÓDULO QUE PERMITE QUE O SERVIDOR ACEITE REQUISIÇÕES DIFERENTES (DOMÍNIOS)
const cors = require('cors');

// INSTANCIANDO EXPRESS PARA APP
const app = express();

// DEFININDO A PORTA QUE O SERVIDOR VAI EXECUTAR
const port = 3001;

// CONFIGURA O EXPRESS PARA ANALISAR AS REQUISIÇÕES COM O CORPO NO FORMATO JSON, 
// ISSO É NECESSÁRIO PARA LER OS DADOS ENVIADOS NO CORPO DA REQUISIÇÃO POST
app.use(express.json());

// HABILITA O CORS PARA TODAS AS ROTAS DA APLICAÇÃO, PERMITINDO ACESSO
app.use(cors());

// OBJETO (TABELA COM OS PREÇOS)
const precos={
    bicicleta: 0.75, // preço por km para bicicleta
    carro: 0.25, // preço por km para carro
    drone: 1.20 // preço por km para drone
}

// DEFININDO UMA ROTA DE API TIPO POST
// FUNÇÃO DE CALLBACK LIDA COM REQUISIÇÃO 
app.post('calcularfrete',(req,res)=>{
    // destruct para o corpo da requisição e extrair distância e tipotransporte
    const {distancia,tipoTransporte} = req.body;

    //verifica se a distância ou tipoTransporte não foram fornecidos
    if(distancia === undefined || tipoTransporte === undefined) {
        return res.status(400).json({error:'Distância e tipo de transporte são obrigatórios'})
    }

    // BUSCA O PREÇO POR KM NO OBJETO CONVERTENDO O TIPO DE TRANSPORTE PARA MINÚSCULAS
    const precoPorKm = precos[tipoTransporte.toLowerCase()];

    // VERIFICA SE O TIPOTRANSPORTE FORNECIDO EXISTE NA TABELA DE PREÇOS
    if(precoPorKm === undefined) {
        return res.status(400).json({error: "Tipo de transporte inválido"})
    }

    // CALCULA O VALOR TOTAL DO FRETE MULTIPLICANDO A DISTÂNCIA PELO PREÇO POR KM
    const valorTotal = distancia * precoPorKm;

    // ENVIA A RESPOSTA COM O OBJETO JSON
    // TOFIXED - FORMATA O VALOR TOTAL PARA TER EXATAMENTE DUAS CASAS DECIMAIS
     res.json({valorTotal: valorTotal.toFixed(2)})
})

// INICIA O SERVIDOR PARA QUE ELE COMECE A ESCUTAR AS REQUISIÇÕES NA PORTA
app.listen(port,()=>{
    console.log(`Servidor rodando na porta http://localhost:${port}`);
})