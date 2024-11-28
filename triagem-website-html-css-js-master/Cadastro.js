function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    if (cpf.length <= 11) {
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    return cpf;
}

// Automatizar a formatação do CPF enquanto o usuário digita
document.getElementById("cpf").addEventListener("input", function() {
    this.value = formatarCPF(this.value);
});

function formatarTelefone(telefone) {
    telefone = telefone.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    if (telefone.length <= 11) {
        telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    }
    return telefone;
}

document.getElementById("telefone").addEventListener("input", function() {
    this.value = formatarTelefone(this.value);
});

// Função para enviar o cadastro via WhatsApp
function enviarCadastro() {
    const nome = document.getElementById("nome").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const dataNascimento = document.getElementById("data_nascimento").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const tipoConsulta = document.getElementById("tipo_consulta").value.trim();

    if (!nome || !cpf || !dataNascimento || !email || !telefone || !tipoConsulta) {
        alert("Todos os campos devem ser preenchidos.");
        return;
    }

    // Mensagem que será enviada
    const mensagem = `Olá! Estou fazendo um Agendamento no SUS. Aqui estão meus dados:
    Nome: ${nome}
    CPF: ${cpf}
    Data de Nascimento: ${dataNascimento}
    E-mail: ${email}
    Telefone: ${telefone}
    Tipo de consulta: ${tipoConsulta}
    Aguardo retorno.`;

    const mensagemCodificada = encodeURIComponent(mensagem);

    // Número para o qual será enviado a mensagem
    const numeroWhatsApp = "559981434985"; 

    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

    window.location.href = linkWhatsApp;
}
document.addEventListener('touchmove', function (event) {
    if (event.scale !== 1) {
        event.preventDefault();
    }
}, { passive: false });

document.addEventListener('gesturestart', function (event) {
    event.preventDefault();
}, { passive: false });

document.addEventListener('gesturechange', function (event) {
    event.preventDefault();
}, { passive: false });

document.addEventListener('gestureend', function (event) {
    event.preventDefault();
}, { passive: false });


