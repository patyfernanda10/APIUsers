
// Função para visualizar formulário e lista ao clicar no menu 

    document.getElementById('menu-criar-usuario').addEventListener('click', function(event) {
        event.preventDefault(); // Previne o comportamento padrão do link
        document.getElementById('formulario1').style.display = 'block';
        document.getElementById('usuarios-lista').style.display = 'none'; // Esconde a lista de usuários
    });


    document.getElementById('menu-listar-usuarios').addEventListener('click', function(event) {
        event.preventDefault(); // Previne o comportamento padrão do link
        document.getElementById('formulario1').style.display = 'none';
        document.getElementById('usuarios-lista').style.display = 'block'; // Esconde a lista de usuários
    });

    document.addEventListener('DOMContentLoaded', (event) => {
        carregarUsuarios();
    });
    
    document.addEventListener('DOMContentLoaded', (event) => {
        carregarUsuarios();
    });
    

    
    
    
