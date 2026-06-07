// ======================================
// PRISMA
// ======================================

const { PrismaClient } =
require('@prisma/client');

const prisma =
new PrismaClient();





// ======================================
// OBTENER USUARIOS
// ======================================

async function obtenerUsuarios(req, res){

    try{

        const usuarios =
            await prisma.usuario.findMany({

                include:{

                    administrador:true

                }

            });





        // ======================================
        // ADMINS ARRIBA
        // ======================================

        usuarios.sort((a, b) => {

            if(a.rol === 'admin') return -1;

            if(b.rol === 'admin') return 1;

            return 0;

        });





        res.json(usuarios);

    }catch(error){

        console.log(error);

        res.status(500).json({

            ok:false,
            error:error.message

        });

    }

}





// ======================================
// ELIMINAR USUARIO
// ======================================

async function eliminarUsuario(req, res){

    try{

        const id =
            parseInt(req.params.id);





        // ======================================
        // BUSCAR PEDIDOS
        // ======================================

        const pedidos =
            await prisma.pedido.findMany({

                where:{

                    id_usuarios:id

                }

            });





        // ======================================
        // VERIFICAR PENDIENTES
        // ======================================

        const tienePendientes =
            pedidos.some(
                p => p.estado === true
            );





        // ======================================
        // CONFIRMACION
        // ======================================

        if(
            tienePendientes
            &&
            !req.query.confirmar
        ){

            return res.json({

                ok:false,
                pendientes:true

            });

        }





        // ======================================
        // IDS PEDIDOS
        // ======================================

        const idsPedidos =
            pedidos.map(
                p => p.id_pedidos
            );





        // ======================================
        // ELIMINAR REGISTROS
        // ======================================

        await prisma.registro.deleteMany({

            where:{

                id_pedido:{
                    in:idsPedidos
                }

            }

        });





        // ======================================
        // ELIMINAR PEDIDOS
        // ======================================

        await prisma.pedido.deleteMany({

            where:{

                id_usuarios:id

            }

        });





        // ======================================
        // ELIMINAR USUARIO
        // ======================================

        await prisma.usuario.delete({

            where:{

                id_usuarios:id

            }

        });





        res.json({

            ok:true

        });

    }catch(error){

        console.log(error);

        res.status(500).json({

            ok:false,
            error:error.message

        });

    }

}





// ======================================
// EXPORTAR
// ======================================

module.exports = {

    obtenerUsuarios,
    eliminarUsuario

};