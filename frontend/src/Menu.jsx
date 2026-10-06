import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Menu() {
    const navigate = useNavigate();

    const meses = [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro"
    ];

    const [mes, setMes] = useState("");

    function mesAtualBrasilia() {
        return new Intl.DateTimeFormat("pt-BR", {
            month: "long",
            timeZone: "America/Sao_Paulo"
        }).format(new Date());
    }

    function abrirOpcoes() {
        setMes(mesAtualBrasilia());
    }

    function selecionarMes(e) {
        setMes(e.target.value);
    }

    return (
        <div>
            <button onClick={() => navigate("/learn")}>
                Como usar?
            </button>

            <select
                onFocus={abrirOpcoes}
                onChange={selecionarMes}
                value={mes}
            >
                <option value="" disabled>
                    Mes atual
                </option>

                {meses.map((mes) => (
                    <option key={mes} value={mes}>
                        {mes}
                    </option>
                ))}
            </select>

            {mes && (
                <p>
                    Mês selecionado: {mes}
                </p>
            )}
        </div>
    );
}