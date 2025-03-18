# Prueba de Concepto - Botón de Pago

## Descripción
Este proyecto es una prueba de concepto que implementa un botón de pago en JavaScript puro. Al hacer clic en el botón de pago, se abre un modal donde el usuario puede ingresar los datos de su tarjeta y completar la transacción.

## Características
- Creación dinámica de un botón de pago.
- Modal interactivo para ingresar los datos de pago.
- Validación de datos de tarjeta (número, fecha de vencimiento, CVV).
- Selección de banco.
- Mensajes de estado de la transacción.
- Simulación de procesamiento de pago con respuesta exitosa o fallida.

## Tecnologías Utilizadas
- HTML
- CSS (estilos incrustados en JavaScript)
- JavaScript puro (DOM, event listeners)

## Instalación y Uso
1. Clona este repositorio:
   ```bash
   git clone https://github.com/AngelJaimesdev/Prueba_concepto_pago.git
   ```
2. Abre el archivo `index.html` en un navegador web.
3. Haz clic en el botón "Pagar" para abrir el modal e ingresar los datos de la tarjeta.
4. Si los datos son correctos, se mostrará un mensaje de "Pago exitoso".
5. Si los datos son incorrectos, se mostrará un mensaje de "Pago fallido" y se podrá intentar nuevamente.

## Estructura del Proyecto
```
Prueba_concepto_pago/
│── index.html   # Archivo principal
│── index.js     # Lógica del botón de pago y modal
```

## Funcionamiento
- Al cargar la página, se inyectan estilos y se genera dinámicamente un botón de pago.
- Al hacer clic en el botón, se abre un modal con campos de entrada para datos de pago.
- Se valida la información antes de confirmar el pago.
- Si la validación es exitosa, se muestra un mensaje de confirmación y el formulario se limpia.
- Si la validación falla, se muestra un mensaje de error y el usuario puede corregir los datos.

## Mejoras Futuras
- Integración con una pasarela de pago real.
- Encriptación de datos sensibles.
- Mejoras en la interfaz de usuario.
- Implementación de validaciones avanzadas para mejorar la seguridad.

