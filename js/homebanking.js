//Declaración de variables
var nombreUsuario = "Ana Perez";
var claveUsuario = 1234;
var saldoCuenta = 5000;
var limiteExtraccion = 1000;
var cuentaAmiga1 = "BBVA Francés";
var cuentaAmiga2 = "HSBC";
var precioServicio = [350, 425, 210, 570];
var nombreServicio = ["Agua", "Teléfono", "Luz", "Internet"];
var saldoDolares = 1000;
var cotizacionDolares = 10;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
  iniciarSesion();
  cargarNombreEnPantalla();
  actualizarSaldoEnPantalla();
  actualizarLimiteEnPantalla();
  actualizarSaldoDolaresEnPantalla();
  actualizarCotizacionDolar();
}

//Funciones que tenes que completar
function sumarDinero(monto) {
  return saldoCuenta += monto;
}

function sumarDolares(monto) {
  return saldoDolares += monto;
}

function restarDinero(monto) {
  if (saldoCuenta > monto) {
    return saldoCuenta -= monto;
  }
}

function restarDolares(monto) {
  return saldoDolares -= monto;
}

function validarPrompt(monto, inputUsuario) {
  if (isNaN(monto)) {
    alert("Algo anda mal! No ingresaste un número");
    return false;
  } else if (!/^\d+$/.test(inputUsuario)) {
    alert("Ingresa solo números por favor!");
    return false;
  }
}

function verificarSaldoServicio(x) { //solo se aplica a pagarServicio();
  var saldoActual = saldoCuenta;
  if (saldoActual < precioServicio[x]) {
    alert("Saldo insuficiente para pagar " + nombreServicio[x] + ".\nTu saldo Actual es de $ " + saldoActual + " y tenés que pagar $ " + precioServicio[x]);
  } else {
    var saldoPosterior = restarDinero(precioServicio[x]);
    actualizarSaldoEnPantalla();
    alert("Vas a pagar $" + precioServicio[x] + " de " + nombreServicio[x]);
    alert("Pagaste $ " + precioServicio[x] + " de " + nombreServicio[x] + "\nSaldo Anterior: $ " + saldoActual + "\nSaldo Actual: $ " + saldoPosterior);
  }
}

function cambiarLimiteDeExtraccion() {
  var inputLimiteExtraccion = prompt("Ingrese nuevo límite de extracción:");
  var nuevoMontoExtraccion = parseInt(inputLimiteExtraccion);
  if (validarPrompt(nuevoMontoExtraccion, inputLimiteExtraccion) !== false) {
    limiteExtraccion = nuevoMontoExtraccion;
    actualizarLimiteEnPantalla();
    alert("El nuevo límite de extracción es $ " + nuevoMontoExtraccion);
  }
}

function extraerDinero() {
  var inputExtraccion = prompt("Cuánto dinero quiere extraer?");
  var montoDeExtraccion = parseInt(inputExtraccion);
  if (validarPrompt(montoDeExtraccion, inputExtraccion) !== false) {
    var saldoActual = saldoCuenta;
    if (montoDeExtraccion > saldoActual) {
      alert("Fondos insuficientes. El saldo actual es de $ " + saldoActual);
    } else if (montoDeExtraccion > limiteExtraccion) {
      alert("El monto supera el límite de extracción. Ingrese otro monto.");
    } else if ((montoDeExtraccion % 100) !== 0) { //multiplo de 100
      alert("Este cajero solo entrega billetes de $100. Ingrese otro monto.");
    } else {
      var saldoPosterior = restarDinero(montoDeExtraccion);
      actualizarSaldoEnPantalla();
      alert("Retiraste: $ " + montoDeExtraccion + "\nSaldo Anterior: $ " + saldoActual + "\nSaldo Actual: $ " + saldoPosterior);

    }
  }
}

function depositarDinero() {
  var inputDeposito = prompt("Cuánto dinero quiere depositar?");
  var montoADepositar = parseInt(inputDeposito);
  if (validarPrompt(montoADepositar, inputDeposito) !== false) {
    var saldoActual = saldoCuenta;
    var saldoPosterior = sumarDinero(montoADepositar);
    actualizarSaldoEnPantalla();
    alert("Depositaste: $ " + montoADepositar + "\nSaldo Anterior: $ " + saldoActual + "\nSaldo Actual: $ " + saldoPosterior);
  }
}

function pagarServicio() {
  var inputServicio = prompt("Ingresá el número que corresponde al servicio que querés pagar\n1 - Agua\n2 - Teléfono \n3 - Luz\n4 - Internet");
  var servicioAPagar = parseInt(inputServicio);
  if (validarPrompt(servicioAPagar, inputServicio) !== false) {
    switch (servicioAPagar) {
      case 1:
        verificarSaldoServicio(0);
        break;
      case 2:
        verificarSaldoServicio(1);
        break;
      case 3:
        verificarSaldoServicio(2);
        break;
      case 4:
        verificarSaldoServicio(3);
        break;
      default:
        alert("El servicio seleccionado es inexistente");
    }
  }
}

function transferirDinero() {
  var inputTransferencia = prompt("Cuánto dinero quiere transferir?");
  var montoATransferir = parseInt(inputTransferencia);
  if (validarPrompt(montoATransferir, inputTransferencia) !== false) {
    var saldoActual = saldoCuenta;
    if (montoATransferir > saldoActual) {
      alert("Fondos insuficientes, imposible transferir. El saldo actual es de $ " + saldoActual);
    } else {
      var inputDestinatario = prompt("Seleccione cuenta destinataria: \n1 - BBVA Francés \n2 - HSBC");
      var destinatarioDeTransferencia = parseInt(inputDestinatario);
      if (validarPrompt(destinatarioDeTransferencia, inputDestinatario) !== false) {
        switch (destinatarioDeTransferencia) {
          case 1:
            var saldoPosterior = restarDinero(montoATransferir);
            actualizarSaldoEnPantalla();
            alert("Transferiste a cuenta " + cuentaAmiga1 + ": $ " + montoATransferir + "\nSaldo Anterior: $ " + saldoActual + "\nSaldo Actual: $ " + saldoPosterior);
            break;
          case 2:
            saldoPosterior = restarDinero(montoATransferir);
            actualizarSaldoEnPantalla();
            alert("Transferiste a cuenta " + cuentaAmiga2 + ": $ " + montoATransferir + "\nSaldo Anterior: $ " + saldoActual + "\nSaldo Actual: $ " + saldoPosterior);
            break;
          default:
            alert("La cuenta seleccionada no es una cuenta amiga :(");
        }
      }
    }
  }
}

function iniciarSesion() {
  var inputClave = prompt("Ingrese su clave: (1234)");
  var ingresoClave = parseInt(inputClave);
  if (validarPrompt(ingresoClave, inputClave) === false) {
    return iniciarSesion();
  } else if (inputClave.length != 4) {
    alert("Debes ingresar 4 números");
    return iniciarSesion();
  } else if (ingresoClave === claveUsuario) {
    alert("Hola " + nombreUsuario + "! Comenzá a operar...");
  } else {
    alert("Clave incorrecta! Retuvimos tu saldo por seguridad.");
    saldoCuenta = 0;
    saldoDolares = 0;

  }
}

function compraVentaDolares() {
  var saldoActual = saldoCuenta;
  var saldoActualDolares = saldoDolares;
  var inputOperacionDolares = prompt("Ingresá el número que corresponde a la operación a realizar\n1 - Compra de dólares\n2 - Venta de dólares");
  var operacionDolares = parseInt(inputOperacionDolares);
  if (validarPrompt(operacionDolares, inputOperacionDolares) !== false) {
    switch (operacionDolares) {
      case 1: //compra de dolares*/
        var inputMontoDolares = prompt("Ingrese el monto de dólares a comprar");
        var montoDolares = parseInt(inputMontoDolares);
        if (validarPrompt(montoDolares, inputMontoDolares) !== false) {
          var cambio = (montoDolares * cotizacionDolares);
          if (saldoCuenta < cambio) {
            alert("Saldo insuficiente para realizar la operación seleccionada.\nTu saldo Actual es de $ " + saldoActual);
          } else {
            var saldoPosterior = restarDinero(cambio);
            var saldoPosteriorDolares = sumarDolares(montoDolares);
            actualizarSaldoEnPantalla();
            actualizarSaldoDolaresEnPantalla();
            alert("Compraste u$S " + montoDolares + "\nSaldo Actual de dólares: u$S " + saldoPosteriorDolares + "\nPagaste $ " + cambio + "\nSaldo Anterior: $ " + saldoActual + "\nSaldo Actual: $ " + saldoPosterior);
          }
        }
        break;
      case 2: //venta de dolares
        var inputMontoDolares = prompt("Ingrese el monto de dólares a vender");
        var montoDolares = parseInt(inputMontoDolares);
        if (validarPrompt(montoDolares, inputMontoDolares) !== false) {
          if (saldoActualDolares < montoDolares) {
            alert("Saldo insuficiente para realizar la operación seleccionada.\nTu saldo Actual es de u$s " + saldoActualDolares);
          } else {
            var cambio = (montoDolares * cotizacionDolares);
            var saldoPosterior = sumarDinero(cambio);
            var saldoPosteriorDolares = restarDolares(montoDolares);
            actualizarSaldoEnPantalla();
            actualizarSaldoDolaresEnPantalla();
            alert("Vendiste u$S " + montoDolares + "\nSaldo Actual de dólares: u$S " + saldoPosteriorDolares + "\nDepositamos en tu cuenta en pesos $ " + cambio + "\nSaldo Anterior: $ " + saldoActual + "\nSaldo Actual: $ " + saldoPosterior);
          }
        }
        break;
      default:
        alert("La opción seleccionada no existe");
    }
  }
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
  document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
  document.getElementById("saldo-cuenta").innerHTML = "$ " + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
  document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $ " + limiteExtraccion;
}

function actualizarSaldoDolaresEnPantalla() {
  document.getElementById("saldo-dolares").innerHTML = "u$S " + saldoDolares;
}

function actualizarCotizacionDolar() {
  document.getElementById("cotizacion-dolares").innerHTML = "Cotización del dólar: u$S " + cotizacionDolares;
}
