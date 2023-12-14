// main.js
let cuentas = [
    { nombre: 'Juan', saldo: 580, nip:1922 },
    { nombre: 'Jesus', saldo: 800, nip:9753 },
    { nombre: 'Miguel', saldo: 670, nip:3822 },
];

// Generar opciones en el select desde el arreglo cuentas
let select = document.getElementById("cuentaSelector");
let nipSection = document.getElementById("nipSection");

cuentas.forEach((cuenta, i) => {
    let option = document.createElement("option");
    option.value = i;
    option.text = cuenta.nombre;
    select.add(option);
});

document.getElementById("cuentaSelector").addEventListener("change", obtenerValorSeleccionado);

// Función para obtener el valor seleccionado y guardarlo en una variable
function obtenerValorSeleccionado() {

    let selector = document.getElementById("cuentaSelector");
    let indiceSeleccionado = selector.value;

    // Verifica si se seleccionó una opción válida
    if (indiceSeleccionado !== "") {
        let cuentaSeleccionada = cuentas[indiceSeleccionado].nombre;

        
        console.log("Cuenta seleccionada:", cuentaSeleccionada);
        // Mostrar el input y el botón cuando se selecciona una cuenta
        nipSection.style.display = "block";
    } else {
        // Ocultar el input y el botón si no se selecciona ninguna cuenta
        nipSection.style.display = "none";
    }
    
}
document.querySelector("button").addEventListener("click", ingresar);

function ingresar() {

    // Obtener el valor del NIP ingresado
    let nipInput = document.getElementById("nipInput").value;

    // Obtener la cuenta seleccionada
    let selector = document.getElementById("cuentaSelector");
    let indiceSeleccionado = selector.value;
    let cuentaSeleccionada = cuentas[indiceSeleccionado];

    // Ocultar ambos mensajes al inicio
    document.getElementById("mensajeIncorrecto").style.display = "none";
    document.getElementById("nipRequired").style.display = "none";

    // Verificar si el campo del NIP está vacío
    if (nipInput.trim() === "") {
        console.log("El NIP es requerido");
        document.getElementById("nipRequired").style.display = "block";
    } else {
        // Comparar el NIP ingresado con el NIP de la cuenta seleccionada
        if (nipInput === cuentaSeleccionada.nip.toString()) {
            console.log("NIP correcto");
            
            let nombreUsuario = cuentaSeleccionada.nombre;
            
            window.location.href = "home.html";
            // Almacena el nombre de usuario en el Local Storage
            localStorage.setItem('nombreUsuario', nombreUsuario);

            console.log("Bienvenido ",nombreUsuario);
             document.getElementById("userName").textContent = nombreUsuario;
        } else {
            console.log("NIP incorrecto");
            document.getElementById("mensajeIncorrecto").style.display = "block";
        }
    }
}



function consultarSaldo() {
    // Obtener el nombre de usuario del Local Storage
    const nombreUsuario = localStorage.getItem('nombreUsuario');

    // Obtener la cuenta correspondiente al nombre de usuario
    const cuentaSeleccionada = cuentas.find(cuenta => cuenta.nombre === nombreUsuario);

    // Almacenar el saldo en el Local Storage
    localStorage.setItem('saldo', cuentaSeleccionada.saldo);

    // Redirigir a la página balance.html
    window.location.href = "balance.html";
}

function mostrarDepositar() {
    // Redirigir a la página de depósito
    window.location.href = "deposit.html";
}


function realizarDeposito() {
    // Obtener el nombre de usuario del Local Storage
    const nombreUsuario = localStorage.getItem('nombreUsuario');

    // Obtener la cuenta correspondiente al nombre de usuario
    const cuentaSeleccionada = cuentas.find(cuenta => cuenta.nombre === nombreUsuario);

    // Obtener el monto ingresado
    const monto = parseInt(document.getElementById("montoInput").value);

    // validaciones

    if (!isNaN(monto) && monto > 0) {
        if (monto >=10 && monto <=990){
            cuentaSeleccionada.saldo += monto;
    
            // Actualizar el saldo en el Local Storage
            localStorage.setItem('saldo', cuentaSeleccionada.saldo);
    
            // Redirigir a la página de saldo
            window.location.href = "balance.html";
        }else {
            alert("El monto minimo  de deposito es de  $10 pesos con un maximo de $990");
        }
    }else{
        alert("Ingrese un monto válido.");
    }
    

    
}

// Retirar
function mostrarRetirar() {
    // Redirigir a la página de retiro
    window.location.href = "withdraw.html";
}


function realizarRetiro() {
    // Obtener el nombre de usuario del Local Storage
    const nombreUsuario = localStorage.getItem('nombreUsuario');

    // Obtener la cuenta correspondiente al nombre de usuario
    const cuentaSeleccionada = cuentas.find(cuenta => cuenta.nombre === nombreUsuario);

    // Obtener el monto ingresado
    const monto = parseInt(document.getElementById("montoInput").value);

    // validaciones
    if (!isNaN(monto) && monto > 0) {
            if (monto <= cuentaSeleccionada.saldo-10){
                // Realizar el retiro
            cuentaSeleccionada.saldo -= monto;

            // Actualizar el saldo en el Local Storage
            localStorage.setItem('saldo', cuentaSeleccionada.saldo);

            // Redirigir a la página de saldo
            window.location.href = "balance.html";
            }else {
                alert(`Saldo insuficiente, tu saldo es de: ${cuentaSeleccionada.saldo} pesos puede retirar como maximo ${cuentaSeleccionada.saldo-10} pesos`);

        }
    }else{
        alert("Ingrese un monto válido.");
    }
    
}

// salirr
function salir() {
    window.location.href = "index.html";
}

// menu
function home() {
    window.location.href = "home.html";
}