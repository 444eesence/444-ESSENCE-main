/* ======================================
CARGAR PRODUCTOS
====================================== */

/*
    Esta función:

    - consulta la API de productos
    - obtiene todos los perfumes
    - guarda los datos en memoria
    - actualiza la tabla del dashboard
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
    // MOSTRAR TABLA
    // ======================================

    mostrarProductos(productos);

}





/* ======================================
MOSTRAR PRODUCTOS
====================================== */

/*
    Esta función:

    - recibe una lista de productos
    - genera dinámicamente la tabla HTML
    - muestra perfumes completos y decants
    - permite abrir producto con doble click
*/

function mostrarProductos(lista){

    // ======================================
    // INSERTAR HTML EN TABLA
    // ======================================

    document.getElementById(
        'tabla-productos'
    ).innerHTML =

    lista.map(p => `

        <!-- ======================================
        FILA PRODUCTO
        ======================================= -->

        <tr ondblclick="abrirProducto(${p.id_productos})">

            <!-- ID -->
            <td>${p.id_productos}</td>





            <!-- NOMBRE -->
            <td>${p.nombre}</td>





            <!-- MARCA -->
            <td>${p.marca}</td>





            <!-- PRECIO PERFUME -->
            <td>$${p.precio}</td>





            <!-- STOCK PERFUME -->
            <td>${p.stock}</td>





            <!-- PRECIO DECANT 5ML -->
            <td>

                ${
                    p.precio_decant_5ml
                    ? '$' + p.precio_decant_5ml
                    : '---'
                }

            </td>





            <!-- PRECIO DECANT 10ML -->
            <td>

                ${
                    p.precio_decant_10ml
                    ? '$' + p.precio_decant_10ml
                    : '---'
                }

            </td>





            <!-- STOCK DECANT 5ML -->
            <td>

                ${
                    p.stock_decant_5ml
                    ?? '---'
                }

            </td>





            <!-- STOCK DECANT 10ML -->
            <td>

                ${
                    p.stock_decant_10ml
                    ?? '---'
                }

            </td>





            <!-- IMAGEN -->
            <td>

                <img
                    src="${p.imagen_url}"
                    width="60"
                    style="border-radius:10px;"
                >

            </td>





            <!-- CATEGORÍA -->
            <td>${p.categoria}</td>





            <!-- DESCRIPCIÓN -->
            <td>${p.descripcion}</td>





            <!-- TIENE DECANTS -->
            <td>

                ${
                    p.es_decant
                    ? 'Sí'
                    : 'No'
                }

            </td>

        </tr>

    `).join('');

}





/* ======================================
FILTRAR PRODUCTOS
====================================== */

/*
    Esta función:

    - filtra productos por texto
    - busca por:
        • nombre
        • marca
*/

function filtrar(){

    const texto =
        document
        .getElementById('busqueda')
        .value
        .toLowerCase();

    const tipoStock =
        document
        .getElementById('tipoStock')
        .value;

    const ordenStock =
        document
        .getElementById('ordenStock')
        .value;





    let filtrados =

        productos.filter(p => {

            return (

                p.nombre
                .toLowerCase()
                .includes(texto)

                ||

                p.marca
                .toLowerCase()
                .includes(texto)

            );

        });





    if(ordenStock){

        filtrados.sort((a,b)=>{

            let stockA = 0;
            let stockB = 0;

            if(tipoStock === 'perfume'){

                stockA = a.stock;
                stockB = b.stock;

            }

            else if(tipoStock === '5ml'){

                stockA = a.stock_decant_5ml || 0;
                stockB = b.stock_decant_5ml || 0;

            }

            else{

                stockA = a.stock_decant_10ml || 0;
                stockB = b.stock_decant_10ml || 0;

            }

            return ordenStock === 'menor'

                ? stockA - stockB

                : stockB - stockA;

        });

    }





    mostrarProductos(filtrados);

}




/* ======================================
ABRIR PRODUCTO
====================================== */

/*
    Redirecciona al editor individual
    del producto seleccionado
*/

function abrirProducto(id){

    window.location.href =
        `/producto.html?id=${id}`;

}