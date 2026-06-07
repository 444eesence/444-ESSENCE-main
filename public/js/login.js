/* ======================================
USUARIO EN SESIÓN
====================================== */

/*
    Obtiene usuario guardado
    en localStorage
*/

const usuario =

    JSON.parse(
        localStorage.getItem('usuario')
    );





/* ======================================
REDIRECCIÓN AUTOMÁTICA
====================================== */

/*
    Si ya existe sesión:

    - admin -> dashboard
    - cliente -> catálogo
*/

if(usuario){

    // ======================================
    // ADMIN
    // ======================================

    if(usuario.rol === 'admin'){

        window.location.href =
            '/index.html';

    }

    // ======================================
    // CLIENTE
    // ======================================

    else{

        window.location.href =
            '/catalogo.html';

    }

}





/* ======================================
CAMBIAR PANTALLAS
====================================== */

/*
    Estas funciones alternan entre:

    - login
    - registro
*/

function mostrarRegistro(){

    // ======================================
    // OCULTAR LOGIN
    // ======================================

    document
    .getElementById('loginSection')
    .classList.add('hidden');





    // ======================================
    // MOSTRAR REGISTRO
    // ======================================

    document
    .getElementById('registroSection')
    .classList.remove('hidden');

}





function mostrarLogin(){

    // ======================================
    // OCULTAR REGISTRO
    // ======================================

    document
    .getElementById('registroSection')
    .classList.add('hidden');





    // ======================================
    // MOSTRAR LOGIN
    // ======================================

    document
    .getElementById('loginSection')
    .classList.remove('hidden');

}





/* ======================================
REGISTRO
====================================== */

/*
    Esta función:

    - obtiene datos del formulario
    - crea cuenta nueva
    - muestra alertas
*/

document
.getElementById('registroForm')
.addEventListener('submit', async e => {

    // ======================================
    // EVITAR RECARGA
    // ======================================

    e.preventDefault();





    // ======================================
    // NOMBRE
    // ======================================

    const nombre =

        document
        .getElementById('registroNombre')
        .value;





    // ======================================
    // EMAIL
    // ======================================

    const email =

        document
        .getElementById('registroEmail')
        .value;





    // ======================================
    // CONTRASEÑA
    // ======================================

    const contrasena =

        document
        .getElementById('registroPassword')
        .value;





    /* ======================================
    ENVIAR REGISTRO
    ====================================== */

    const res =

        await fetch('/api/registro', {

            method:'POST',

            headers:{
                'Content-Type':'application/json'
            },

            body:JSON.stringify({

                nombre,
                email,
                contrasena

            })

        });





    // ======================================
    // RESPUESTA
    // ======================================

    const data =
        await res.json();





    /* ======================================
    REGISTRO EXITOSO
    ====================================== */

    if(data.ok){

        alert(
            'Cuenta creada correctamente'
        );





        // ======================================
        // REGRESAR LOGIN
        // ======================================

        mostrarLogin();

    }

    /* ======================================
    ERROR
    ====================================== */

    else{

        alert(data.error);

    }

});





/* ======================================
LOGIN
====================================== */

/*
    Esta función:

    - valida credenciales
    - guarda sesión
    - redirecciona usuario
*/

document
.getElementById('loginForm')
.addEventListener('submit', async e => {

    // ======================================
    // EVITAR RECARGA
    // ======================================

    e.preventDefault();





    // ======================================
    // EMAIL
    // ======================================

    const email =

        document
        .getElementById('loginEmail')
        .value;





    // ======================================
    // CONTRASEÑA
    // ======================================

    const contrasena =

        document
        .getElementById('loginPassword')
        .value;





    /* ======================================
    ENVIAR LOGIN
    ====================================== */

    const res =

        await fetch('/api/login', {

            method:'POST',

            headers:{
                'Content-Type':'application/json'
            },

            body:JSON.stringify({

                email,
                contrasena

            })

        });





    // ======================================
    // RESPUESTA
    // ======================================

    const data =
        await res.json();





    /* ======================================
    LOGIN EXITOSO
    ====================================== */

    if(data.ok){

        // ======================================
        // GUARDAR SESIÓN
        // ======================================

        localStorage.setItem(

            'usuario',

            JSON.stringify(data.usuario)

        );





        /* ======================================
        REDIRECCIONAR
        ====================================== */

        // ======================================
        // ADMIN
        // ======================================

        if(data.usuario.rol === 'admin'){

            window.location.href =
                '/index.html';

        }

        // ======================================
        // CLIENTE
        // ======================================

        else{

            window.location.href =
                '/catalogo.html';

        }

    }

    /* ======================================
    ERROR LOGIN
    ====================================== */

    else{

        alert(data.error);

    }

});