// ======================================
// PRISMA
// ======================================

const { PrismaClient } =
require('@prisma/client');

const prisma =
new PrismaClient();





// ======================================
// OBTENER PROVEEDORES
// ======================================

async function obtenerProveedores(req, res){

    try{

        const proveedores =
            await prisma.proveedor.findMany({

                orderBy:{
                    id_proveedor:'desc'
                }

            });





        res.json(proveedores);

    }catch(error){

        console.log(error);

        res.status(500).json({

            ok:false,
            error:error.message

        });

    }

}





// ======================================
// CREAR PROVEEDOR
// ======================================

async function crearProveedor(req, res){

    try{

        const proveedor =
            await prisma.proveedor.create({

                data:{

                    nombre:
                        req.body.nombre,

                    ubicacion:
                        req.body.ubicacion,

                    telefono:
                        req.body.telefono

                }

            });





        res.json(proveedor);

    }catch(error){

        console.log(error);

        res.status(500).json({

            ok:false,
            error:error.message

        });

    }

}





// ======================================
// ACTUALIZAR PROVEEDOR
// ======================================

async function actualizarProveedor(req, res){

    try{

        const proveedor =
            await prisma.proveedor.update({

                where:{
                    id_proveedor:
                        parseInt(req.params.id)
                },

                data:{

                    nombre:
                        req.body.nombre,

                    ubicacion:
                        req.body.ubicacion,

                    telefono:
                        req.body.telefono

                }

            });





        res.json(proveedor);

    }catch(error){

        console.log(error);

        res.status(500).json({

            ok:false,
            error:error.message

        });

    }

}





// ======================================
// ELIMINAR PROVEEDOR
// ======================================

async function eliminarProveedor(req, res){

    try{

        await prisma.proveedor.delete({

            where:{
                id_proveedor:
                    parseInt(req.params.id)
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

    obtenerProveedores,
    crearProveedor,
    actualizarProveedor,
    eliminarProveedor

};