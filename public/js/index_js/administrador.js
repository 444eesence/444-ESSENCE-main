/* ======================================
VARIABLES GLOBALES
====================================== */

/*
    Aquí se almacenan:

    - todos los administradores
    - usuarios disponibles para convertir
*/

let admins = [];

let usuariosDisponibles = [];





/* ======================================
CARGAR ADMINISTRADORES
====================================== */

/*
    Esta función:

    - consulta la API de admins
    - obtiene todos los administradores
    - actualiza tabla
    - actualiza cards estadísticas
*/

async function cargarAdmins(){

    // ======================================
    // CONSULTAR API
    // ======================================

    const res =
        await fetch('/api/admins');





    // ======================================
    // GUARDAR DATOS
    // ======================================

    admins =
        await res.json();





    // ======================================
    // MOSTRAR TABLA
    // ======================================

    mostrarAdmins(admins);





    // ======================================
    // ACTUALIZAR CARDS
    // ======================================

    actualizarCardsAdmins();

}





/* ======================================
ACTUALIZAR CARDS ADMIN
====================================== */

/*
    Actualiza:

    - total admins
    - admin principal
    - admins secundarios
*/

function actualizarCardsAdmins(){

    // ======================================
    // TOTAL ADMINS
    // ======================================

    document.getElementById(
        'total-admins'
    ).innerText =
        admins.length;





    // ======================================
    // ADMIN PRINCIPAL
    // ======================================

    const principal =
        admins.find(a => a.principal);





    document.getElementById(
        'admin-principal-nombre'
    ).innerText =

        principal
        ? principal.usuario.nombre
        : 'NINGUNO';





    // ======================================
    // ADMINS SECUNDARIOS
    // ======================================

    document.getElementById(
        'admins-secundarios'
    ).innerText =

        admins.filter(a => !a.principal)
        .length;

}





/* ======================================
MOSTRAR ADMINS
====================================== */

/*
    Genera dinámicamente:

    - tabla de administradores
    - botones
    - acciones
*/

function mostrarAdmins(lista){

    document.getElementById(
        'tabla-admins'
    ).innerHTML =

    lista.map(a => `

        <!-- ======================================
        FILA ADMIN
        ======================================= -->

        <tr ondblclick="editarAdmin(${a.id_admin})">

            <!-- ID -->
            <td>${a.id_admin}</td>





            <!-- NOMBRE -->
            <td>${a.usuario.nombre}</td>





            <!-- INSTAGRAM -->
            <td>${a.ig}</td>





            <!-- WHATSAPP -->
            <td>${a.num}</td>





            <!-- PRINCIPAL -->
            <td>

                ${
                    a.principal
                    ? '⭐ PRINCIPAL'
                    : '-'
                }

            </td>





            <!-- ACCIONES -->
            <td>

                <!-- HACER PRINCIPAL -->
                <button
                    class="btn-plata"
                    onclick="hacerPrincipal(${a.id_admin})">

                    PRINCIPAL

                </button>





                <!-- QUITAR ADMIN -->
                <button
                    class="btn-eliminar"
                    onclick="quitarAdmin(${a.id_admin})">

                    QUITAR ADMIN

                </button>

            </td>

        </tr>

    `).join('');

}





/* ======================================
BUSCAR USUARIOS
====================================== */

/*
    Busca usuarios normales
    que aún NO son admins
*/

async function buscarUsuariosAdmin(){

    // ======================================
    // TEXTO BUSCADOR
    // ======================================

    const texto =

        document.getElementById(
            'buscar-usuario-admin'
        ).value
        .toLowerCase();





    // ======================================
    // CONSULTAR USUARIOS
    // ======================================

    const res =
        await fetch('/api/usuarios');





    const usuarios =
        await res.json();





    // ======================================
    // FILTRAR USUARIOS
    // ======================================

    usuariosDisponibles =

        usuarios.filter(u =>

            u.rol !== 'admin'

            &&

            u.nombre
            .toLowerCase()
            .includes(texto)

        );





    // ======================================
    // MOSTRAR RESULTADOS
    // ======================================

    mostrarUsuariosDisponibles();

}





/* ======================================
MOSTRAR USUARIOS DISPONIBLES
====================================== */

/*
    Muestra usuarios
    listos para convertir
    en administradores
*/

function mostrarUsuariosDisponibles(){

    document.getElementById(
        'lista-usuarios-admin'
    ).innerHTML =

    usuariosDisponibles.map(u => `

        <!-- ======================================
        CARD USUARIO
        ======================================= -->

        <div class="usuario-admin-item">

            <!-- NOMBRE -->
            <h4>
                ${u.nombre}
            </h4>





            <!-- EMAIL -->
            <p>
                ${u.email}
            </p>





            <!-- BOTÓN -->
            <button
                class="btn-agregar"
                onclick="seleccionarUsuarioAdmin(${u.id_usuarios}, '${u.nombre}')">

                SELECCIONAR

            </button>

        </div>

    `).join('');

}





/* ======================================
SELECCIONAR USUARIO
====================================== */

/*
    Coloca automáticamente
    los datos del usuario
    en el formulario admin
*/

function seleccionarUsuarioAdmin(id, nombre){

    // ======================================
    // ID USUARIO
    // ======================================

    document.getElementById(
        'admin-id-usuario'
    ).value = id;





    // ======================================
    // NOMBRE
    // ======================================

    document.getElementById(
        'admin-nombre'
    ).value = nombre;

}





/* ======================================
CONVERTIR ADMIN
====================================== */

/*
    Convierte un usuario en admin
    o actualiza uno existente
*/

async function convertirAdmin(){

    // ======================================
    // ID USUARIO
    // ======================================

    const idUsuario =

        document.getElementById(
            'admin-id-usuario'
        ).value;





    // ======================================
    // VALIDAR USUARIO
    // ======================================

    if(!idUsuario){

        alert(
            'Selecciona un usuario'
        );

        return;

    }


// ======================================
// VALIDAR TELEFONO
// ======================================

const telefono =

    document.getElementById(
        'admin-num'
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

    id_usuario:idUsuario,

    ig:
        document.getElementById(
            'admin-ig'
        ).value,

    num:
        document.getElementById(
            'admin-num'
        ).value,



};





    // ======================================
    // VERIFICAR SI YA EXISTE
    // ======================================

    const yaExiste =

        admins.find(a =>

            a.id_usuario == idUsuario

        );





    // ======================================
    // ACTUALIZAR
    // ======================================

    if(yaExiste){

        await fetch(`/api/admins/${yaExiste.id_admin}`, {

            method:'PUT',

            headers:{
                'Content-Type':'application/json'
            },

            body:JSON.stringify(body)

        });

    }

    // ======================================
    // CREAR
    // ======================================

    else{

        await fetch('/api/admins', {

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

    limpiarAdmin();





    // ======================================
    // RECARGAR
    // ======================================

    cargarAdmins();

    buscarUsuariosAdmin();

}





/* ======================================
QUITAR ADMIN
====================================== */

/*
    Elimina permisos de admin

    IMPORTANTE:
    - protege admin principal
*/

async function quitarAdmin(id){

    // ======================================
    // BUSCAR ADMIN
    // ======================================

    const admin =

        admins.find(a =>

            a.id_admin == id

        );





    // ======================================
    // PROTEGER PRINCIPAL
    // ======================================

    if(admin && admin.principal){

        alert(
            'No puedes quitar al administrador principal'
        );

        return;

    }





    // ======================================
    // CONFIRMAR
    // ======================================

    const confirmar =

        confirm(
            '¿Quitar permisos de administrador?'
        );





    if(!confirmar) return;





    // ======================================
    // ELIMINAR
    // ======================================

    await fetch(`/api/admins/${id}`, {

        method:'DELETE'

    });





    // ======================================
    // RECARGAR
    // ======================================

    cargarAdmins();

}





/* ======================================
HACER PRINCIPAL
====================================== */

/*
    Convierte un admin
    en administrador principal
*/

async function hacerPrincipal(id){

    await fetch(`/api/admins/principal/${id}`, {

        method:'PUT'

    });





    cargarAdmins();

}





/* ======================================
EDITAR ADMIN
====================================== */

/*
    Carga los datos del admin
    seleccionado en formulario
*/

function editarAdmin(id){

    // ======================================
    // BUSCAR ADMIN
    // ======================================

    const admin =

        admins.find(a =>

            a.id_admin == id

        );





    if(!admin) return;





    // ======================================
    // ID ADMIN
    // ======================================

    document.getElementById(
        'admin-editando-id'
    ).value =
        admin.id_admin;





    // ======================================
    // ID USUARIO
    // ======================================

    document.getElementById(
        'admin-id-usuario'
    ).value =
        admin.id_usuario;





    // ======================================
    // NOMBRE
    // ======================================

    document.getElementById(
        'admin-nombre'
    ).value =
        admin.usuario.nombre;





    // ======================================
    // INSTAGRAM
    // ======================================

    document.getElementById(
        'admin-ig'
    ).value =
        admin.ig || '';





    // ======================================
    // WHATSAPP
    // ======================================

    document.getElementById(
    'admin-num'
).value =
    admin.num || '';



}








/* ======================================
GUARDAR CAMBIOS ADMIN
====================================== */

/*
    Actualiza información
    del administrador
*/

async function guardarCambiosAdmin(){

    // ======================================
    // ID ADMIN
    // ======================================

    const idAdmin =

        document.getElementById(
            'admin-editando-id'
        ).value;





    // ======================================
    // VALIDAR
    // ======================================

    if(!idAdmin){

        alert(
            'Selecciona un admin de la tabla'
        );

        return;

    }


// ======================================
// VALIDAR TELEFONO
// ======================================

const telefono =

    document.getElementById(
        'admin-num'
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
            'admin-nombre'
        ).value,

    ig:
        document.getElementById(
            'admin-ig'
        ).value,

    num:
        document.getElementById(
            'admin-num'
        ).value,


};





    // ======================================
    // ACTUALIZAR
    // ======================================

    await fetch(`/api/admins/${idAdmin}`, {

        method:'PUT',

        headers:{
            'Content-Type':'application/json'
        },

        body:JSON.stringify(body)

    });


    const nuevaPassword =

    document.getElementById(
        'admin-password'
    ).value.trim();

if(nuevaPassword){

    await fetch(

        `/api/admins/password/${idAdmin}`,

        {

            method:'PUT',

            headers:{
                'Content-Type':'application/json'
            },

            body:JSON.stringify({

                password:nuevaPassword

            })

        }

    );

}


    // ======================================
    // ALERTA
    // ======================================

    alert(
        'Administrador actualizado'
    );





    // ======================================
    // RECARGAR
    // ======================================

    cargarAdmins();

}





/* ======================================
LIMPIAR FORMULARIO ADMIN
====================================== */

/*
    Limpia completamente
    formulario administrador
*/

function limpiarAdmin(){

    // ======================================
    // ID USUARIO
    // ======================================

    document.getElementById(
        'admin-id-usuario'
    ).value = '';





    // ======================================
    // INSTAGRAM
    // ======================================

    document.getElementById(
        'admin-ig'
    ).value = '';





    // ======================================
    // WHATSAPP
    // ======================================

    document.getElementById(
        'admin-num'
    ).value = '';




    // ======================================
    // NOMBRE
    // ======================================

    document.getElementById(
        'admin-nombre'
    ).value = '';

    document.getElementById(
    'admin-password'
).value = '';

}



document.querySelectorAll(
'.btn-principal'
)