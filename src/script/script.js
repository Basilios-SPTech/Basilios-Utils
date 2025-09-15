const loginContainer = document.getElementById('loginContainer');
const loginScreen = document.getElementById('loginScreen');
const signupScreen = document.getElementById('signupScreen');

function showSignup() {
    loginContainer.classList.add('register');
    loginScreen.classList.remove('active');
    signupScreen.classList.add('active');
    document.querySelector('.login-left').style.display = 'none';
}

function showLogin() {
    loginContainer.classList.remove('register');
    signupScreen.classList.remove('active');
    loginScreen.classList.add('active');
    document.querySelector('.login-left').style.display = 'block';
}

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "" || password === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try{
        const response = await fetch('http://localhost:3000/clientes');
        
        if(response.ok){
            const users = await response.json();
            const user = users.find(u => u.email === username && u.senha === password);

            if (user) {
                alert(`Bem-vindo, ${username}!`);
            } else {
                alert("Usuário ou senha inválidos.");
            }
        }

    }catch(e){
        console.log(e)
    }
}

async function signup() {
    const email = document.getElementById('signupEmail').value;
    const senha = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const telefone = document.getElementById('signupTelefone').value;
    const cpf = document.getElementById('signupCPF').value;
    const rua = document.getElementById('signupRua').value;
    const numero = document.getElementById('signupNumero').value;
    const bairro = document.getElementById('signupBairro').value;
    const complemento = document.getElementById('signupComplemento').value;
    const cep = document.getElementById('signupCep').value;

    if (!email || !senha || !confirmPassword || !telefone || !cpf || !rua || !numero || !bairro || !cep) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    if (senha !== confirmPassword) {
        alert("As senhas não coincidem.");
        return;
    }

    sanitizeInput(document.getElementById('signupEmail').value);
    sanitizeInput(document.getElementById('signupPassword').value);
    sanitizeInput(document.getElementById('signupConfirmPassword').value);

    let forca = validatePassword(senha);

    if (forca === 'fraca') {
        alert("A senha é muito fraca. Por favor, escolha uma senha mais forte.");
        return;
    }

    try{
        const response = await fetch('http://localhost:3000/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha, telefone, cpf, rua, numero, bairro, complemento, cep })
        });

        if(response.ok){
            alert(`Usuário ${email} cadastrado com sucesso!`);
            showLogin();
        }

    }catch(e){
        console.log(e)
    }

    
}