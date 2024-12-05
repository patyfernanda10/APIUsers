
// Função para enviar o formulário de criação de usuário

    function submitForm(event) {
        event.preventDefault(); // (Evitar o recarregamento da página)
 
        const usuario = {
            Name: document.getElementById('name').value,
            Age: document.getElementById('age').value    
        };
 
        axios.post('https://localhost:7001/api/Usuarios',usuario)
            .then(response => {
                alert('Usuário cadastrado com sucesso!');
                document.getElementById('formulario1').reset();
            })
            .catch(error => {
                alert('Erro: ' + (error.response ? error.response.data : error.message));
            });
    }


// Função para carregar a lista de usuários

    function carregarUsuarios() {
        axios.get('https://localhost:7001/api/Usuarios')
            .then(response => {
                const usuariosLista = document.getElementById('usuarios-lista');
                usuariosLista.innerHTML = ''; // (Limpar a lista)

                response.data.forEach(usuario => {
                    const usuarioCard = document.createElement('div');
                    usuarioCard.classList.add('usuario-card');

                    usuarioCard.innerHTML = `
                        <div class="usuario-info">
                            <h3>${usuario.name}</h3>
                            <p>Idade: ${usuario.age}</p>
                        </div>
                        <div class="usuario-acoes">
                            <button class="btn-ver">Ver</button>
                           <button class="btn-editar" data-id="${usuario.id}">Editar</button>
                            <button class="btn-excluir" data-id="${usuario.id}">Excluir</button>
                        </div>
                    `;

                  // (Evento de clique para o botão excluir)
                  const btnExcluir = usuarioCard.querySelector('.btn-excluir');
                btnExcluir.addEventListener('click', () => excluirUsuario(usuario.id));

                usuariosLista.appendChild(usuarioCard);
            });
             // (Chamando função para Evento de clique para o botão editar)
            configurarBotoesEdicao();
                
            })
            .catch(error => {
                console.error('Erro ao carregar usuários:', error);
            });
}
    
    window.onload = carregarUsuarios;


// Função para atualizar usuarios

    function configurarBotoesEdicao() {
        const botoesEditar = document.querySelectorAll('.btn-editar');
        botoesEditar.forEach(botao => {
            botao.addEventListener('click', (event) => {
                const usuarioCard = event.target.closest('.usuario-card');
                const usuario = {
                    id: botao.getAttribute('data-id'),
                    name: usuarioCard.querySelector('.usuario-info h3').textContent,
                    age: usuarioCard.querySelector('.usuario-info p').textContent.replace('Idade: ', '')
                };
                abrirFormularioEdicao(usuario);
            });
        });
    }
    
    function abrirFormularioEdicao(usuario) {
        const formularioEdicao = document.getElementById('formulario-edicao');
        formularioEdicao.style.display = 'block';
        document.getElementById('edit-name').value = usuario.name;
        document.getElementById('edit-age').value = usuario.age;
        document.getElementById('edit-id').value = usuario.id;

    }
    
    function atualizarUsuario(event) {
        event.preventDefault();
    
        const usuarioAtualizado = {
            id: document.getElementById('edit-id').value,
            name: document.getElementById('edit-name').value,
            age: document.getElementById('edit-age').value
        };
    
        axios.put(`https://localhost:7001/api/Usuarios/${usuarioAtualizado.id}`, usuarioAtualizado)
            .then(response => {
                alert('Usuário atualizado com sucesso!');
                document.getElementById('formulario-edicao').style.display = 'none';
                carregarUsuarios();
            })
            .catch(error => {
                alert('Erro ao atualizar usuário: ' + (error.response ? error.response.data : error.message));
            });
    }

    
// Função para excluir um usuário

function excluirUsuario(id) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        axios.delete(`https://localhost:7001/api/Usuarios/${id}`)
            .then(response => {
                alert(response.data.message);
                carregarUsuarios(); 
            })
            .catch(error => {
                alert('Erro ao excluir usuário: ' + (error.response ? error.response.data.message : error.message));
            });
    }
}
