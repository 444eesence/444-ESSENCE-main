// ======================================
// ROUTES
// ======================================

const productosRoutes =
require('./routes/productos.routes');

const usuariosRoutes =
require('./routes/usuarios.routes');

const autenticacionRoutes =
require('./routes/autenticacion.routes');

const pedidosRoutes =
require('./routes/pedidos.routes');

const registrosRoutes =
require('./routes/registros.routes');

const proveedoresRoutes =
require('./routes/proveedores.routes');

const adminsRoutes =
require('./routes/admins.routes');





// ======================================
// DOTENV
// ======================================

require('dotenv').config();





// ======================================
// LIBRERIAS
// ======================================

const express =
require('express');

const path =
require('path');

const bcrypt =
require('bcrypt');

const { PrismaClient } =
require('@prisma/client');





// ======================================
// INSTANCIAS
// ======================================

const app =
express();

const prisma =
new PrismaClient();





// ======================================
// SINCRONIZAR ADMINS
// ======================================

async function sincronizarAdmins(){

    try{

        // ======================================
        // OBTENER USUARIOS ADMIN
        // ======================================

        const usuariosAdmin =
            await prisma.usuario.findMany({

                where:{
                    rol:'admin'
                }

            });





        // ======================================
        // RECORRER ADMINS
        // ======================================

        for(const usuario of usuariosAdmin){

            // ======================================
            // VERIFICAR SI YA EXISTE
            // ======================================

            const existe =
                await prisma.administrador.findFirst({

                    where:{
                        id_usuario:
                            usuario.id_usuarios
                    }

                });





            // ======================================
            // CREAR ADMIN SI NO EXISTE
            // ======================================

            if(!existe){

                await prisma.administrador.create({

                    data:{

                        id_usuario:
                            usuario.id_usuarios,

                        ig:'',

                        num:'',

                        principal:false

                    }

                });

            }

        }





        console.log(
            '✅ ADMINS SINCRONIZADOS'
        );

    }catch(error){

        console.log(error);

    }

}





// ======================================
// MIDDLEWARES
// ======================================

app.use(express.json());

app.use(express.urlencoded({

    extended:true

}));





// ======================================
// ARCHIVOS PUBLICOS
// ======================================

app.use(

    express.static(

        path.join(__dirname, 'public'),

        {
            index:false
        }

    )

);





// ======================================
// ROUTES API
// ======================================

app.use(
    '/api/productos',
    productosRoutes
);

app.use(
    '/api/usuarios',
    usuariosRoutes
);

app.use(
    '/api/pedidos',
    pedidosRoutes
);

app.use(
    '/api/registros',
    registrosRoutes
);

app.use(
    '/api/proveedores',
    proveedoresRoutes
);

app.use(
    '/api',
    autenticacionRoutes
);

app.use(
    '/api',
    adminsRoutes
);





// ======================================
// CAMBIAR ESTADO PEDIDO
// ======================================

app.put('/api/pedidos/:id', async (req, res) => {

    try{

        const actualizado =
            await prisma.pedido.update({

                where:{

                    id_pedidos:
                        parseInt(req.params.id)

                },

                data:{

                    estado:req.body.estado

                }

            });





        res.json(actualizado);

    }catch(error){

        console.log(error);

        res.status(500).json({

            error:error.message

        });

    }

});





// ======================================
// ELIMINAR PEDIDOS PENDIENTES
// ======================================

app.delete('/api/pedidos/pendientes', async (req, res) => {

    try{

        await prisma.pedido.deleteMany({

            where:{

                estado:true

            }

        });





        res.json({

            ok:true

        });

    }catch(error){

        console.log(error);

        res.status(500).json({

            error:error.message

        });

    }

});





// ======================================
// PAGINA PRINCIPAL
// ======================================

app.get('/', (req, res) => {

    res.sendFile(

        path.join(

            __dirname,
            'public',
            'catalogo.html'

        )

    );

});





// ======================================
// PUERTO
// ======================================

const PORT = 3050;





// ======================================
// INICIAR SERVIDOR
// ======================================

sincronizarAdmins();

app.listen(PORT, '0.0.0.0', () => {

    console.log(`

====================================
🚀 SERVIDOR INICIADO
🌐 http://localhost:${PORT}
====================================

    `);

});