/* ======================================
OBTENER ID PRODUCTO
====================================== */

/*
    Obtiene el ID enviado
    en la URL:

    producto.html?id=1
*/

const params =

    new URLSearchParams(
        window.location.search
    );





const id =
    params.get('id');





/* ======================================
CARGAR PRODUCTO
====================================== */

/*
    Esta función:

    - consulta producto
    - llena formulario
    - actualiza preview
*/

async function cargarProducto(){

    try{

        // ======================================
        // CONSULTAR API
        // ======================================

        const res =
            await fetch(`/api/productos/${id}`);





        const producto =
            await res.json();





        /* ======================================
        PRODUCTO NO EXISTE
        ====================================== */

        if(!producto || producto.error){

            alert(
                'Producto no encontrado'
            );





            window.location.href =
                '/index.html';

            return;

        }





        /* ======================================
        INPUTS PRINCIPALES
        ====================================== */

        // ======================================
        // NOMBRE
        // ======================================

        document.getElementById(
            'nombre'
        ).value =

            producto.nombre || '';





        // ======================================
        // MARCA
        // ======================================

        document.getElementById(
            'marca'
        ).value =

            producto.marca || '';





        // ======================================
        // PRECIO
        // ======================================

        document.getElementById(
            'precio'
        ).value =

            producto.precio || 0;





        // ======================================
        // STOCK
        // ======================================

        document.getElementById(
            'stock'
        ).value =

            producto.stock || 0;





        // ======================================
        // IMAGEN
        // ======================================

        document.getElementById(
            'imagen_url'
        ).value =

            producto.imagen_url || '';





        // ======================================
        // CATEGORÍA
        // ======================================

        document.getElementById(
            'categoria'
        ).value =

            producto.categoria || '';





        // ======================================
        // GÉNERO
        // ======================================

        document.getElementById(
            'genero'
        ).value =

            producto.genero || 'Unisex';





        // ======================================
        // DESCRIPCIÓN
        // ======================================

        document.getElementById(
            'descripcion'
        ).value =

            producto.descripcion || '';





        /* ======================================
        DECANTS
        ====================================== */

        // ======================================
        // TIENE DECANTS
        // ======================================

        document.getElementById(
            'es_decant'
        ).checked =

            producto.es_decant || false;





        // ======================================
        // PRECIO 5ML
        // ======================================

        document.getElementById(
            'precio_decant_5ml'
        ).value =

            producto.precio_decant_5ml || '';





        // ======================================
        // PRECIO 10ML
        // ======================================

        document.getElementById(
            'precio_decant_10ml'
        ).value =

            producto.precio_decant_10ml || '';





        // ======================================
        // STOCK 5ML
        // ======================================

        document.getElementById(
            'stock_decant_5ml'
        ).value =

            producto.stock_decant_5ml || '';





        // ======================================
        // STOCK 10ML
        // ======================================

        document.getElementById(
            'stock_decant_10ml'
        ).value =

            producto.stock_decant_10ml || '';





        /* ======================================
        ACTUALIZAR PREVIEW
        ====================================== */

        actualizarPreview();
        toggleDecants();

    }

    /* ======================================
    ERROR GENERAL
    ====================================== */

    catch(error){

        console.log(error);





        alert(
            'Error cargando producto'
        );

    }

}





/* ======================================
ACTUALIZAR PREVIEW
====================================== */

/*
    Actualiza automáticamente:

    - imagen
    - nombre
    - marca
    - precio
    - descripción
*/

function actualizarPreview(){

    // ======================================
    // IMAGEN
    // ======================================

    document.getElementById(
        'preview-img'
    ).src =

        document.getElementById(
            'imagen_url'
        ).value

        ||

        '/imagenes/default.png';





    // ======================================
    // MARCA
    // ======================================

    document.getElementById(
        'preview-marca'
    ).innerText =

        document.getElementById(
            'marca'
        ).value

        ||

        'MARCA';





    // ======================================
    // NOMBRE
    // ======================================

    document.getElementById(
        'preview-nombre'
    ).innerText =

        document.getElementById(
            'nombre'
        ).value

        ||

        'PERFUME';





    // ======================================
    // PRECIO
    // ======================================

    document.getElementById(
        'preview-precio'
    ).innerText =

        '$' +

        (

            document.getElementById(
                'precio'
            ).value

            || 0

        );





    // ======================================
    // DESCRIPCIÓN
    // ======================================

    document.getElementById(
        'preview-desc'
    ).innerText =

        document.getElementById(
            'descripcion'
        ).value

        ||

        'Descripción...';

}





/* ======================================
EVENTOS INPUTS
====================================== */

/*
    Cada vez que el usuario
    escribe algo:

    se actualiza preview
*/

document
.getElementById('nombre')
.addEventListener(
    'input',
    actualizarPreview
);





document
.getElementById('marca')
.addEventListener(
    'input',
    actualizarPreview
);





document
.getElementById('precio')
.addEventListener(
    'input',
    actualizarPreview
);





document
.getElementById('imagen_url')
.addEventListener(
    'input',
    actualizarPreview
);





document
.getElementById('descripcion')
.addEventListener(
    'input',
    actualizarPreview
);





/* ======================================
GUARDAR CAMBIOS
====================================== */

/*
    Esta función:

    - obtiene datos del formulario
    - actualiza producto
    - guarda cambios
*/

async function guardarCambios(){

    /* ======================================
    BODY PRODUCTO
    ====================================== */

    const body = {

        // ======================================
        // NOMBRE
        // ======================================

        nombre:
            document.getElementById('nombre').value,





        // ======================================
        // MARCA
        // ======================================

        marca:
            document.getElementById('marca').value,





        // ======================================
        // PRECIO
        // ======================================

        precio:

            parseFloat(
                document.getElementById('precio').value
            ),





        // ======================================
        // STOCK
        // ======================================

        stock:

            parseInt(
                document.getElementById('stock').value
            ),





        // ======================================
        // IMAGEN
        // ======================================

        imagen_url:
            document.getElementById('imagen_url').value,





        // ======================================
        // CATEGORÍA
        // ======================================

        categoria:
            document.getElementById('categoria').value,





        // ======================================
        // GÉNERO
        // ======================================

        genero:
            document.getElementById('genero').value,





        // ======================================
        // DESCRIPCIÓN
        // ======================================

        descripcion:
            document.getElementById('descripcion').value,





        /* ======================================
        DECANTS
        ====================================== */

        // ======================================
        // TIENE DECANTS
        // ======================================

        es_decant:

            document.getElementById(
                'es_decant'
            ).checked,





        // ======================================
        // PRECIO 5ML
        // ======================================

        precio_decant_5ml:

            document.getElementById(
                'precio_decant_5ml'
            ).value

            ?

            parseFloat(

                document.getElementById(
                    'precio_decant_5ml'
                ).value

            )

            :

            null,





        // ======================================
        // PRECIO 10ML
        // ======================================

        precio_decant_10ml:

            document.getElementById(
                'precio_decant_10ml'
            ).value

            ?

            parseFloat(

                document.getElementById(
                    'precio_decant_10ml'
                ).value

            )

            :

            null,





        // ======================================
        // STOCK 5ML
        // ======================================

        stock_decant_5ml:

            document.getElementById(
                'stock_decant_5ml'
            ).value

            ?

            parseInt(

                document.getElementById(
                    'stock_decant_5ml'
                ).value

            )

            :

            null,





        // ======================================
        // STOCK 10ML
        // ======================================

        stock_decant_10ml:

            document.getElementById(
                'stock_decant_10ml'
            ).value

            ?

            parseInt(

                document.getElementById(
                    'stock_decant_10ml'
                ).value

            )

            :

            null

    };

/* ======================================
VALIDAR PRECIOS Y STOCKS
====================================== */

if(body.precio < 0){

    alert(
        'El precio no puede ser negativo'
    );

    return;

}

if(body.stock < 0){

    alert(
        'El stock no puede ser negativo'
    );

    return;

}

if(

    body.precio_decant_5ml !== null

    &&

    body.precio_decant_5ml < 0

){

    alert(
        'El precio del decant 5ml no puede ser negativo'
    );

    return;

}

if(

    body.precio_decant_10ml !== null

    &&

    body.precio_decant_10ml < 0

){

    alert(
        'El precio del decant 10ml no puede ser negativo'
    );

    return;

}

if(

    body.stock_decant_5ml !== null

    &&

    body.stock_decant_5ml < 0

){

    alert(
        'El stock del decant 5ml no puede ser negativo'
    );

    return;

}

if(

    body.stock_decant_10ml !== null

    &&

    body.stock_decant_10ml < 0

){

    alert(
        'El stock del decant 10ml no puede ser negativo'
    );

    return;

}



    /* ======================================
    ENVIAR ACTUALIZACIÓN
    ====================================== */

    const res =

        await fetch(`/api/productos/${id}`, {

            method:'PUT',

            headers:{
                'Content-Type':'application/json'
            },

            body:JSON.stringify(body)

        });





    const data =
        await res.json();





    /* ======================================
    ACTUALIZADO
    ====================================== */

    if(data.ok){

        alert(
            'Producto actualizado'
        );





        window.location.href =
            '/index.html';

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
ELIMINAR PRODUCTO
====================================== */

/*
    Elimina producto
    permanentemente
*/

async function eliminarProducto(){

    // ======================================
    // CONFIRMAR
    // ======================================

    const confirmar =

        confirm(
            '¿Eliminar producto?'
        );





    if(!confirmar) return;





    // ======================================
    // ELIMINAR API
    // ======================================

    const res =

        await fetch(`/api/productos/${id}`, {

            method:'DELETE'

        });





    const data =
        await res.json();





    /* ======================================
    ELIMINADO
    ====================================== */

    if(data.ok){

        alert(
            'Producto eliminado'
        );





        window.location.href =
            '/index.html';

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
INICIAR
====================================== */

/*
    Validar si existe ID
*/

if(id){

    cargarProducto();

}

else{

    alert(
        'ID no encontrado'
    );





    window.location.href =
        '/index.html';

}





/* ======================================
VOLVER DASHBOARD
====================================== */

/*
    Regresar manualmente
    al dashboard
*/

function volverIndex(){

    window.location.href =
        '/index.html';

}


/* ======================================
Ocultar area de Decants
====================================== */
function toggleDecants(){

    const check =

        document.getElementById(
            'es_decant'
        );



    const grid =

        document.getElementById(
            'decants-grid'
        );



    if(check.checked){

        grid.classList.remove(
            'oculto'
        );

    }

    else{

        grid.classList.add(
            'oculto'
        );

    }

}

document
.getElementById('es_decant')
.addEventListener(
    'change',
    toggleDecants
);