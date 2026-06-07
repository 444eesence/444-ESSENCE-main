// ======================================
// DOTENV
// ======================================

require('dotenv').config();





// ======================================
// NODEMAILER
// ======================================

const nodemailer =
require('nodemailer');

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

console.log(
    adminPrincipal.app_pass
);

// ======================================
// SI NO HAY CONTRASEÑA
// ======================================

if(!adminPrincipal.app_pass){

    console.log(
        '⚠️ Administrador sin contraseña de aplicación'
    );

    return;

}





const transporter =

    nodemailer.createTransport({

        service:'gmail',

        auth:{

            user:
                adminPrincipal.usuario.email,

            pass:
                adminPrincipal.app_pass

        }

    });





await transporter.sendMail({

from:
    adminPrincipal.usuario.email,

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