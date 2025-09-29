import dados from "../models/dados.js";

const { bruxos } = dados;

let resultado = bruxos;

const getAllBruxos = (req, res) => {

    res.status(200).json({
        total: resultado.length,
        bruxos: resultado
    });
};

const getBruxoById = (req, res) => {
    const id = parseInt(req.params.id);

    const bruxo = bruxos.find(b => b.id === id);

    if (!bruxo) {
        res.status(404).json({
        message: `O bruxo com o id: ${id} não existe.`,
        success: false
        });
    }

    res.status(200).json({
        total: 1,
        bruxo: bruxo
    });
}

const createBruxo = (req, res) => {
    const { nome, casa, anoNascimento, especialidade, nivelMagia, varinha, ativo } = req.body;
    const casaLista = [ "Grifinória","Grifinoria", "Sonserina", "Corvinal", "Lufa-Lufa" ]
    
    if (!nome || !varinha) {
            res.status(400).json({
            success: false,
            message: "Nome e varinha são obrigatórios",
            error: "OBRIGATORY_ELEMENTS",
            suggestions: [
        "Check the wizard varinha",
        "Check the wizard nome"
            ]
        });
    }

    if (!casa || !casaLista.includes(casa)) {
            res.status(400).json({
            status: 400,
            success: false,
            message: `O campo 'casa' deve ser existir e ser preenchido com uma das seguintes opções: ${casaLista.join(", ")}!`,
            error: "OBRIGATORY_ELEMENTS",
            suggestions: [
        "Check the wizard casa"
            ],
        });
    }

    const novoBruxo = {
        id: bruxos.length + 1,
        nome: nome,
        casa: casa,
        anoNascimento: parseInt(anoNascimento),
        especialidade: especialidade,
        nivelMagia: nivelMagia,
        ativo: ativo
    }

    bruxos.push(novoBruxo);

    res.status(201).json({
        sucess: true,
        message: "Novo bruxo matriculado em Hogwarts!",
        bruxo: novoBruxo
    });
}

const deleteBruxos = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            sucess: false,
            message: "O ID deve ser válido"
        })
    }

    const { admin } = req.body;

     if (admin === false) {
        return res.status(403).json({
        status: 403,
        success: false,
        message: "Somente o Diretor pode executar essa magia!",
        error: "AUTHENTICATION_DENIED",
        suggestions: [
            "Change the authentication."
        ],
        });
    }

    const bruxoParaRemover = bruxos.find(b => b.id === id);

    if (!bruxoParaRemover) {
        return res.status(404).json ({
            sucess: false,
            message: `Nenhum bruxo com o id: ${id} encontrado`
        });
    }

    const bruxosFiltrados = bruxos.filter(bruxo => bruxo.id !== id);

    bruxos.splice(0, bruxos.length, ...bruxosFiltrados);

    res.status(200).json({
        status: 200,
        sucess: true,
        message: `O bruxo ${id} foi removido com sucesso`,
        bruxoRemovido: bruxoParaRemover
    });
};

const updateBruxo = (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, casa, anoNascimento, especialidade, nivelMagia, varinha, ativo } = req.body;
    const idParaEditar = id;
    const casaLista = [ "Grifinória","Grifinoria", "Sonserina", "Corvinal", "Lufa-Lufa" ]

    if (isNaN(idParaEditar)) {
        return res.status(400).json({
            success: false,
            messag: "O id deve ser um número válido"
        }) 
    }

    const bruxoExiste = bruxos.find(b => b.id === idParaEditar);

    if (!bruxoExiste) {
        return res.status(404).json({
            status: 404,
            success: false,
            message: "Não é possível editar um bruxo que não existe!",
            error: "ID_NOT_FOUND",
            suggestions: [
        "Check the wizard id"
            ],
        })
    }

    if ( !varinha || !nome || !anoNascimento ) {
        return res.status(400).json({
            success: false,
            message: `O bruxo precisa ter varinha, nome e ano de nascimento (anoNascimento).`,
            
        })
    }

    if (casa) {
        if (!casaLista.includes(casa)) {
            return res.status(400).json({
                success: false,
                message: `O campo 'casa' deve ser preenchido com uma das seguintes opções: ${casaLista.join(", ")}!`
            });
        } 
    }

    const bruxosAtualizados = bruxos.map(bruxo => bruxo.id === idParaEditar ? {
        ...bruxo,
        ...(nome && {nome}),
        ...(anoNascimento && {anoNascimento: parseInt(anoNascimento)} ),
        ...(especialidade && {especialidade}),
        ...(nivelMagia && {nivelMagia}),
        ...(varinha && {varinha}), 
        ...(ativo && {ativo})
    }
        : bruxo
    );

    bruxos.splice(0, bruxos.length, ...bruxosAtualizados);

    const bruxoEditado = bruxos.find(bruxo => bruxo.id === idParaEditar);
    res.status(200).json({
        status: 200,
        success: true, 
        message: "Dados atializados com sucesso",
        bruxo: bruxoEditado
    });
}

export { getAllBruxos, getBruxoById, createBruxo, deleteBruxos, updateBruxo };