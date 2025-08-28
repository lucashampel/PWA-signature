// Validação de CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i-1]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i-1]) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[10])) return false;
    return true;
}

// Captura de assinatura
const canvas = document.getElementById('assinatura');
const ctx = canvas.getContext('2d');
let desenhando = false;

canvas.addEventListener('mousedown', iniciarDesenho);
canvas.addEventListener('mousemove', desenhar);
canvas.addEventListener('mouseup', pararDesenho);
canvas.addEventListener('touchstart', iniciarDesenho);
canvas.addEventListener('touchmove', desenhar);
canvas.addEventListener('touchend', pararDesenho);

function iniciarDesenho(e) {
    desenhando = true;
    ctx.beginPath();
    ctx.moveTo(getX(e), getY(e));
}

function desenhar(e) {
    if (!desenhando) return;
    ctx.lineTo(getX(e), getY(e));
    ctx.stroke();
}

function pararDesenho() {
    desenhando = false;
}

function getX(e) {
    if (e.type.includes('touch')) {
        return e.touches[0].clientX - canvas.offsetLeft;
    }
    return e.offsetX;
}

function getY(e) {
    if (e.type.includes('touch')) {
        return e.touches[0].clientY - canvas.offsetTop;
    }
    return e.offsetY;
}

function limparAssinatura() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Envio do formulário
document.getElementById('formulario').addEventListener('submit', function(e) {
    e.preventDefault();
    const cpf = document.getElementById('cpf').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    
    if (!validarCPF(cpf)) {
        alert('CPF inválido!');
        return;
    }

    if (!dataNascimento) {
        alert('Por favor, informe a data de nascimento.');
        return;
    }

    const assinatura = canvas.toDataURL(); // Converte a assinatura para base64
    console.log({ cpf, dataNascimento, assinatura });

    // Aqui você pode enviar os dados para um backend (ex.: via fetch)
    // fetch('https://seu-backend.com/api/salvar', {
    //     method: 'POST',
    //     body: JSON.stringify({ cpf, dataNascimento, assinatura }),
    //     headers: { 'Content-Type': 'application/json' }
    // });
    alert('Dados enviados com sucesso!');
});