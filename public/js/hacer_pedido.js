/* ======================================
USUARIO LOGUEADO
====================================== */

/*
    Obtiene usuario almacenado
    en localStorage
*/

const usuario =

    JSON.parse(
        localStorage.getItem('usuario')
    );





/* ======================================
VALIDAR LOGIN
====================================== */

/*
    Si no existe sesión:
    regresar al login
*/

if(!usuario){

    window.location.href =
        '/login.html';

}





/* ======================================
PRODUCTO SELECCIONADO
====================================== */

/*
    Obtiene perfume elegido
    desde localStorage
*/

const producto =

    JSON.parse(

        localStorage.getItem(
            'productoSeleccionado'
        )

    );





/* ======================================
VALIDAR PRODUCTO
====================================== */

/*
    Si no existe producto:
    regresar catálogo
*/

if(!producto){

    window.location.href =
        '/catalogo.html';

}





/* ======================================
EVITAR DOBLE PEDIDO
====================================== */

/*
    Esta variable evita
    múltiples clicks rápidos
*/

let procesandoPedido = false;





/* ======================================
MOSTRAR PERFUME
====================================== */

/*
    Genera información visual
    del perfume seleccionado
*/

document.getElementById(
    'perfume-box'
).innerHTML = `

    <!-- IMAGEN -->
    <img src="${producto.imagen_url}">





    <!-- MARCA -->
    <div class="marca">

        ${producto.marca}

    </div>





    <!-- NOMBRE -->
    <h2>

        ${producto.nombre}

    </h2>





    <!-- PRECIO -->
    <div class="precio">

        $${producto.precio}

    </div>





    <!-- DESCRIPCIÓN -->
    <p>

        ${producto.descripcion || ''}

    </p>

`;





/* ======================================
TIPOS DISPONIBLES
====================================== */

/*
    Aquí se configuran:

    - perfume completo
    - decant 5ml
    - decant 10ml
*/

const tipoSelect =

    document.getElementById(
        'tipo_producto'
    );





// ======================================
// STOCK PERFUME
// ======================================

const stockPerfume =

    Number(producto.stock || 0);





// ======================================
// STOCK 5ML
// ======================================

const stock5ml =

    Number(producto.stock_decant_5ml || 0);





// ======================================
// STOCK 10ML
// ======================================

const stock10ml =

    Number(producto.stock_decant_10ml || 0);





/* ======================================
LIMPIAR SELECT
====================================== */

tipoSelect.innerHTML = `

    <option value="">

        -- Seleccione Tipo --

    </option>

`;





/* ======================================
PERFUME COMPLETO
====================================== */

tipoSelect.innerHTML += `

    <option

        value="Perfume Completo"

        ${stockPerfume <= 0 ? 'disabled' : ''}>

        ${

            stockPerfume <= 0

            ?

            'Perfume Completo • AGOTADO'

            :

            'Perfume Completo'

        }

    </option>

`;





/* ======================================
DECANT 5ML
====================================== */

tipoSelect.innerHTML += `

    <option

        value="Decant 5ML"

        ${stock5ml <= 0 ? 'disabled' : ''}>

        ${

            stock5ml <= 0

            ?

            'Decant 5ML • AGOTADO'

            :

            'Decant 5ML'

        }

    </option>

`;





/* ======================================
DECANT 10ML
====================================== */

tipoSelect.innerHTML += `

    <option

        value="Decant 10ML"

        ${stock10ml <= 0 ? 'disabled' : ''}>

        ${

            stock10ml <= 0

            ?

            'Decant 10ML • AGOTADO'

            :

            'Decant 10ML'

        }

    </option>

`;





/* ======================================
PRODUCTO TOTALMENTE AGOTADO
====================================== */

/*
    Si TODO está agotado:
    bloquear completamente
*/

const agotadoTotal =

    stockPerfume <= 0

    &&

    stock5ml <= 0

    &&

    stock10ml <= 0;





if(agotadoTotal){

    tipoSelect.innerHTML = `

        <option>

            -- AGOTADO --

        </option>

    `;

}





/* ======================================
INPUT CANTIDAD
====================================== */

const cantidadInput =

    document.getElementById(
        'cantidad'
    );





/* ======================================
ACTUALIZAR STOCK MÁXIMO
====================================== */

/*
    Ajusta el máximo permitido
    dependiendo del tipo elegido
*/

function actualizarMaximo(){

    // ======================================
    // TIPO ACTUAL
    // ======================================

    const tipo =
        tipoSelect.value;





    let maximo = 1;





    /* ======================================
    PERFUME COMPLETO
    ====================================== */

    if(tipo === 'Perfume Completo'){

        maximo =
            Number(producto.stock || 1);

    }





    /* ======================================
    DECANT 5ML
    ====================================== */

    if(tipo === 'Decant 5ML'){

        maximo =

            Number(
                producto.stock_decant_5ml || 1
            );

    }





    /* ======================================
    DECANT 10ML
    ====================================== */

    if(tipo === 'Decant 10ML'){

        maximo =

            Number(
                producto.stock_decant_10ml || 1
            );

    }





    // ======================================
    // ASIGNAR MAX
    // ======================================

    cantidadInput.max =
        maximo;





    /* ======================================
    SI SOBREPASA STOCK
    ====================================== */

    if(

        Number(cantidadInput.value)
        >
        maximo

    ){

        cantidadInput.value =
            maximo;

    }

}





/* ======================================
ACTUALIZAR TOTAL
====================================== */

/*
    Calcula total dinámicamente
*/

function actualizarTotal(){

    // ======================================
    // TIPO
    // ======================================

    const tipo =
        tipoSelect.value;





    // ======================================
    // CANTIDAD
    // ======================================

    const cantidad =

        parseInt(
            cantidadInput.value
        ) || 1;





    let precio = 0;





    // ======================================
    // SIN TIPO
    // ======================================

    if(!tipo){

        document.getElementById(
            'total-pagar'
        ).innerText = '$0';

        return;

    }





    // ======================================
    // PERFUME
    // ======================================

    if(tipo === 'Perfume Completo'){

        precio =
            Number(producto.precio);

    }





    // ======================================
    // DECANT 5ML
    // ======================================

    if(tipo === 'Decant 5ML'){

        precio =

            Number(
                producto.precio_decant_5ml || 0
            );

    }





    // ======================================
    // DECANT 10ML
    // ======================================

    if(tipo === 'Decant 10ML'){

        precio =

            Number(
                producto.precio_decant_10ml || 0
            );

    }





    // ======================================
    // TOTAL
    // ======================================

    const total =
        precio * cantidad;





    // ======================================
    // ACTUALIZAR RESUMEN
    // ======================================

    document.getElementById(
        'resumen-tipo'
    ).innerText = tipo;





    document.getElementById(
        'resumen-cantidad'
    ).innerText = cantidad;





    document.getElementById(
        'total-pagar'
    ).innerText = `$${total}`;

}





/* ======================================
EVENTOS
====================================== */

/*
    Eventos automáticos
    para actualizar total
*/

tipoSelect.addEventListener(
    'change',
    () => {

        actualizarMaximo();

        actualizarTotal();

    }
);





cantidadInput.addEventListener(
    'input',
    () => {

        const maximo =
            Number(cantidadInput.max);





        // ======================================
        // NO SUPERAR STOCK
        // ======================================

        if(

            Number(cantidadInput.value)
            >
            maximo

        ){

            cantidadInput.value =
                maximo;

        }





        // ======================================
        // MÍNIMO 1
        // ======================================

        if(

            Number(cantidadInput.value)
            < 1

        ){

            cantidadInput.value = 1;

        }





        actualizarTotal();

    }
);





/* ======================================
INICIALIZAR
====================================== */

actualizarMaximo();

actualizarTotal();





/* ======================================
ENVIAR PEDIDO
====================================== */

/*
    Esta función:

    - valida datos
    - evita duplicados
    - calcula total
    - crea pedido
    - envía WhatsApp
*/

document
.getElementById('formPedido')
.addEventListener('submit', async (e) => {

    // ======================================
    // EVITAR RECARGA
    // ======================================

    e.preventDefault();





    /* ======================================
    VALIDACIONES
    ====================================== */

    const telefono =

        document.getElementById(
            'telefono'
        ).value.trim();





    const direccion =

        document.getElementById(
            'direccion'
        ).value.trim();





    const referencias =

        document.getElementById(
            'referencias'
        ).value.trim();





    // ======================================
    // VALIDAR TIPO
    // ======================================

    if(!tipoSelect.value){

        alert(
`⚠️ Seleccione un tipo de producto`
        );

        return;

    }





    // ======================================
    // VALIDAR TELÉFONO
    // ======================================

    if(!telefono){

        alert(
`⚠️ Ingrese un número telefónico`
        );

        return;

    }





    // ======================================
    // VALIDAR DIRECCIÓN
    // ======================================

    if(!direccion){

        alert(
`⚠️ Ingrese una dirección`
        );

        return;

    }





    // ======================================
    // VALIDAR REFERENCIAS
    // ======================================

    if(!referencias){

        alert(
`⚠️ Ingrese referencias del domicilio`
        );

        return;

    }





    // ======================================
    // VALIDAR CANTIDAD
    // ======================================

    if(

        !cantidadInput.value

        ||

        Number(cantidadInput.value) < 1

    ){

        alert(
`⚠️ Cantidad inválida`
        );

        return;

    }





    // ======================================
    // PRODUCTO AGOTADO
    // ======================================

    if(agotadoTotal){

        alert(
`⚠️ PERFUME AGOTADO

Intente nuevamente después.`
        );

        return;

    }





    // ======================================
    // EVITAR DOBLE CLICK
    // ======================================

    if(procesandoPedido) return;





    procesandoPedido = true;





    const boton =

        document.getElementById(
            'btn-confirmar'
        );





    boton.disabled = true;

    boton.innerText =
        'PROCESANDO PEDIDO...';





    // ======================================
    // TIPO Y CANTIDAD
    // ======================================

    const tipo =
        tipoSelect.value;





    const cantidad =

        parseInt(
            cantidadInput.value
        ) || 1;





    let precioFinal = 0;





    // ======================================
    // PRECIO PERFUME
    // ======================================

    if(tipo === 'Perfume Completo'){

        precioFinal =
            Number(producto.precio);

    }





    // ======================================
    // PRECIO DECANT 5ML
    // ======================================

    if(tipo === 'Decant 5ML'){

        precioFinal =

            Number(
                producto.precio_decant_5ml || 0
            );

    }





    // ======================================
    // PRECIO DECANT 10ML
    // ======================================

    if(tipo === 'Decant 10ML'){

        precioFinal =

            Number(
                producto.precio_decant_10ml || 0
            );

    }





    // ======================================
    // MULTIPLICAR TOTAL
    // ======================================

    precioFinal =
        precioFinal * cantidad;





    /* ======================================
    DATA PEDIDO
    ====================================== */

    const data = {

        id_usuarios:
            usuario.id,

        id_productos:
            producto.id_productos,

        tipo_producto:
            tipo,

        mililitros_decan:

            tipo.includes('Decant')
            ? tipo
            : '',

        telefono:

            document.getElementById(
                'telefono'
            ).value,

        direccion:

            document.getElementById(
                'direccion'
            ).value,

        referencias:

            document.getElementById(
                'referencias'
            ).value,

        precio_final:
            precioFinal,

        cantidad:
            cantidad

    };





    try{

        /* ======================================
        CREAR PEDIDO
        ====================================== */

        const res =

            await fetch('/api/pedidos', {

                method:'POST',

                headers:{
                    'Content-Type':'application/json'
                },

                body:JSON.stringify(data)

            });





        const resultado =
            await res.json();





        /* ======================================
        PEDIDO EXITOSO
        ====================================== */

        if(resultado.ok){

            try{

                /* ======================================
                ADMIN
                ====================================== */


            }

            catch(error){

                console.log(
                    'Error WhatsApp:',
                    error
                );

            }





            /* ======================================
            ALERTA FINAL
            ====================================== */

            alert(
`✨ GRACIAS POR SU PREFERENCIA ✨

Su pedido fue realizado correctamente.

444 ESSENCE`
            );





            // ======================================
            // LIMPIAR PRODUCTO
            // ======================================

            localStorage.removeItem(
                'productoSeleccionado'
            );





            // ======================================
            // REGRESAR CATÁLOGO
            // ======================================

            window.location.href =
                '/catalogo.html';

        }

        /* ======================================
        ERROR BACKEND
        ====================================== */

        else{

            procesandoPedido = false;





            boton.disabled = false;

            boton.innerText =
                'CONFIRMAR PEDIDO';





            alert(resultado.error);

        }

    }

    /* ======================================
    ERROR GENERAL
    ====================================== */

    catch(error){

        console.log(error);





        procesandoPedido = false;





        boton.disabled = false;

        boton.innerText =
            'CONFIRMAR PEDIDO';





        alert(
            'Error procesando pedido'
        );

    }

});