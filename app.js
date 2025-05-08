// Função para mostrar a história
function showHistory() {
    document.getElementById('history').scrollIntoView({ behavior: 'smooth' });
}

// Função para login de administração com senha
document.getElementById('admin-login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const password = document.getElementById('admin-password').value;
    if (password === 'senha123') {
        document.getElementById('admin-content').style.display = 'block';
        document.getElementById('admin-password').disabled = true;
        localStorage.setItem('adminLogged', true);
    } else {
        alert('Senha incorreta.');
    }
});

// Função para mostrar a aba admin apenas se a senha for correta
window.onload = function() {
    const adminLink = document.getElementById('admin-link');
    const isAdminLogged = localStorage.getItem('adminLogged');
    
    if (isAdminLogged) {
        adminLink.style.display = 'block';
    } else {
        adminLink.style.display = 'none';
    }
};

// Adicionar Criador de Conteúdo
document.getElementById('creator-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('creator-name').value;
    const twitchLink = document.getElementById('creator-twitch').value;
    const photo = document.getElementById('creator-photo').files[0];

    if (photo && name && twitchLink) {
        const creator = { name, twitchLink, photo };
        
        const creatorCard = document.createElement('div');
        creatorCard.classList.add('creator-card');
        
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = document.createElement('img');
            img.src = event.target.result;
            creatorCard.appendChild(img);
            
            const creatorName = document.createElement('h3');
            creatorName.textContent = name;
            creatorCard.appendChild(creatorName);
            
            const twitchButton = document.createElement('a');
            twitchButton.href = twitchLink;
            twitchButton.textContent = 'Visitar Twitch';
            creatorCard.appendChild(twitchButton);
            
            document.getElementById('creators-grid').appendChild(creatorCard);
        };
        reader.readAsDataURL(photo);

        // Resetar o formulário
        document.getElementById('creator-form').reset();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});
