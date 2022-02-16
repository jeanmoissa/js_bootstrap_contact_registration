var idVerifica;
var id = 1;
var arrayContatos = [];

function atualizarPagina(){
    location.reload();
}

function limparCampos() {
    document.getElementById("txtNome").value = "";
    document.getElementById("txtEmail").value = "";
    document.getElementById("txtDataNascimento").value = "";
    document.getElementById('txtCpf').value = ""
    document.getElementById("txtCidade").value = "";
    document.getElementById("txtEstado").value = "";
    document.getElementById("txtEndereco").value = "";
}

function verificarEmail(email) {
    var re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
        alert("Email Invalido!")
        return false;
    }
    return true;
}

function verificarCpf(cpf) {
    var re = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    if (!re.test(cpf)) {
        alert("CPF inválido!");
        return false;
    }
    return true;
}

function formatarDataNascimento(_dataNascimento) {
    var dataNascimentoFormatada = new Date(_dataNascimento);
    return dataNascimentoFormatada = dataNascimentoFormatada.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}

function verificarPreenchimentoCampos(contato) {

    var msg = '';

    if (contato.nome == '')
        msg += '-Informe o nome do Contato \n';
    if (contato.email == '')
        msg += '-Informe o email do Contato \n';
    if (contato.dataNascimento == '')
        msg += '-Informe a data de nascimento do Contato \n';
    if (contato.cpf == '')
        msg += '-Informe o CPF do Contato \n';
    if (msg != '') {
        alert(msg);
        return false
    }
    return true;
}

function adicionar(contato) {
    this.arrayContatos.push(contato);
    this.id++;
}

function cadastrarContato() {
    var contato = this.lerDados();
    var email = document.getElementById("txtEmail").value;
    var cpf = document.getElementById("txtCpf").value;

    if (this.verificarPreenchimentoCampos(contato) && this.verificarEmail(email) && this.verificarCpf(cpf)) {
        this.adicionar(contato);
        this.listarTabela();

    }
}

function lerDados() {
    return {
        id: this.id,
        nome: document.getElementById('txtNome').value,
        email: document.getElementById('txtEmail').value,
        dataNascimento: document.getElementById('txtDataNascimento').value,
        cpf: document.getElementById('txtCpf').value,
        cidade: document.getElementById('txtCidade').value,
        estado: document.getElementById('txtEstado').value,
        endereco: document.getElementById('txtEndereco').value
    }
}

function listarTabela() {
    document.getElementById('tbody').innerText = '';

    for (var i = 0; i < this.arrayContatos.length; i++) {
        inserirDados(i);
    }
    limparCampos();
}

function deletarContato(id) {
    for (let i = 0; i < this.arrayContatos.length; i++) {
        if (this.arrayContatos[i].id == id) {
            var conf = confirm("Gostaria de excluir o contato " + this.arrayContatos[i].nome + " ? ");
            if (conf == true) {
                this.arrayContatos.splice(i, 1);
                document.getElementById('tbody').deleteRow(i);
                break;
            }
        }
    }
    limparCampos();
    document.getElementById("btnCadastrar").style.display = "inline-block";
    document.getElementById("btnSalvar").style.display = "none";
}


function editarContato(id) {
    document.getElementById("btnCadastrar").style.display = "none";
    document.getElementById("btnSalvar").style.display = "inline-block";

    for (var i = 0; i < this.arrayContatos.length; i++) {
        if (this.arrayContatos[i].id == id) {

            idVerifica = this.arrayContatos[i].id;
            document.getElementById("txtNome").value = this.arrayContatos[i].nome;
            document.getElementById("txtEmail").value = this.arrayContatos[i].email;
            document.getElementById("txtDataNascimento").value = this.arrayContatos[i].dataNascimento;
            document.getElementById("txtCpf").value = this.arrayContatos[i].cpf;
            document.getElementById("txtCidade").value = this.arrayContatos[i].cidade;
            document.getElementById("txtEstado").value = this.arrayContatos[i].estado;
            document.getElementById("txtEndereco").value = this.arrayContatos[i].endereco;

            break;
        }
    }
}

function salvarContato() {

    var contato = this.lerDados();
    var email = document.getElementById("txtEmail").value;
    var cpf = document.getElementById("txtCpf").value;

    if (this.verificarPreenchimentoCampos(contato) && this.verificarEmail(email) && this.verificarCpf(cpf)) {

        for (var i = 0; i < this.arrayContatos.length; i++) {
            if (this.arrayContatos[i].id == idVerifica) {

                this.arrayContatos[i].id = idVerifica;
                this.arrayContatos[i].nome = document.getElementById("txtNome").value
                this.arrayContatos[i].email = document.getElementById("txtEmail").value;
                this.arrayContatos[i].dataNascimento = document.getElementById("txtDataNascimento").value;;
                this.arrayContatos[i].cpf = document.getElementById('txtCpf').value;
                this.arrayContatos[i].cidade = document.getElementById("txtCidade").value;
                this.arrayContatos[i].estado = document.getElementById("txtEstado").value
                this.arrayContatos[i].endereco = document.getElementById("txtEndereco").value;

                break;
            }
            inserirDados(i);
        }
    }
    listarTabela();
    limparCampos();
    document.getElementById("btnCadastrar").style.display = "inline-block";
    document.getElementById("btnSalvar").style.display = "none";
}

function inserirDados(i) {
    var tbody = document.getElementById('tbody');
    var linha = tbody.insertRow();

    var colunaNome = linha.insertCell();
    var colunaEmail = linha.insertCell();
    var colunaDataNascimento = linha.insertCell();
    var colunaCpf = linha.insertCell();
    var colunaCidade = linha.insertCell();
    var colunaEstado = linha.insertCell();
    var colunaEndereco = linha.insertCell();
    var colunaAcoes = linha.insertCell();

    var btnDeletar = document.createElement("input");
    btnDeletar.setAttribute("type", "button");
    btnDeletar.setAttribute("id", "btnDeletar");
    btnDeletar.setAttribute("width", "10px");
    btnDeletar.setAttribute("value", "EXCLUIR");
    btnDeletar.setAttribute("class", "btn btn-outline-danger m-1");
    btnDeletar.setAttribute("onclick", "deletarContato(" + this.arrayContatos[i].id + ")");

    var btnEditar = document.createElement("input");
    btnEditar.setAttribute("type", "button");
    btnEditar.setAttribute("id", "btnEditar");
    btnEditar.setAttribute("width", "10px");
    btnEditar.setAttribute("value", "EDITAR");
    btnEditar.setAttribute("class", "btn btn-outline-primary m-1");
    btnEditar.setAttribute("onclick", "editarContato(" + this.arrayContatos[i].id + ");");

    colunaID = this.arrayContatos[i].id;
    colunaNome.innerText = this.arrayContatos[i].nome;
    colunaEmail.innerText = this.arrayContatos[i].email;
    colunaDataNascimento.innerText = formatarDataNascimento(this.arrayContatos[i].dataNascimento);
    colunaCpf.innerText = this.arrayContatos[i].cpf;
    colunaCidade.innerText = this.arrayContatos[i].cidade;
    colunaEstado.innerText = this.arrayContatos[i].estado;
    colunaEndereco.innerText = this.arrayContatos[i].endereco;

    colunaAcoes.appendChild(btnEditar);
    colunaAcoes.appendChild(btnDeletar);


}
