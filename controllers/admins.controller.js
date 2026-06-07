// ======================================
// PRISMA
// ======================================

const { PrismaClient } =
require('@prisma/client');

const prisma =
new PrismaClient();





// ======================================
// OBTENER ADMIN PRINCIPAL
// ======================================

async function obtenerAdminPrincipal(req, res){

    try{

        const admin =
            await prisma.administrador.findFirst({

                where:{
                    principal:true
                },

                include:{
                    usuario:true
                },

                orderBy:{
                    id_admin:'desc'
                }

            });





        if(!admin){

            return res.status(404).json({

                ok:false,
                error:'No existe admin principal'

            });

        }





        res.json(admin);

    }catch(error){

        console.log(error);

        res.status(500).json({

            ok:false,
            error:error.message

        });

    }

}





// ======================================
// OBTENER ADMINS
// ======================================

async function obtenerAdmins(req, res){

    try{

        const admins =
            await prisma.administrador.findMany({

                include:{
                    usuario:true
                },

                orderBy:{
                    principal:'desc'
                }

            });





        res.json(admins);

    }catch(error){

        console.log(error);

        res.status(500).json({

            ok:false,
            error:error.message

        });

    }

}





// ======================================
// CREAR ADMIN
// ======================================

async function crearAdmin(req, res){

    try{

        // ======================================
        // VOLVER ADMIN AL USUARIO
        // ======================================

        await prisma.usuario.update({

            where:{
                id_usuarios:
                    parseInt(req.body.id_usuario)
            },

            data:{
                rol:'admin'
            }

        });





        // ======================================
        // CREAR ADMIN
        // ======================================

        const admin =
            await prisma.administrador.create({

                data:{

    id_usuario:
        parseInt(
            req.body.id_usuario
        ),

    ig:
        req.body.ig,

    num:
        req.body.num,

    app_pass:
        req.body.app_pass,

    principal:false

}

            });





        res.json(admin);

    }catch(error){

        console.log(error);

        res.status(500).json({

            ok:false,
            error:error.message

        });

    }

}





// ======================================
// EDITAR ADMIN
// ======================================

async function editarAdmin(req, res){

    try{

        const actualizado =
            await prisma.administrador.update({

                where:{
                    id_admin:
                        parseInt(req.params.id)
                },

                data:{

    ig:req.body.ig,

    num:req.body.num,

    app_pass:
        req.body.app_pass,

    usuario:{

                        update:{

                            nombre:
                                req.body.nombre

                        }

                    }

                }

            });





        res.json(actualizado);

    }catch(error){

        console.log(error);

        res.status(500).json({

            ok:false,
            error:error.message

        });

    }

}





// ======================================
// HACER ADMIN PRINCIPAL
// ======================================

async function hacerPrincipal(req, res){

    try{

        const id =
            parseInt(req.params.id);





        // ======================================
        // QUITAR PRINCIPAL A TODOS
        // ======================================

        await prisma.administrador.updateMany({

            data:{
                principal:false
            }

        });





        // ======================================
        // ACTIVAR NUEVO PRINCIPAL
        // ======================================

        const admin =
            await prisma.administrador.update({

                where:{
                    id_admin:id
                },

                data:{
                    principal:true
                }

            });





        res.json({

            ok:true,
            admin

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
// ELIMINAR ADMIN
// ======================================

async function eliminarAdmin(req, res){

    try{

        const id =
            parseInt(req.params.id);





        // ======================================
        // BUSCAR ADMIN
        // ======================================

        const admin =
            await prisma.administrador.findUnique({

                where:{
                    id_admin:id
                }

            });





        if(!admin){

            return res.status(404).json({

                ok:false,
                error:'Admin no encontrado'

            });

        }





        // ======================================
        // NO ELIMINAR PRINCIPAL
        // ======================================

        if(admin.principal){

            return res.status(400).json({

                ok:false,
                error:'No puedes eliminar el admin principal'

            });

        }





        // ======================================
        // VOLVER CLIENTE
        // ======================================

        await prisma.usuario.update({

            where:{
                id_usuarios:
                    admin.id_usuario
            },

            data:{
                rol:'cliente'
            }

        });





        // ======================================
        // ELIMINAR ADMIN
        // ======================================

        await prisma.administrador.delete({

            where:{
                id_admin:id
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

    obtenerAdminPrincipal,
    obtenerAdmins,
    crearAdmin,
    editarAdmin,
    hacerPrincipal,
    eliminarAdmin

};