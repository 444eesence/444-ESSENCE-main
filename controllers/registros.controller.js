// ======================================
// PRISMA
// ======================================

const { PrismaClient } =
require('@prisma/client');

const prisma =
new PrismaClient();





// ======================================
// OBTENER REGISTROS
// ======================================

async function obtenerRegistros(req, res){

    try{

        const registros =
            await prisma.registro.findMany({

                include:{

                    pedido:{

                        include:{

                            usuario:true,
                            producto:true

                        }

                    }

                },

                orderBy:{
                    id_registro:'desc'
                }

            });





        res.json(registros);

    }catch(error){

        console.log(error);

        res.status(500).json({

            ok:false,
            error:error.message

        });

    }

}





// ======================================
// LIMPIAR REGISTROS
// ======================================

async function limpiarRegistros(req, res){

    try{

        await prisma.registro.deleteMany();





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

    obtenerRegistros,
    limpiarRegistros

};