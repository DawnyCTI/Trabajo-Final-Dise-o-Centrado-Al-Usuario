document.addEventListener('DOMContentLoaded', function () {
    const registroForm = document.querySelector('#registroForm');
    const consultaForm = document.querySelector('#consultaForm');
    const resultadoSection = document.querySelector('#resultado');
    const usuarioEncontradoDiv = document.querySelector('#usuarioEncontrado');

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    registroForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const nombre = registroForm.querySelector('#nombre').value;
        const correo = registroForm.querySelector('#correo').value;
        const telefono = registroForm.querySelector('#telefono').value;
        const foto = registroForm.querySelector('#foto').files[0];

        const nuevoUsuario = {
            id: usuarios.length + 1,
            nombre,
            correo,
            telefono,
            foto
        };
        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        registroForm.reset();
        alert('Usuario registrado exitosamente.');
    });

    consultaForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const userId = consultaForm.querySelector('#userId').value;
        const usuarioEncontrado = usuarios.find(user => user.id === parseInt(userId));
        if (usuarioEncontrado) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(usuarioEncontrado.foto);
            img.alt = 'Foto de perfil';
            usuarioEncontradoDiv.innerHTML = '';
            usuarioEncontradoDiv.appendChild(img);
            usuarioEncontradoDiv.innerHTML += `
                <p><strong>ID:</strong> ${usuarioEncontrado.id}</p>
                <p><strong>Nombre:</strong> ${usuarioEncontrado.nombre}</p>
                <p><strong>Correo:</strong> ${usuarioEncontrado.correo}</p>
                <p><strong>Teléfono:</strong> ${usuarioEncontrado.telefono}</p>
            `;
            resultadoSection.style.display = 'block';
        } else {
            usuarioEncontradoDiv.innerHTML = '<p>Usuario no encontrado.</p>';
            resultadoSection.style.display = 'block';
        }
    });
});
