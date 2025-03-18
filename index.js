document.addEventListener("DOMContentLoaded", function () {
    // Crear y aplicar estilos globales
    agregarEstilosGlobales();

    // Crear botón de pago y modal
    const payButton = crearBoton("Pagar Ahora", "pay-button", abrirModal);
    const modal = crearModal();

    // Agregar elementos al DOM
    document.body.appendChild(payButton);
    document.body.appendChild(modal);
});

// Función para agregar estilos globales
function agregarEstilosGlobales() {
    const estilos = document.createElement("style");
    estilos.innerHTML = `
        .modal {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: none;
            justify-content: center;
            align-items: center;
        }
        .modal-content {
            background: white;
            padding: 20px;
            border-radius: 5px;
            text-align: center;
            width: 300px;
            position: relative;
        }
        .close-button {
            cursor: pointer;
            color: black;
            position: absolute;
            top: 10px;
            right: 10px;
        }
        .pay-button {
            background-color: #28a745;
            color: white;
            border: none;
            padding: 10px;
            cursor: pointer;
            border-radius: 5px;
            width: 10%;
            font-size: 16px;
            display: block;
            margin: 20px auto;
        }
        .confirm-button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px;
            cursor: pointer;
            border-radius: 5px;
            width: 100%;
            font-size: 16px;
        }
        .input-field, .select-field {
            width: 100%;
            margin: 10px 0;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
        }
        .status-message {
            margin-top: 10px;
            font-weight: bold;
        }
    `;
    document.head.appendChild(estilos);
}

// Función para crear un botón con evento
function crearBoton(texto, clase, eventoClick) {
    const boton = document.createElement("button");
    boton.innerText = texto;
    boton.className = clase;
    boton.addEventListener("click", eventoClick);
    return boton;
}

// Función para crear el modal
function crearModal() {
    const modal = document.createElement("div");
    modal.className = "modal";

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    const closeButton = document.createElement("span");
    closeButton.innerText = "✖";
    closeButton.className = "close-button";
    closeButton.addEventListener("click", cerrarModal);

    const labelName = document.createElement("label");
    labelName.innerText = obtenerNombreUsuario();
    labelName.style.display = "block";
    labelName.style.textAlign = "left";
    labelName.style.fontWeight = "bold";
    labelName.style.marginBottom = "10px";

    // Selección de banco
    const labelBanco = document.createElement("label");
    labelBanco.innerText = "Selecciona tu banco:";
    labelBanco.placeholder = "Seleccione un banco";
    const selectBanco = document.createElement("select");
    selectBanco.className = "select-field";

    // Opción por defecto
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.innerText = "Seleccione un banco";
    defaultOption.disabled = true;
    defaultOption.selected = true;

    selectBanco.appendChild(defaultOption);

    const bancos = ["Banco A", "Banco B", "Banco C", "Banco D"];
    bancos.forEach(banco => {
        const option = document.createElement("option");
        option.value = banco;
        option.innerText = banco;
        selectBanco.appendChild(option);
    });


    // Input número de tarjeta
    const labelCard = document.createElement("label");
    labelCard.innerText = "Número de tarjeta";
    const cardInput = document.createElement("input");
    cardInput.type = "text";
    cardInput.placeholder = "Debe contener 16 números";
    cardInput.className = "input-field";

    // Input fecha de vencimiento
    const labelExp = document.createElement("label");
    labelExp.innerText = "Fecha de vencimiento (MM/AA)";
    const expInput = document.createElement("input");
    expInput.type = "text";
    expInput.placeholder = "MM/AA";
    expInput.className = "input-field";

    // Input CVV
    const labelCVV = document.createElement("label");
    labelCVV.innerText = "Código de seguridad (CVV)";
    const cvvInput = document.createElement("input");
    cvvInput.type = "text";
    cvvInput.placeholder = "3 dígitos";
    cvvInput.className = "input-field";

    const confirmButton = crearBoton("Confirmar Pago", "confirm-button", function () {
        validarPago(cardInput, expInput, cvvInput, selectBanco);
    });

    const statusMessage = document.createElement("p");
    statusMessage.className = "status-message";

    //Factura
    const paymentButton = document.querySelector("payment-button");
    const amountToPay = paymentButton ? paymentButton.getAttribute("amountToPay") : "0";
    const availableBalance = paymentButton ? paymentButton.getAttribute("availableBalance") : "0";

    const labelAmountToPay = document.createElement("p");
    labelAmountToPay.innerText = `Monto a pagar: $${amountToPay}`;
    labelAmountToPay.style.fontWeight = "bold";

    const labelAvailableBalance = document.createElement("p");
    labelAvailableBalance.innerText = `Saldo disponible: $${availableBalance}`;
    labelAvailableBalance.style.fontWeight = "bold";
    labelAvailableBalance.style.color = parseFloat(availableBalance) >= parseFloat(amountToPay) ? "green" : "red";

    modalContent.appendChild(closeButton);
    modalContent.appendChild(labelName);
    modalContent.appendChild(labelAmountToPay);
    modalContent.appendChild(labelAvailableBalance);
    modalContent.appendChild(labelBanco);
    modalContent.appendChild(selectBanco);
    modalContent.appendChild(labelCard);
    modalContent.appendChild(cardInput);
    modalContent.appendChild(labelExp);
    modalContent.appendChild(expInput);
    modalContent.appendChild(labelCVV);
    modalContent.appendChild(cvvInput);
    modalContent.appendChild(confirmButton);
    modalContent.appendChild(statusMessage);
    modal.appendChild(modalContent);

    return modal;
}

// Función para obtener el nombre del usuario
function obtenerNombreUsuario() {
    const paymentButton = document.querySelector("payment-button");
    return paymentButton 
        ? `Hola, ${paymentButton.getAttribute("nameUser")}` 
        : "Hola, Usuario";
}

// Funcion limpiar formulario
function cleanData(cardInput, expInput, cvvInput, selectBanco, statusMessage) {
    statusMessage.innerText = "";
    cardInput.value = '';
    expInput.value = '';
    cvvInput.value = '';
    selectBanco.value = '';
}

// Función para abrir el modal
function abrirModal() {
    document.querySelector(".modal").style.display = "flex";
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = document.querySelector(".modal");
    modal.style.display = "none";

    const cardInput = document.querySelector(".input-field[type='text']");
    const expInput = document.querySelector(".input-field[placeholder='MM/AA']");
    const cvvInput = document.querySelector(".input-field[placeholder='3 dígitos']");
    const selectBanco = document.querySelector(".select-field");
    const statusMessage = document.querySelector(".status-message");

    cleanData(cardInput, expInput, cvvInput, selectBanco, statusMessage);
}


// Función para validar el pago
function validarPago(cardInput, expInput, cvvInput, selectBanco) {
    const statusMessage = document.querySelector(".status-message");
    const cardNumber = cardInput.value.replace(/\s+/g, '');
    const expDate = expInput.value;
    const cvv = cvvInput.value;
    const bancoSeleccionado = selectBanco.value;

    if (!/^\d{16}$/.test(cardNumber)) {
        statusMessage.innerText = "Número de tarjeta inválido";
        statusMessage.style.color = "red";
        return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expDate)) {
        statusMessage.innerText = "Fecha de vencimiento inválida";
        statusMessage.style.color = "red";
        return;
    }

    if (!/^\d{3}$/.test(cvv)) {
        statusMessage.innerText = "CVV inválido";
        statusMessage.style.color = "red";
        return;
    }

    statusMessage.innerText = `Pago exitoso con ${bancoSeleccionado}`;
    statusMessage.style.color = "green";

    setTimeout(() => {
        cleanData(cardInput, expInput, cvvInput, selectBanco, statusMessage);
    }, 3000);
}
