/* ======================================
FORMULARIO PRODUCTOS
====================================== */

/*
    Este bloque:

    - captura el submit
    - obtiene todos los datos
    - crea el producto
    - limpia formulario
    - muestra alerta
*/

document
.getElementById('formProducto')
.addEventListener('submit', async e => {

    // ======================================
    // EVITAR RECARGA
    // ======================================

    e.preventDefault();





    /* ======================================
    BODY PRODUCTO
    ====================================== */

    /*
        Objeto enviado al backend
    */

    const body = {

        // ======================================
        // NOMBRE
        // ======================================

        nombre:

            document
            .getElementById('nombre')
            .value,





        // ======================================
        // MARCA
        // ======================================

        marca:

            document
            .getElementById('marca')
            .value,





        // ======================================
        // PRECIO
        // ======================================

        precio:

            parseFloat(

                document
                .getElementById('precio')
                .value

            ),





        // ======================================
        // STOCK
        // ======================================

        stock:

            parseInt(

                document
                .getElementById('stock')
                .value

            ),









        // ======================================
        // CATEGORÍA
        // ======================================

        categoria:

            document
            .getElementById('categoria')
            .value,





        // ======================================
        // GÉNERO
        // ======================================

        genero:

            document
            .getElementById('genero')
            .value,





        // ======================================
        // DESCRIPCIÓN
        // ======================================

        descripcion:

            document
            .getElementById('descripcion')
            .value,





        // ======================================
        // TIENE DECANTS
        // ======================================

        es_decant:

            document
            .getElementById('es_decant')
            .checked,





        /* ======================================
        PRECIO DECANT 5ML
        ====================================== */

        precio_decant_5ml:

            document
            .getElementById('precio_decant_5ml')
            .value

            ?

            parseFloat(

                document
                .getElementById('precio_decant_5ml')
                .value

            )

            :

            null,





        /* ======================================
        PRECIO DECANT 10ML
        ====================================== */

        precio_decant_10ml:

            document
            .getElementById('precio_decant_10ml')
            .value

            ?

            parseFloat(

                document
                .getElementById('precio_decant_10ml')
                .value

            )

            :

            null,





        /* ======================================
        STOCK DECANT 5ML
        ====================================== */

        stock_decant_5ml:

    document.getElementById('es_decant').checked

    ?

    (

        document.getElementById('stock_decant_5ml').value

        ?

        parseInt(
            document.getElementById('stock_decant_5ml').value
        )

        :

        0

    )

    :

    0,





        /* ======================================
        STOCK DECANT 10ML
        ====================================== */

        stock_decant_10ml:

    document.getElementById('es_decant').checked

    ?

    (

        document.getElementById('stock_decant_10ml').value

        ?

        parseInt(
            document.getElementById('stock_decant_10ml').value
        )

        :

        0

    )

    :

    0

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
    CREAR PRODUCTO
    ====================================== */

    const formData = new FormData();

Object.keys(body).forEach(key => {

    formData.append(
        key,
        body[key]
    );

});





const imagen =

    document
    .getElementById('imagen')
    .files[0];





if(imagen){

    formData.append(
        'imagen',
        imagen
    );

}





const res =

    await fetch('/api/productos', {

        method:'POST',

        body:formData

    });





    /* ======================================
    PRODUCTO CREADO
    ====================================== */

    if(res.ok){

        // ======================================
        // MOSTRAR ALERTA
        // ======================================

        document
        .getElementById('alerta')
        .style.display = 'block';





        // ======================================
        // LIMPIAR FORMULARIO
        // ======================================

        document
        .getElementById('formProducto')
        .reset();





        // ======================================
        // OCULTAR ALERTA
        // ======================================

        setTimeout(() => {

            document
            .getElementById('alerta')
            .style.display = 'none';

        }, 2500);

        

    }else{

    const data =
        await res.json();

    alert(
        data.error
        ||
        'Error al crear producto'
    );

}

});





/* ======================================
ELEMENTOS DEL DOM
====================================== */

/*
    Variables reutilizadas
    para preview dinámico
*/

const nombre =
    document.getElementById('nombre');





const marca =
    document.getElementById('marca');





const precio =
    document.getElementById('precio');





const descripcion =
    document.getElementById('descripcion');





const imagen =
    document.getElementById('imagen');





const checkboxDecant =
    document.getElementById('es_decant');





const decantsGrid =
    document.querySelector('.decants-grid');





/* ======================================
ACTUALIZAR PREVIEW
====================================== */

/*
    Actualiza automáticamente
    la vista previa del perfume
*/

function actualizarPreview(){

    // ======================================
    // NOMBRE
    // ======================================

    document.getElementById(
        'preview-nombre'
    ).innerText =

        nombre.value || 'NOMBRE PERFUME';





    // ======================================
    // MARCA
    // ======================================

    document.getElementById(
        'preview-marca'
    ).innerText =

        marca.value || 'MARCA';





    // ======================================
    // PRECIO
    // ======================================

    document.getElementById(
        'preview-precio'
    ).innerText =

        '$' + (precio.value || 0);





    // ======================================
    // DESCRIPCIÓN
    // ======================================

    document.getElementById(
        'preview-desc'
    ).innerText =

        descripcion.value ||

        'Descripción del perfume...';





    // ======================================
// IMAGEN
// ======================================

const archivo =

    imagen.files[0];

if(archivo){

    document.getElementById(
        'preview-img'
    ).src =

        URL.createObjectURL(
            archivo
        );

}

else{

    document.getElementById(
        'preview-img'
    ).src =

        '/imagenes/default.png';

}

}





/* ======================================
MOSTRAR / OCULTAR DECANTS
====================================== */

/*
    Esta función:

    - muestra campos decants
    - oculta campos decants
    - limpia inputs si se desactiva
*/

function toggleDecants(){

    // ======================================
    // MOSTRAR DECANTS
    // ======================================

    if(checkboxDecant.checked){

        decantsGrid
        .classList.remove('oculto');

    }

    // ======================================
    // OCULTAR DECANTS
    // ======================================

    else{

        decantsGrid
        .classList.add('oculto');





        /* ======================================
        LIMPIAR INPUTS
        ====================================== */

        document.getElementById(
            'precio_decant_5ml'
        ).value = '';





        document.getElementById(
            'precio_decant_10ml'
        ).value = '';





        document.getElementById(
            'stock_decant_5ml'
        ).value = '';





        document.getElementById(
            'stock_decant_10ml'
        ).value = '';

    }

}





/* ======================================
EVENTOS INPUTS
====================================== */

/*
    Actualizan automáticamente
    el preview en tiempo real
*/

nombre.addEventListener(
    'input',
    actualizarPreview
);





marca.addEventListener(
    'input',
    actualizarPreview
);





precio.addEventListener(
    'input',
    actualizarPreview
);





descripcion.addEventListener(
    'input',
    actualizarPreview
);





imagen.addEventListener(
    'change',
    actualizarPreview
);





checkboxDecant.addEventListener(
    'change',
    toggleDecants
);





/* ======================================
INICIALIZAR
====================================== */

/*
    Ejecutar al abrir página
*/

actualizarPreview();

toggleDecants();