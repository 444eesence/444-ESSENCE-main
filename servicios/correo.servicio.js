// ======================================
// DOTENV
// ======================================

require('dotenv').config();





const { Resend } =
require('resend');

const resend =
new Resend(
    process.env.RESEND_API_KEY
);

const { PrismaClient } =
require('@prisma/client');

const prisma =
new PrismaClient();




// ======================================
// ENVIAR CORREO PEDIDO
// ======================================

async function enviarCorreoPedido({

    

    pedido,
    telefono,
    direccion,
    referencias,
    tipo_producto,
    cantidad,
    precio_final

}){
    
    const adminPrincipal =

    await prisma.administrador.findFirst({

        where:{
            principal:true
        },

        include:{
            usuario:true
        }

    });





if(!adminPrincipal){

    throw new Error(
        'No existe administrador principal'
    );

}

console.log(
    adminPrincipal.usuario.email
);







const resultado =
await resend.emails.send({

    from:
    '444 ESSENCE <pedidos@444essence.com>',

    to:
        adminPrincipal.usuario.email,

        subject:'NUEVO PEDIDO • 444 ESSENCE',

        html:`

            <h2>
                Nuevo pedido recibido
            </h2>

            <hr>

            <p>

                <b>Cliente:</b>

                ${pedido.usuario.nombre}

            </p>

            <p>

                <b>Correo:</b>

                ${pedido.usuario.email}

            </p>

            <p>

                <b>Teléfono:</b>

                ${telefono}

            </p>

            <p>

                <b>Dirección:</b>

                ${direccion}

            </p>

            <p>

                <b>Producto:</b>

                ${pedido.producto.nombre}

            </p>

            <p>

                <b>Tipo:</b>

                ${tipo_producto}

            </p>

            <p>

                <b>Cantidad:</b>

                ${cantidad}

            </p>

            <p>

                <b>Total:</b>

                $${precio_final}

            </p>

            <p>

                <b>Referencias:</b>

                ${referencias || 'Sin referencias'}

            </p>

        `

    });

}





// ======================================
// EXPORTAR
// ======================================

module.exports = {

    enviarCorreoPedido

};