/* ======================================
CATEGORÍA ACTUAL
====================================== */

/*
    Guarda la categoría activa
    seleccionada por el usuario
*/

let categoriaActual = 'Todos';





/* ======================================
VERIFICAR SESIÓN
====================================== */

/*
    Este bloque verifica:

    - si existe usuario logueado
    - si es administrador

    Si es admin:
    lo manda automáticamente
    al dashboard
*/

const usuario =

    JSON.parse(
        localStorage.getItem('usuario')
    );





// ======================================
// SI ES ADMIN
// ======================================

if(usuario && usuario.rol === 'admin'){

    window.location.href =
        '/index.html';

}





/* ======================================
VARIABLES GLOBALES
====================================== */

/*
    Aquí se almacenan
    todos los perfumes
*/

let productos = [];





/* ======================================
CARGAR PRODUCTOS
====================================== */

/*
    Esta función:

    - obtiene productos desde API
    - guarda productos
    - renderiza catálogo
    - muestra perfume aleatorio
*/

async function cargarProductos(){

    // ======================================
    // CONSULTAR API
    // ======================================

    const res =
        await fetch('/api/productos');





    // ======================================
    // GUARDAR PRODUCTOS
    // ======================================

    productos =
        await res.json();





    // ======================================
    // RENDERIZAR CATÁLOGO
    // ======================================

    renderizar();





    /* ======================================
    PERFUME ALEATORIO
    ====================================== */

    /*
        Solo en pantallas grandes
    */

    if(productos.length > 0){

        const aleatorio =

            productos[
                Math.floor(
                    Math.random() * productos.length
                )
            ];





        if(window.innerWidth > 1100){

            abrirSlider(aleatorio);

        }

    }

}





/* ======================================
CERRAR PANEL MÓVIL
====================================== */

/*
    Cierra slider en dispositivos móviles
*/

function cerrarMovil(){

    if(window.innerWidth <= 1100){

        document
        .getElementById('slider')
        .classList.remove('active');

    }

}





/* ======================================
HACER PEDIDO
====================================== */

/*
    Esta función:

    - verifica sesión
    - guarda perfume seleccionado
    - redirecciona al pedido
*/

function hacerPedido(prod = null){

    const usuario =
        localStorage.getItem("usuario");





    // ======================================
    // SIN LOGIN
    // ======================================

    if(!usuario){

        window.location.href =
            "login.html";

        return;

    }





    // ======================================
    // GUARDAR PRODUCTO
    // ======================================

    if(prod){

        localStorage.setItem(

            "productoSeleccionado",

            JSON.stringify(prod)

        );

    }





    // ======================================
    // IR A PEDIDOS
    // ======================================

    window.location.href =
        "hacer_pedido.html";

}





/* ======================================
RENDERIZAR CATÁLOGO
====================================== */

/*
    Esta función:

    - filtra perfumes
    - separa por género
    - genera tarjetas dinámicas
*/

function renderizar(){

    // ======================================
    // CONTENEDORES
    // ======================================

    const caballero =

        document.getElementById(
            'catalogo-caballero'
        );





    const dama =

        document.getElementById(
            'catalogo-dama'
        );





    const unisex =

        document.getElementById(
            'catalogo-unisex'
        );





    // ======================================
    // TEXTO BUSCADOR
    // ======================================

    const textoBusqueda =

        document
        .getElementById('busqueda')
        .value
        .toLowerCase();





    // ======================================
    // LIMPIAR CONTENEDORES
    // ======================================

    caballero.innerHTML = '';

    dama.innerHTML = '';

    unisex.innerHTML = '';





    /* ======================================
    FILTRAR PRODUCTOS
    ====================================== */

    const filtrados =

        productos.filter(p => {

            // ======================================
            // FILTRO CATEGORÍA
            // ======================================

            const coincideCategoria =

                categoriaActual === 'Todos'

                ||

                (p.categoria || '')
                .toLowerCase()

                ===

                categoriaActual.toLowerCase();





            // ======================================
            // FILTRO BUSCADOR
            // ======================================

            const coincideBusqueda =

                (p.nombre || '')
                .toLowerCase()
                .includes(textoBusqueda)

                ||

                (p.marca || '')
                .toLowerCase()
                .includes(textoBusqueda);





            // ======================================
            // RETORNAR RESULTADO
            // ======================================

            return (

                coincideCategoria
                &&
                coincideBusqueda

            );

        });





    /* ======================================
    GENERAR CARDS
    ====================================== */

    filtrados.forEach(producto => {

        // ======================================
        // CARD HTML
        // ======================================

        const card = `

            <div class="card"
                 onclick='abrirSlider(${JSON.stringify(producto)})'>

                <!-- IMAGEN -->
                <img src="${producto.imagen_url}">

                <div class="card-content">

                    <!-- MARCA -->
                    <div class="marca">

                        ${producto.marca}

                    </div>





                    <!-- NOMBRE -->
                    <div class="nombre">

                        ${producto.nombre}

                    </div>





                    <!-- PRECIO -->
                    <div class="precio">

                        $${producto.precio}

                    </div>





                </div>

            </div>

        `;





        // ======================================
        // GÉNERO
        // ======================================

        const genero =

            (producto.genero || '')
            .toLowerCase();





        // ======================================
        // CABALLERO
        // ======================================

        if(genero === 'caballero'){

            caballero.innerHTML += card;

        }

        // ======================================
        // DAMA
        // ======================================

        else if(genero === 'dama'){

            dama.innerHTML += card;

        }

        // ======================================
        // UNISEX
        // ======================================

        else{

            unisex.innerHTML += card;

        }

    });

}





/* ======================================
ABRIR PERFUME
====================================== */

/*
    Abre panel lateral del perfume
    mostrando:

    - imagen
    - descripción
    - precio
    - decants
    - disponibilidad
*/

function abrirSlider(producto){

    /* ======================================
    DISPONIBILIDAD
    ====================================== */

    const disponible =

        Number(producto.stock || 0) > 0

        ||

        Number(producto.stock_decant_5ml || 0) > 0

        ||

        Number(producto.stock_decant_10ml || 0) > 0;





    // ======================================
    // CONTENIDO
    // ======================================

    const contenido =

        document.getElementById(
            'slider-content'
        );





    /* ======================================
    DECANTS DISPONIBLES
    ====================================== */

    let decantsHTML = '';





    if(producto.es_decant){

        let medidas = [];





        // ======================================
        // 5ML
        // ======================================

        if(producto.precio_decant_5ml){

            medidas.push(`

                <span>
                    5ML • $${producto.precio_decant_5ml}
                </span>

            `);

        }





        // ======================================
        // 10ML
        // ======================================

        if(producto.precio_decant_10ml){

            medidas.push(`

                <span>
                    10ML • $${producto.precio_decant_10ml}
                </span>

            `);

        }





        // ======================================
        // CAJA DECANTS
        // ======================================

        decantsHTML = `

            <div class="decant-box">

                <div class="decant-titulo">

                    DECANTS DISPONIBLES

                </div>

                <div class="decant-medidas">

                    ${medidas.join('')}

                </div>

            </div>

        `;

    }





    // ======================================
    // ACTIVAR SLIDER
    // ======================================

    const slider =
        document.getElementById('slider');





    slider.classList.add('active');





    /* ======================================
    GENERAR PANEL
    ====================================== */

    contenido.innerHTML = `

        <button class="cerrar-movil"
                onclick="cerrarMovil()">

            ✕

        </button>





        <div class="perfume-panel">

            <!-- IMAGEN -->
            <img src="${producto.imagen_url}">

            <div class="perfume-info">

                <!-- MARCA -->
                <div class="perfume-marca">

                    ${producto.marca}

                </div>





                <!-- NOMBRE -->
                <h2>

                    ${producto.nombre}

                </h2>





                ${
                    Number(producto.stock || 0) > 0

                    ?

                    `
                    <div class="slider-precio">

                        $${producto.precio}

                    </div>
                    `

                    :

                    `
                    <div class="slider-agotado">

                        PERFUME AGOTADO

                    </div>
                    `
                }





                <!-- GÉNERO -->
                <div class="slider-genero">

                    ${producto.genero}

                </div>





                <!-- DECANTS -->
                ${decantsHTML}





                <!-- DESCRIPCIÓN -->
                <p>

                    ${producto.descripcion || 'Sin descripción'}

                </p>





                <!-- BOTÓN -->
                <button

                    class="${
                        disponible
                        ? 'btn-pedido'
                        : 'btn-agotado'
                    }"

                    ${
                        disponible

                        ?

                        `onclick='hacerPedido(${JSON.stringify(producto)})'`

                        :

                        'disabled'
                    }>

                    ${
                        disponible
                        ?

                        'HACER PEDIDO'

                        :

                        'NO DISPONIBLE'
                    }

                </button>

            </div>

        </div>

    `;

}





/* ======================================
FILTRO CATEGORÍAS
====================================== */

/*
    Cambia categoría actual
    y vuelve a renderizar
*/

function filtrarCategoria(categoria){

    categoriaActual =
        categoria;





    renderizar();

}





/* ======================================
IR A SECCIÓN
====================================== */

/*
    Hace scroll suave
    hacia la sección seleccionada
*/

function irSeccion(id){

    document
    .getElementById(id)
    .scrollIntoView({

        behavior:'smooth'

    });

}





/* ======================================
BUSCADOR
====================================== */

/*
    Renderiza automáticamente
    mientras el usuario escribe
*/

document
.getElementById('busqueda')
.addEventListener(
    'input',
    renderizar
);





/* ======================================
ADMIN FOOTER
====================================== */

/*
    Carga información
    del administrador principal
*/

async function cargarAdmin(){

    try{

        // ======================================
        // CONSULTAR API
        // ======================================

        const res =
            await fetch('/api/admin');





        const admin =
            await res.json();





        // ======================================
        // FOOTER
        // ======================================

        const footer =

            document.getElementById(
                'footer-admin'
            );





        footer.innerHTML = `

            <div class="footer-titulo">

                CONTACTENOS

            </div>





            <div>

                ${admin.usuario.nombre}

            </div>





            <div>

                WhatsApp:
                ${admin.num}

            </div>

        `;





        // ======================================
        // INSTAGRAM
        // ======================================

        const instagram =

            document.querySelector(
                '.fa-instagram'
            ).parentElement;





        instagram.href =
            admin.ig;





        // ======================================
        // WHATSAPP
        // ======================================

        const whatsapp =

            document.querySelector(
                '.fa-whatsapp'
            ).parentElement;





        whatsapp.href =
            `https://wa.me/${admin.num}`;

    }

    catch(error){

        console.log(error);

    }

}





// ======================================
// INICIAR ADMIN FOOTER
// ======================================

cargarAdmin();





/* ======================================
LOGIN / LOGOUT
====================================== */

/*
    Si ya hay sesión:
    permite cerrar sesión

    Si no:
    abre login
*/

function abrirLogin(){

    const usuario =
        localStorage.getItem("usuario");





    // ======================================
    // YA TIENE SESIÓN
    // ======================================

    if(usuario){

        const data =
            JSON.parse(usuario);





        const salir =

            confirm(

                `Hola ${data.nombre}

¿Deseas cerrar sesión?`

            );





        if(salir){

            localStorage.removeItem(
                "usuario"
            );





            location.reload();

        }

        return;

    }





    // ======================================
    // SIN SESIÓN
    // ======================================

    window.location.href =
        "login.html";

}





/* ======================================
INICIAR CATÁLOGO
====================================== */

/*
    Carga inicial
    del catálogo
*/

cargarProductos();

/* =====================================
ABRIR CREDITOS
===================================== */

function abrirCreditos(){

    document
    .getElementById(
        'modal-creditos'
    )
    .classList.remove(
        'oculto'
    );

}





/* =====================================
CERRAR CREDITOS
===================================== */

function cerrarCreditos(){

    document
    .getElementById(
        'modal-creditos'
    )
    .classList.add(
        'oculto'
    );

}

/* =====================================
ABRIR DESCARGAS
===================================== */

function abrirDescargas(){

    document
    .getElementById(
        'modal-descargas'
    )
    .classList.remove(
        'oculto'
    );

}





/* =====================================
CERRAR DESCARGAS
===================================== */

function cerrarDescargas(){

    document
    .getElementById(
        'modal-descargas'
    )
    .classList.add(
        'oculto'
    );

}





/* =====================================
DESCARGAR ANDROID
===================================== */

function descargarAndroid(){

    alert(
        'Próximamente disponible'
    );

}





/* =====================================
DESCARGAR WINDOWS
===================================== */

function descargarWindows(){

    alert(
        'Próximamente disponible'
    );

}