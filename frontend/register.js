document.getElementById('register').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const result = await response.json();

        if (response.ok) {
            // Manejar respuesta exitosa
            alert('Registro exitoso');
        } else {
            // Manejar errores de la respuesta
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});