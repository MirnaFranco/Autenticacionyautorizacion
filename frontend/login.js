import './index.css';

document.getElementById('app').innerHTML = 
<div class="container">
<div class="row justify-content-center mt-5">
    <div class="col-xs-10 col-md-6 col-sm-9 col-lg-5">
        <div class="card shadow-sm">
            <div class="card-body">
                <h3 class="text-center mb-4">Registro</h3>
                <form id="login-form">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="username" placeholder="Username" required/>
                        <label for="username">Usuario</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="password" placeholder="Password"
                            required/>
                        <label for="password">Contraseña</label>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Registrar</button>
                </form>
                <p id="message" class="text-danger mt-3"></p>
            </div>
        </div>
    </div>
</div>
</div>
;
document.getElementById('registroForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita el envío del formulario

  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  let mensaje = '';

  if (username.length < 3) {
    mensaje += 'El nombre debe tener al menos 3 caracteres.<br>';
  }


  if (password.length < 6) {
    mensaje += 'La contraseña debe tener al menos 6 caracteres.<br>';
  }
try{
    async() => {
    const response = await fetch('http://localhost:4000/logout', {
        method: 'POST',
        credentials: 'include'
    })
    
    if (!response.ok) {
        throw new Error('Error al registrar usuario');
    } else {
        window.location.href = 'index.html';
    }
    }
}catch{}
  if (mensaje) {
    document.getElementById('mensaje').innerHTML = mensaje;
  } else {
    document.getElementById('mensaje').innerHTML = 'Formulario enviado correctamente.';
    // Aquí puedes agregar el código para enviar el formulario al servidor
  }
});