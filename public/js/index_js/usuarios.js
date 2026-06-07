/* ======================================
CARGAR USUARIOS
====================================== */

/*
    Esta función:

    - consulta todos los usuarios
    - guarda los resultados
    - ordena admins arriba
    - actualiza tabla usuarios
*/

async function cargarUsuarios(){

    // ======================================
    // CONSULTAR API
    // ======================================

    const res =
        await fetch('/api/usuarios');





    // ======================================
    // GUARDAR USUARIOS
    // ======================================

    usuarios =
        await res.json();





    /* ======================================
    ORDENAR ADMINS ARRIBA
    ====================================== */

    /*
        Los administradores siempre
        aparecerán primero en la tabla
    */

    usuarios.sort((a, b) => {

        // ADMIN A ARRIBA
        if(a.rol === 'admin') return -1;





        // ADMIN B ARRIBA
        if(b.rol === 'admin') return 1;





        // NORMAL
        return 0;

    });





    // ======================================
    // MOSTRAR TABLA
    // ======================================

    mostrarUsuarios(usuarios);

}





/* ======================================
MOSTRAR USUARIOS
====================================== */

/*
    Genera dinámicamente
    la tabla de usuarios
*/

function mostrarUsuarios(lista){

    // ======================================
    // INSERTAR HTML
    // ======================================

    document.getElementById(
        'tabla-usuarios'
    ).innerHTML =

    lista.map(u => `

        <!-- ======================================
        FILA USUARIO
        ======================================= -->

        <tr>

            <!-- ID -->
            <td>${u.id_usuarios}</td>





            <!-- NOMBRE -->
            <td>${u.nombre}</td>





            <!-- EMAIL -->
            <td>${u.email}</td>





            <!-- ROL -->
            <td>${u.rol}</td>





            <!-- ACCIONES -->
            <td>

                ${
                    u.rol === 'admin'

                    ?

                    /* ======================================
                    PROTEGER ADMINS
                    ====================================== */

                    '<b>ADMIN</b>'

                    :

                    /* ======================================
                    BOTÓN ELIMINAR
                    ====================================== */

                    `

                    <button
                        class="btn-eliminar"
                        onclick="eliminarUsuario(${u.id_usuarios})">

                        ELIMINAR

                    </button>

                    `
                }

            </td>

        </tr>

    `).join('');

}





/* ======================================
ELIMINAR USUARIO
====================================== */

/*
    Esta función:

    - elimina usuario
    - detecta pedidos pendientes
    - pide confirmación extra
    - actualiza tablas
*/

async function eliminarUsuario(id){

    /* ======================================
    PRIMER INTENTO
    ====================================== */

    /*
        Primer intento normal
        de eliminación
    */

    let res =

        await fetch(`/api/usuarios/${id}`, {

            method:'DELETE'

        });





    let data =
        await res.json();





    /* ======================================
    PEDIDOS PENDIENTES
    ====================================== */

    /*
        Si el usuario tiene pedidos
        pendientes, se pide confirmación
        adicional
    */

    if(data.pendientes){

        const confirmar =

            confirm(

                'Este usuario tiene pedidos pendientes.\n\n¿Desea eliminarlo de todas formas?'

            );





        if(!confirmar) return;





        /* ======================================
        ELIMINAR FORZADO
        ====================================== */

        res =

            await fetch(

                `/api/usuarios/${id}?confirmar=true`,

                {
                    method:'DELETE'
                }

            );





        data =
            await res.json();

    }





    /* ======================================
    ELIMINACIÓN EXITOSA
    ====================================== */

    if(data.ok){

        // ALERTA
        alert(
            'Usuario eliminado'
        );





        // RECARGAR USUARIOS
        cargarUsuarios();





        // RECARGAR PEDIDOS
        cargarPedidos();

    }

    /* ======================================
    ERROR
    ====================================== */

    else{

        alert(
            data.error || 'Error'
        );

    }

}





/* ======================================
FILTRAR USUARIOS
====================================== */

/*
    Filtra usuarios por:

    - nombre
    - correo
*/

function filtrarUsuarios(){

    // ======================================
    // TEXTO BUSCADOR
    // ======================================

    const texto =

        document
        .getElementById('buscar-usuario')
        .value
        .toLowerCase();





    /* ======================================
    FILTRAR
    ====================================== */

    const filtrados =

        usuarios.filter(u =>

            u.nombre
            .toLowerCase()
            .includes(texto)

            ||

            u.email
            .toLowerCase()
            .includes(texto)

        );





    // ======================================
    // ACTUALIZAR TABLA
    // ======================================

    mostrarUsuarios(filtrados);

}