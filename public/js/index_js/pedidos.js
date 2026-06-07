/* ======================================
CARGAR PEDIDOS
====================================== */

/*
    Esta función:

    - obtiene todos los pedidos
    - separa pendientes y enviados
    - genera dinámicamente ambas tablas
*/

async function cargarPedidos(){

    // ======================================
    // CONSULTAR API
    // ======================================

    const res =
        await fetch('/api/pedidos');





    // ======================================
    // GUARDAR PEDIDOS
    // ======================================

    pedidos =
        await res.json();





    /* ======================================
    PEDIDOS PENDIENTES
    ====================================== */

    /*
        Los pedidos pendientes son:

        estado === true
    */

    const pendientes =

        pedidos.filter(p => p.estado);





    // ======================================
    // GENERAR TABLA PENDIENTES
    // ======================================

    document.getElementById(
        'tabla-pendientes'
    ).innerHTML =

    pendientes.map(p => `

        <!-- ======================================
        FILA PEDIDO PENDIENTE
        ======================================= -->

        <tr>

            <!-- ID -->
            <td>${p.id_pedidos}</td>





            <!-- CLIENTE -->
            <td>${p.usuario.nombre}</td>





            <!-- TELÉFONO -->
            <td>${p.telefono || '-'}</td>





            <!-- DIRECCIÓN -->
            <td>${p.direccion || '-'}</td>





            <!-- CANTIDAD -->
            <td>${p.cantidad || 1}</td>





            <!-- PRODUCTO -->
            <td>${p.producto.nombre}</td>





            <!-- TOTAL -->
            <td>$${p.precio_final}</td>





            <!-- TIPO -->
            <td>${p.tipo_producto}</td>





            <!-- REFERENCIAS -->
            <td>${p.referencias || '-'}</td>





            <!-- ACCIONES -->
            <td>

                <!-- ENVIAR -->
                <button
                    class="btn-agregar"
                    onclick="marcarEnviado(${p.id_pedidos})">

                    ENVIAR

                </button>





                <!-- CANCELAR -->
                <button
                    class="btn-eliminar"
                    onclick="cancelarPedido(${p.id_pedidos})">

                    CANCELAR

                </button>

            </td>

        </tr>

    `).join('');





    /* ======================================
    PEDIDOS ENVIADOS
    ====================================== */

    /*
        Los enviados son:

        estado === false
    */

    const enviados =

        pedidos.filter(p => !p.estado);





    // ======================================
    // GENERAR TABLA ENVIADOS
    // ======================================

    document.getElementById(
        'tabla-enviados'
    ).innerHTML =

    enviados.map(p => `

        <!-- ======================================
        FILA PEDIDO ENVIADO
        ======================================= -->

        <tr>

            <!-- ID -->
            <td>${p.id_pedidos}</td>





            <!-- CLIENTE -->
            <td>${p.usuario.nombre}</td>





            <!-- TELÉFONO -->
            <td>${p.telefono || '-'}</td>





            <!-- DIRECCIÓN -->
            <td>${p.direccion || '-'}</td>





            <!-- CANTIDAD -->
            <td>${p.cantidad || 1}</td>





            <!-- PRODUCTO -->
            <td>${p.producto.nombre}</td>





            <!-- TOTAL -->
            <td>$${p.precio_final}</td>





            <!-- TIPO -->
            <td>${p.tipo_producto}</td>





            <!-- REFERENCIAS -->
            <td>${p.referencias || '-'}</td>

        </tr>

    `).join('');

}





/* ======================================
MARCAR COMO ENVIADO
====================================== */

/*
    Cambia el estado del pedido:

    pendiente -> enviado
*/

async function marcarEnviado(id){

    // ======================================
    // ACTUALIZAR PEDIDO
    // ======================================

    await fetch(`/api/pedidos/enviar/${id}`, {

        method:'PUT'

    });





    // ======================================
    // RECARGAR TABLAS
    // ======================================

    cargarPedidos();

}





/* ======================================
CANCELAR PEDIDO
====================================== */

/*
    Elimina completamente
    un pedido de la base de datos
*/

async function cancelarPedido(id){

    // ======================================
    // CONFIRMAR
    // ======================================

    const confirmar =

        confirm(
            '¿Cancelar este pedido?'
        );





    if(!confirmar) return;





    // ======================================
    // ELIMINAR PEDIDO
    // ======================================

    await fetch(`/api/pedidos/${id}`, {

        method:'DELETE'

    });





    // ======================================
    // RECARGAR TABLAS
    // ======================================

    cargarPedidos();

}





/* ======================================
LIMPIAR TABLA ENVIADOS
====================================== */

/*
    IMPORTANTE:

    Esta función SOLO limpia
    visualmente la tabla enviados.

    NO elimina pedidos reales
    de la base de datos.
*/

function limpiarEnviados(){

    // ======================================
    // CONFIRMAR
    // ======================================

    const confirmar =

        confirm(
            '¿Limpiar tabla de enviados?'
        );





    if(!confirmar) return;





    // ======================================
    // LIMPIAR TABLA VISUAL
    // ======================================

    document.getElementById(
        'tabla-enviados'
    ).innerHTML = '';

}