/* ======================================
PROTECCIÓN DE ACCESO ADMIN
====================================== */

const usuario =
    JSON.parse(
        localStorage.getItem('usuario')
    );





if(!usuario){

    window.location.href =
        '/login.html';

}





else if(
    usuario.rol !== 'admin'
){
    3

    window.location.href =
        '/catalogo.html';

}



/* ======================================
VARIABLES GLOBALES
====================================== */

/*
    Aquí se guardan temporalmente:

    - productos
    - usuarios
    - pedidos
    - proveedores
    - registros
    - admins

    para poder usarlos en todo el dashboard
*/

window.productos = [];

window.usuarios = [];

window.pedidos = [];

window.proveedores = [];

window.registros = [];

window.admins = [];





/* ======================================
SIDEBAR
====================================== */

/*
    Este botón minimiza o expande
    el menú lateral del dashboard
*/

document
.getElementById('toggleSidebar')
.addEventListener('click', () => {

    document
    .getElementById('sidebar')
    .classList.toggle('minimized');

});





/* ======================================
CAMBIAR SECCIONES
====================================== */

/*
    Esta función:

    - oculta todas las secciones
    - muestra solo la seleccionada
    - cambia botón activo del menú
    - resetea scroll interno
*/

function mostrarSeccion(nombre, elemento){

    // ======================================
    // OCULTAR TODAS LAS SECCIONES
    // ======================================

    document
    .querySelectorAll('.main-content section')
    .forEach(sec => {

        sec.style.display = 'none';

    });





    // ======================================
    // OBTENER SECCIÓN
    // ======================================

    const seccion =
        document.getElementById(
            nombre + '-section'
        );





    // ======================================
    // MOSTRAR SECCIÓN
    // ======================================

    if(seccion){

        // REINICIAR SCROLL
        seccion.scrollTop = 0;

        // MOSTRAR FLEX
        seccion.style.display = 'flex';

    }





    // ======================================
    // LIMPIAR BOTONES ACTIVOS
    // ======================================

    document
    .querySelectorAll('.nav-item')
    .forEach(item => {

        item.classList.remove(
            'active'
        );

    });





    // ======================================
    // ACTIVAR BOTÓN ACTUAL
    // ======================================

    if(elemento){

        elemento.classList.add(
            'active'
        );

    }

}





/* ======================================
CARGAR RESUMEN ADMIN
====================================== */

/*
    Actualiza las tarjetas rápidas
    del panel administrador:

    - productos
    - usuarios
    - pedidos
*/

function cargarAdmin(){

    // ======================================
    // TOTAL PRODUCTOS
    // ======================================

    document.getElementById(
        'admin-productos'
    ).innerText = productos.length;





    // ======================================
    // TOTAL USUARIOS
    // ======================================

    document.getElementById(
        'admin-usuarios'
    ).innerText = usuarios.length;





    // ======================================
    // TOTAL PEDIDOS
    // ======================================

    document.getElementById(
        'admin-pedidos'
    ).innerText = pedidos.length;

}





/* ======================================
INICIO DEL DASHBOARD
====================================== */

/*
    Cuando carga la página:

    - obtiene productos
    - obtiene usuarios
    - obtiene pedidos
    - obtiene registros
    - obtiene proveedores
    - obtiene admins

    y luego actualiza tarjetas admin
*/

window.onload = async () => {

    try{

        // ======================================
        // PRODUCTOS
        // ======================================

        await cargarProductos();





        // ======================================
        // USUARIOS
        // ======================================

        await cargarUsuarios();





        // ======================================
        // PEDIDOS
        // ======================================

        await cargarPedidos();





        // ======================================
        // REGISTROS
        // ======================================

        await cargarRegistros();





        // ======================================
        // PROVEEDORES
        // ======================================

        await cargarProveedores();





        // ======================================
        // ADMINS
        // ======================================

        await cargarAdmins();





        // ======================================
        // ACTUALIZAR RESUMEN
        // ======================================

        cargarAdmin();

    }catch(error){

        console.log(error);

    }

};





/* ======================================
IR AL CATÁLOGO
====================================== */

/*
    Envía al catálogo público
*/

function irCatalogo(){

    window.location.href =
        "/catalogo.html";

}





/* ======================================
ABRIR VISTA PREVIA
====================================== */

/*
    Carga el catálogo dentro
    de un overlay para vista rápida
*/

async function abrirVistaPrevia(){

    // ======================================
    // OBTENER OVERLAY
    // ======================================

    const overlay =
        document.getElementById(
            "overlay-catalogo"
        );





    // ======================================
    // OBTENER HTML DEL CATÁLOGO
    // ======================================

    const res =
        await fetch(
            "/catalogo.html"
        );





    const html =
        await res.text();





    // ======================================
    // INSERTAR CONTENIDO
    // ======================================

    overlay.innerHTML = `

        <button onclick="cerrarVistaPrevia()" style="
            position:fixed;
            top:20px;
            right:20px;
            padding:10px;
            z-index:10000;
        ">

            Cerrar ✖

        </button>





        <div style="
            background:white;
            color:black;
            padding:20px;
        ">

            ${html}

        </div>

    `;





    // ======================================
    // MOSTRAR OVERLAY
    // ======================================

    overlay.classList.remove(
        "hidden"
    );

}





/* ======================================
CERRAR VISTA PREVIA
====================================== */

/*
    Oculta overlay del catálogo
*/

function cerrarVistaPrevia(){

    const overlay =
        document.getElementById(
            "overlay-catalogo"
        );





    overlay.classList.add(
        "hidden"
    );





    overlay.innerHTML = "";

}





/* ======================================
CERRAR SESIÓN
====================================== */

/*
    Elimina la sesión actual
    y regresa al login
*/

function cerrarSesion(){

    // ======================================
    // ELIMINAR USUARIO
    // ======================================

    localStorage.removeItem(
        'usuario'
    );





    // ======================================
    // REDIRECCIONAR LOGIN
    // ======================================

    window.location.href =
        '/login.html';

}

/* =====================================
ABRIR CREDITOS
===================================== */

function abrirCreditosAdmin(){

    document
    .getElementById(
        'modal-creditos-admin'
    )
    .classList.remove(
        'hidden'
    );

}





/* =====================================
CERRAR CREDITOS
===================================== */

function cerrarCreditosAdmin(){

    document
    .getElementById(
        'modal-creditos-admin'
    )
    .classList.add(
        'hidden'
    );

}