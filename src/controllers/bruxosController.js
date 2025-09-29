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

console.log(varinha.length)

    if (!nome || !casa || !varinha) {
        return res.status(400).json({
            sucess: false,
            message: "Nome e casa são obrigatórios"
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
        message: "Bruxo cadastrado com sucesso",
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
        sucess: true,
        message: `O bruxo ${id} foi removido com sucesso`
    })
} 

const updateBruxo = (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, casa, anoNascimento, especialidade, nivelMagia, varinha, ativo } = req.body;
    const idParaEditar = id;
    const casaLista = [ "Grifinória", "Sonserina", "Corvinal", "Lufa-Lufa" ]

    if (isNaN(idParaEditar)) {
        return res.status(400).json({
            success: false,
            messag: "O id deve ser um número válido"
        }) 
    }

    const bruxoExiste = bruxos.find(b => b.id === idParaEditar);

    if (!bruxoExiste) {
        return res.status(404).json({
            success: false,
            message: `O bruxo com o id: ${id} não foi encontrado`
        })
    }

    if ( !varinha || !nome || !anoNascimento ) {
        return res.status(400).json({
            success: false,
            message: `O bruxo precisa ter varinha, nome e ano de nascimento (anoNascimento).`
        })
    }

    if (casa) {
        if (!casaLista.includes(casa.toLowerCase())) {
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
        success: true, 
        message: "Dados atializados com sucesso",
        bruxo: bruxoEditado
    }) 
}

export { getAllBruxos, getBruxoById, createBruxo, deleteBruxos, updateBruxo };