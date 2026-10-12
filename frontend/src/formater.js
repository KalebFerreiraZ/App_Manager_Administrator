export default function FormaterRV(text){
const linhas = text
    .split(/\r?\n/)
    .map(linha => linha.trim())
    .filter(linha => linha !== "");


// ========================================
// 3. TRANSFORMAR CADA LINHA EM OBJETO
// ========================================

const usuarios = linhas.map(linha => {

    // ----------------------------------------
    // Separa as COLUNAS pelo TAB (\t)
    // ----------------------------------------

    const colunas = linha.split("\t");


    // ----------------------------------------
    // Pegando cada coluna
    // ----------------------------------------

    const matricula = colunas[0]?.trim() || "";

    const nome = colunas[1]?.trim() || "";

    const diarias_ultilizadas =
        Number(colunas[2]?.trim() || 0);

    const diarias_extrasTexto =
        colunas[3]?.trim() || "";

    const justificativa =
        colunas[4]?.trim() || "";

    const dias_a_serem_reabastecidos =
        Number(colunas[5]?.trim() || 0);

    const valorTotalTexto =
        colunas[6]?.trim() || "";


    // ========================================
    // 4. TRATAR DIÁRIAS EXTRAS
    // ========================================

    let diarias_extras = null;

    if (diarias_extrasTexto !== "") {

        diarias_extras = Number(
            diarias_extrasTexto
                .replace(",", ".")
        );

    }


    // ========================================
    // 5. TRATAR VALOR TOTAL
    // ========================================

    let valorTotal = 0;

    if (valorTotalTexto !== "") {

        valorTotal = Number(
            valorTotalTexto

                // remove R$
                .replace("R$", "")

                // remove espaços
                .trim()

                // remove ponto de milhar
                // 2.025 -> 2025
                .replace(/\./g, "")

                // troca vírgula decimal
                // 2025,00 -> 2025.00
                .replace(",", ".")
        );

    }


    // ========================================
    // 6. RETORNAR O OBJETO DO USUÁRIO
    // ========================================
    console.log(colunas)
    return {

        matricula,

        nome,

        diarias_ultilizadas,

        diarias_extras,

        justificativa:
            justificativa !== ""
                ? justificativa
                : null,

        dias_a_serem_reabastecidos,

        valorTotal
        
    };
    
});
    return usuarios;
}