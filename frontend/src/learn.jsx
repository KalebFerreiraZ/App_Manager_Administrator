
import exemple from "./assets/exemple.png";
import "./DOCS.css";

export default function DOCS() {
    return (
        <div className="docs">

            <header className="docs-header">
                <h1>Gerenciador de Usuários Excel</h1>
                <p>
                    Documentação e orientações do sistema
                </p>
            </header>

            <main className="docs-content">

                <section className="docs-section">
                    <h2>Pra que serve</h2>

                    <p>
                        O Gerenciador de Usuários Excel tem como objetivo
                        facilitar o envio e a organização dos dados dos
                        motoristas que estão armazenados em planilhas do
                        Excel. Os dados da planilha são inseridos no sistema
                        e enviados para o banco de dados, onde ficam
                        organizados para serem consultados posteriormente.
                    </p>

                    <p>
                        A ideia é facilitar o acesso dos motoristas às suas
                        próprias informações, permitindo que eles consultem
                        seus dados pelo celular através da matrícula, sem
                        precisar acessar diretamente a planilha original.
                    </p>
                </section>

                <section className="docs-section">
                    <h2>Como usar</h2>

                    <p>
                        Selecione os dados do Excel e copie os dados com
                        Control + C, como neste exemplo:
                    </p>

                    <div className="image-container">
                        <img
                            src={exemple}
                            alt="Exemplo de dados copiados do Excel"
                        />
                    </div>

                    <p>
                        Depois, vá no app principal e cole os dados com
                        Control + V dentro do primeiro campo.
                    </p>

                    <p>
                        Como os dados estão todos quebrados, clique em
                        <strong> Formatar </strong>
                        depois de colocá-los no campo.
                    </p>
                </section>

                <section className="docs-section">
                    <h2>Funcionalidades</h2>

                    <p>
                        Depois de concluir o processo anterior, o aplicativo
                        oferece algumas funcionalidades.
                    </p>

                    <div className="feature">
                        <h3>Criar no Banco</h3>
                        <p>
                            Leva os dados formatados para o banco de dados,
                            criando um documento individual para cada usuário.
                        </p>
                    </div>

                    <div className="feature">
                        <h3>Atualizar no Banco</h3>
                        <p>
                            Atualiza os dados dos usuários a partir da
                            matrícula. Em vez de criar novos usuários,
                            os dados enviados atualizam os usuários existentes.
                        </p>
                    </div>

                    <div className="feature">
                        <h3>Deletar no Banco</h3>
                        <p>
                            Deleta os usuários a partir de suas matrículas.
                            A ideia é semelhante à atualização, mas nesse caso
                            os usuários são removidos do banco de dados.
                        </p>
                    </div>
                </section>

           
            </main>
         
        </div>
    );
}

