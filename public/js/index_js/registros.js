/* ======================================
VARIABLES GLOBALES
====================================== */

/*
    Aquí se almacenan:

    - registros enviados
    - registros filtrados
*/

let registrosFiltrados = [];





/* ======================================
CARGAR REGISTROS
====================================== */

/*
    Esta función:

    - obtiene pedidos
    - obtiene productos
    - calcula estadísticas
    - actualiza cards
    - genera tabla registros
*/

async function cargarRegistros(){

    /* ======================================
    PEDIDOS
    ====================================== */

    /*
        Obtener todos los pedidos
    */

    const resPedidos =
        await fetch('/api/pedidos');





    const pedidos =
        await resPedidos.json();





    /* ======================================
    PRODUCTOS
    ====================================== */

    /*
        Obtener todos los productos
    */

    const resProductos =
        await fetch('/api/productos');





    const productos =
        await resProductos.json();





    /* ======================================
    SOLO PEDIDOS ENVIADOS
    ====================================== */

    /*
        Los registros usan únicamente:

        estado === false
    */

    const enviados =

        pedidos.filter(
            p => p.estado === false
        );





    /* ======================================
    TOTAL VENTAS
    ====================================== */

    /*
        Suma total de ingresos
    */

    let totalVentas = 0;





    enviados.forEach(p => {

        totalVentas +=
            Number(p.precio_final);

    });





    /* ======================================
    VENTAS SEMANALES
    ====================================== */

    /*
        Calcula ventas
        de últimos 7 días
    */

    let ventasSemana = 0;





    const hoy =
        new Date();





    enviados.forEach(p => {

        const fecha =
            new Date(p.fecha);





        const diferencia =

            (hoy - fecha) /

            (1000 * 60 * 60 * 24);





        if(diferencia <= 7){

            ventasSemana +=
                Number(p.precio_final);

        }

    });





    /* ======================================
    VENTAS MENSUALES
    ====================================== */

    /*
        Calcula ventas
        del mes actual
    */

    let ventasMes = 0;





    enviados.forEach(p => {

        const fecha =
            new Date(p.fecha);





        if(

            fecha.getMonth() ===
            hoy.getMonth()

            &&

            fecha.getFullYear() ===
            hoy.getFullYear()

        ){

            ventasMes +=
                Number(p.precio_final);

        }

    });





    /* ======================================
    VALOR INVENTARIO
    ====================================== */

    /*
        Calcula valor total
        del inventario actual
    */

    let stockTotal = 0;





    productos.forEach(p => {

        const stock =
            Number(p.stock || 0);





        const precio =
            Number(p.precio || 0);





        stockTotal +=
            stock * precio;

    });





    /* ======================================
    ACTUALIZAR CARDS
    ====================================== */

    /*
        Actualiza:

        - ingresos totales
        - ventas semana
        - ventas mes
        - inventario
        - enviados
    */

    // ======================================
    // INGRESOS
    // ======================================

    document.getElementById(
        'total-ingresos'
    ).innerText =

        `$${Number(totalVentas).toFixed(2)}`;





    // ======================================
    // SEMANA
    // ======================================

    document.getElementById(
        'ventas-semana'
    ).innerText =

        `$${ventasSemana}`;





    // ======================================
    // MES
    // ======================================

    document.getElementById(
        'ventas-mes'
    ).innerText =

        `$${ventasMes}`;





    // ======================================
    // INVENTARIO
    // ======================================

    document.getElementById(
        'stock-restante'
    ).innerText =

        `$${Number(stockTotal).toFixed(2)}`;





    // ======================================
    // PEDIDOS ENVIADOS
    // ======================================

    document.getElementById(
        'pedidos-enviados'
    ).innerText =

        enviados.length;





    /* ======================================
    TABLA REGISTROS
    ====================================== */

    registrosFiltrados =
        enviados;





    mostrarTablaRegistros(
        enviados
    );

}





/* ======================================
MOSTRAR TABLA REGISTROS
====================================== */

/*
    Genera dinámicamente
    la tabla de historial
*/

function mostrarTablaRegistros(lista){

    document.getElementById(
        'tabla-registros'
    ).innerHTML =

    lista.map(r => `

        <!-- ======================================
        FILA REGISTRO
        ======================================= -->

        <tr>

            <!-- FECHA -->
            <td>

                ${new Date(r.fecha)
                    .toLocaleDateString()}

            </td>





            <!-- CLIENTE -->
            <td>

                ${r.usuario?.nombre || '-'}

            </td>





            <!-- PRODUCTO -->
            <td>

                ${r.producto?.nombre || '-'}

            </td>





            <!-- CANTIDAD -->
            <td>

                ${r.cantidad || 1}

            </td>





            <!-- TOTAL -->
            <td>

                $${r.precio_final}

            </td>





            <!-- ESTADO -->
            <td>

                <span class="estado enviado">

                    ENVIADO

                </span>

            </td>

        </tr>

    `).join('');

}





/* ======================================
FILTRAR REGISTROS
====================================== */

/*
    Filtra registros por:

    - hoy
    - semana
    - mes
    - todo
*/

function filtrarRegistros(tipo){

    const hoy =
        new Date();





    /* ======================================
    MOSTRAR TODOS
    ====================================== */

    if(tipo === 'todo'){

        mostrarTablaRegistros(
            registrosFiltrados
        );

        return;

    }





    /* ======================================
    FILTRAR
    ====================================== */

    const filtrados =

        registrosFiltrados.filter(r => {

            const fecha =
                new Date(r.fecha);





            const diferencia =

                (hoy - fecha) /

                (1000 * 60 * 60 * 24);





            // ======================================
            // HOY
            // ======================================

            if(tipo === 'hoy'){

                return diferencia <= 1;

            }





            // ======================================
            // SEMANA
            // ======================================

            if(tipo === 'semana'){

                return diferencia <= 7;

            }





            // ======================================
            // MES
            // ======================================

            if(tipo === 'mes'){

                return (

                    fecha.getMonth() ===
                    hoy.getMonth()

                );

            }

        });





    // ======================================
    // MOSTRAR FILTRADOS
    // ======================================

    mostrarTablaRegistros(
        filtrados
    );

}





/* ======================================
EXPORTAR EXCEL
====================================== */

/*
    Exporta tabla registros
    a archivo Excel
*/

function exportarExcel(){

    // ======================================
    // TABLA HTML
    // ======================================

    const tabla =

        document.getElementById(
            'tabla-registros-excel'
        );





    // ======================================
    // CREAR LIBRO
    // ======================================

    const libro =

        XLSX.utils.table_to_book(
            tabla,
            {
                sheet:"REGISTROS"
            }
        );





    // ======================================
    // DESCARGAR EXCEL
    // ======================================

    XLSX.writeFile(

        libro,

        `REGISTROS_444_ESSENCE.xlsx`

    );

}





/* ======================================
LIMPIAR TABLA REGISTROS
====================================== */

/*
    IMPORTANTE:

    Esta función SOLO limpia
    visualmente la tabla.

    NO elimina registros reales.
*/

async function limpiarRegistros(){

    const confirmar = confirm(

        '¿Eliminar TODOS los registros?'

    );

    if(!confirmar) return;

    await fetch(

        '/api/registros',

        {

            method:'DELETE'

        }

    );

    cargarRegistros();

}


    // ======================================
    // FUNCION PARA BUSCAR REGISTROS
    // ======================================
function buscarRegistro(){

    const texto =

        document
        .getElementById('buscar-registro')
        .value
        .toLowerCase();





    const filtrados =

        registrosFiltrados.filter(r => {

            const cliente =

                (r.usuario?.nombre || '')
                .toLowerCase();

            const producto =

                (r.producto?.nombre || '')
                .toLowerCase();





            return (

                cliente.includes(texto)

                ||

                producto.includes(texto)

            );

        });





    mostrarTablaRegistros(
        filtrados
    );

}