//home.js
document.addEventListener("DOMContentLoaded", function () {
    // Obtiene el nombre de usuario del Local Storage
    const nombreUsuario = localStorage.getItem('nombreUsuario');

    // Obtiene la cuenta correspondiente al nombre de usuario
    const cuentaSeleccionada = cuentas.find(cuenta => cuenta.nombre === nombreUsuario);

    // Actualiza el contenido del elemento
    document.getElementById("userName").textContent = nombreUsuario;

    // Puedes acceder a las propiedades de la cuenta, por ejemplo, el saldo
    console.log("Saldo de la cuenta:", cuentaSeleccionada.saldo);
});

