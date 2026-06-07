/* ======================================
VARIABLES GLOBALES
====================================== */

/*
    Aquí se almacenan:

    - proveedores obtenidos
    - proveedores filtrados
*/

let proveedoresFiltrados = [];





/* ======================================
CARGAR PROVEEDORES
====================================== */

/*
    Esta función:

    - consulta la API
    - obtiene todos los proveedores
    - guarda resultados
    - actualiza tabla
*/

async function cargarProveedores(){

    // ======================================
    // CONSULTAR API
    // ======================================

    const res =
        await fetch('/api/proveedores');





    // ======================================
    // GUARDAR DATOS
    // ======================================

    proveedores =
        await res.json();





    // ======================================
    // COPIA PARA FILTROS
    // ======================================

    proveedoresFiltrados =
        proveedores;





    // ======================================
    // MOSTRAR TABLA
    // ======================================

    mostrarProveedores(
        proveedores
    );

}





/* ======================================
MOSTRAR PROVEEDORES
====================================== */

/*
    Genera dinámicamente
    la tabla de proveedores
*/

function mostrarProveedores(lista){

    // ======================================
    // INSERTAR HTML
    // ======================================

    document.getElementById(
        'tabla-proveedores'
    ).innerHTML =

    lista.map(p => `

        <!-- ======================================
        FILA PROVEEDOR
        ======================================= -->

        <tr>

            <!-- ID -->
            <td>${p.id_proveedor}</td>





            <!-- NOMBRE -->
            <td>${p.nombre}</td>





            <!-- UBICACIÓN -->
            <td>${p.ubicacion}</td>





            <!-- TELÉFONO -->
            <td>${p.telefono}</td>





            <!-- ACCIONES -->
            <td>

                <!-- EDITAR -->
                <button
                    class="btn-agregar"
                    onclick="editarProveedor(${p.id_proveedor})">

                    EDITAR

                </button>





                <!-- ELIMINAR -->
                <button
                    class="btn-eliminar"
                    onclick="eliminarProveedor(${p.id_proveedor})">

                    ELIMINAR

                </button>

            </td>

        </tr>

    `).join('');

}





/* ======================================
GUARDAR PROVEEDOR
====================================== */

/*
    Esta función:

    - crea proveedor nuevo
    - o actualiza uno existente
*/

async function guardarProveedor(){

    // ======================================
    // ID PROVEEDOR
    // ======================================

    const id =

        document.getElementById(
            'proveedor-id'
        ).value;






// ======================================
// VALIDAR TELEFONO
// ======================================

const telefono =

    document.getElementById(
        'proveedor-telefono'
    ).value.trim();



// SOLO NUMEROS
if(!/^\d+$/.test(telefono)){

    alert(
        'El teléfono solo puede contener números'
    );

    return;

}



// EXACTAMENTE 10 DIGITOS
if(telefono.length !== 10){

    alert(
        'El teléfono debe tener exactamente 10 dígitos'
    );

    return;

}
    // ======================================
    // BODY
    // ======================================

   const body = {

    nombre:
        document.getElementById(
            'proveedor-nombre'
        ).value,

    ubicacion:
        document.getElementById(
            'proveedor-ubicacion'
        ).value,

    telefono:
        telefono

};




    /* ======================================
    EDITAR PROVEEDOR
    ====================================== */

    if(id){

        await fetch(`/api/proveedores/${id}`, {

            method:'PUT',

            headers:{
                'Content-Type':'application/json'
            },

            body:JSON.stringify(body)

        });

    }

    /* ======================================
    CREAR PROVEEDOR
    ====================================== */

    else{

        await fetch('/api/proveedores', {

            method:'POST',

            headers:{
                'Content-Type':'application/json'
            },

            body:JSON.stringify(body)

        });

    }





    // ======================================
    // LIMPIAR FORMULARIO
    // ======================================

    limpiarFormulario();





    // ======================================
    // RECARGAR TABLA
    // ======================================

    cargarProveedores();

}





/* ======================================
EDITAR PROVEEDOR
====================================== */

/*
    Carga automáticamente
    la información del proveedor
    dentro del formulario
*/

function editarProveedor(id){

    // ======================================
    // BUSCAR PROVEEDOR
    // ======================================

    const proveedor =

        proveedores.find(
            p => p.id_proveedor == id
        );





    // ======================================
    // ID
    // ======================================

    document.getElementById(
        'proveedor-id'
    ).value =
        proveedor.id_proveedor;





    // ======================================
    // NOMBRE
    // ======================================

    document.getElementById(
        'proveedor-nombre'
    ).value =
        proveedor.nombre;





    // ======================================
    // UBICACIÓN
    // ======================================

    document.getElementById(
        'proveedor-ubicacion'
    ).value =
        proveedor.ubicacion;





    // ======================================
    // TELÉFONO
    // ======================================

    document.getElementById(
        'proveedor-telefono'
    ).value =
        proveedor.telefono;

}





/* ======================================
ELIMINAR PROVEEDOR
====================================== */

/*
    Elimina proveedor
    de la base de datos
*/

async function eliminarProveedor(id){

    // ======================================
    // CONFIRMAR
    // ======================================

    const confirmar =

        confirm(
            '¿Eliminar proveedor?'
        );





    if(!confirmar) return;





    // ======================================
    // ELIMINAR
    // ======================================

    await fetch(`/api/proveedores/${id}`, {

        method:'DELETE'

    });





    // ======================================
    // RECARGAR TABLA
    // ======================================

    cargarProveedores();

}





/* ======================================
LIMPIAR FORMULARIO
====================================== */

/*
    Limpia todos los inputs
    del formulario proveedores
*/

function limpiarFormulario(){

    // ======================================
    // ID
    // ======================================

    document.getElementById(
        'proveedor-id'
    ).value = '';





    // ======================================
    // NOMBRE
    // ======================================

    document.getElementById(
        'proveedor-nombre'
    ).value = '';





    // ======================================
    // UBICACIÓN
    // ======================================

    document.getElementById(
        'proveedor-ubicacion'
    ).value = '';





    // ======================================
    // TELÉFONO
    // ======================================

    document.getElementById(
        'proveedor-telefono'
    ).value = '';

}





/* ======================================
FILTRAR PROVEEDORES
====================================== */

/*
    Filtra proveedores por:

    - nombre
    - ubicación
*/

function filtrarProveedores(){

    // ======================================
    // TEXTO BUSCADOR
    // ======================================

    const texto =

        document.getElementById(
            'buscar-proveedor'
        ).value
        .toLowerCase();





    // ======================================
    // FILTRAR RESULTADOS
    // ======================================

    const filtrados =

        proveedores.filter(p =>

            p.nombre
            .toLowerCase()
            .includes(texto)

            ||

            p.ubicacion
            .toLowerCase()
            .includes(texto)

        );





    // ======================================
    // ACTUALIZAR TABLA
    // ======================================

    mostrarProveedores(
        filtrados
    );

}