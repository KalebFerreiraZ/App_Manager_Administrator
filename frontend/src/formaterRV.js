export function converterMoeda(valor) {
    if (!valor) return null;

    valor = valor.trim();

    if (valor === "-" || valor === "—") {
        return null;
    }

    valor = valor
        .replace(/R\$/gi, "")
        .replace(/\s/g, "")
        .replace(/\u00A0/g, "");

    valor = valor
        .replace(/\./g, "")
        .replace(",", ".");

    const numero = Number(valor);

    return Number.isNaN(numero) ? null : numero;
}

export default function formatarRV(text) {
    if (!text) return [];

    const linhas = text
        .split(/\r?\n/)
        .map(linha => linha.trim())
        .filter(linha => linha);

    const usuarios = [];

    for (const linha of linhas) {

        let colunas;

        if (linha.includes("\t")) {
            colunas = linha.split("\t");
        }
        else if (linha.includes("|")) {
            colunas = linha.split("|");
        }
        else {
            continue;
        }

        colunas = colunas.map(coluna => coluna.trim());

        // Ignora linha de separação do Markdown
        if (
            colunas[0] === "------" ||
            colunas[0].startsWith("---")
        ) {
            continue;
        }

        const matricula = colunas[0];

        if (!matricula) {
            continue;
        }

        const usuario = {
            matricula: matricula,
            RV_Mot: converterMoeda(colunas[3]),
            RV_Viagems: converterMoeda(colunas[4]),
            Disel: converterMoeda(colunas[6]),
            seguranca: converterMoeda(colunas[7]),
            jornada: converterMoeda(colunas[8])
        };

        usuarios.push(usuario);
    }

    return usuarios;
}