
import { useState } from "react"
import Formater from "./formater.js"
import formatarRV from "./formaterRV.js"
import Menu from "./Menu.jsx"
import "./App.css"

export default function App(){
    
    const [users,setUsers] = useState(null)
    const [rv,setRv] = useState(null)
    const [text,setText] = useState(null)
    const [isVisible,setVisible] = useState(false)
    const [message,setMessage] = useState('')
    const [messageError,setMessageError] = useState(null)
    const [textRV,setTextRV] = useState("")
    function Handler(e){
        setText(e.target.value)
    }
function formatandoRV() {
    const usuarios = formatarRV(textRV);
     setRv(usuarios);
    console.log(rv)
}
    function formatar(){
        
        const usuarios = Formater(text)
        setUsers(usuarios)
    }

    async function create(){
        const confirmar = window.confirm( "Você realmente quer CRIAR esses usuários no banco de dados?" ); if (!confirmar) { return; }

        setMessage('')
        setMessageError(null)

        const response = await fetch('http://localhost:3001/criar',{
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({usuarios:users})
        })

        setVisible(true)
        const data = await response.json()
        console.log(data)
        setVisible(false)
        setMessage(data.message)
            const erro = data.userError
        if(erro.length > 0){
            setMessageError(data?.messageError ?? null)
        }
    }

    async function update(){
        const confirmar = window.confirm( "Você realmente quer ATUALIZAR esses usuários no banco de dados?" ); if (!confirmar) { return; }
                setMessage('')
               setMessageError(null)
        const response = await fetch('http://localhost:3001/atualizar',{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({usuarios:users})
        })

        setVisible(true)
        const data = await response.json()
        console.log(data)
        setVisible(false)
        setMessage(data.message)
        
    }

    async function deleter(params) {
        const confirmar = window.confirm( "Você realmente quer DELETAR esses usuários no banco de dados?" ); if (!confirmar) { return; }
                setMessage('')
               setMessageError(null)
        const response = await fetch('http://localhost:3001/deletar',{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({usuarios:users})
        })

        setVisible(true)
        const data = await response.json()
        console.log(data)
        setVisible(false)
        setMessage(data.message)
    }
    async function reqRV(params) {
        const confirmar = window.confirm( "obs:CERTIFIQUE-SE DE QUE OS CADASTROS / MATRICULAS JA EXISTEM NO BANCO DE DADOS PARA PROSEGUIR"); if (!confirmar) { return; }
        setMessageError(null)
          setMessage('')
        const response = await fetch('http://localhost:3001/rvUp',{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                rvs:rv
            })
        })
        const data = await response.json()
        setMessage(data?.message ?? null)
        const erro = data.userError
        if(erro.length > 0){
            setMessageError(data?.messageError ?? null)
        }
        
    }
    return(
        <div className="app">

            <Menu></Menu>

            <main className="container">

                <div className="page-header">
                    <h1>Cadastro e Registros Excel</h1>
                    <p>
                        Insira os dados da planilha e escolha uma operação.
                    </p>
                </div>

                <section className="section">
                    <h1>Diarias</h1>

                    <textarea
                        onChange={(e) => Handler(e)}
                        placeholder="Insira os dados da Diaria Aqui..."
                    ></textarea>

                    <button
                        className="format-button"
                        onClick={formatar}
                    >
                        Formatar
                    </button>
                </section>

                <section className="section">
                    <h2>Enviando os dados</h2>

                    <p className="section-description">
                        Escolha o que deseja fazer com os dados formatados.
                    </p>

                    <div className="buttons">

                        <button onClick={create}>
                            Criar no Banco
                        </button>

                        <button onClick={update}>
                            Atualizar no Banco
                        </button>

                        <button
                            className="delete-button"
                            onClick={deleter}
                        >
                            Deletar no Banco
                        </button>

                    </div>
                </section>
                <h1>Respostas do servidor:</h1>
                {isVisible && (
                    <div className="processing">
                        Dados sendo Processados...
                    </div>
                )}

                {message !== null && (
                    <div className="message">
                        {message}
                    </div>
                )}
                {messageError !== null && (<div className="message">{messageError}</div>)}
                
                   <div>
                    <h1>RVs</h1>
                    <p><strong>obs:</strong> primeiro crie os registros / usuarios apartir das diarias,para nao ocorrer erros</p>
                    <textarea placeholder="insira os dados RV aqui..." value={textRV} onChange={(e) => setTextRV(e.target.value)}></textarea>
                    <button onClick={formatandoRV}>Formatar</button>
                    <button onClick={reqRV}>Enviar</button>
                </div>
            </main>
             
        </div>
    )
}
