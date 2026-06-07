// ======================================
// BCRYPT
// ======================================

const bcrypt =
require('bcrypt');





// ======================================
// PRISMA
// ======================================

const { PrismaClient } =
require('@prisma/client');

const prisma =
new PrismaClient();





// ======================================
// REGISTRO
// ======================================

async function registro(req, res){

    try{

        const {

            nombre,
            email,
            contrasena

        } = req.body;





        // ======================================
        // VERIFICAR SI YA EXISTE
        // ======================================

        const existe =
            await prisma.usuario.findUnique({

                where:{
                    email
                }

            });





        if(existe){

            return res.status(400).json({

                ok:false,
                error:'El correo ya existe'

            });

        }





        // ======================================
        // ENCRIPTAR CONTRASEÑA
        // ======================================

        const hash =
            await bcrypt.hash(

                contrasena,
                10

            );





        // ======================================
        // CREAR USUARIO
        // ======================================

        const usuario =
            await prisma.usuario.create({

                data:{

                    nombre,
                    email,

                    contrasena:hash,

                    rol:'cliente'

                }

            });





        res.json({

            ok:true,
            usuario

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
// LOGIN
// ======================================

async function login(req, res){

    try{

        const {

            email,
            contrasena

        } = req.body;





        // ======================================
        // BUSCAR USUARIO
        // ======================================

        const usuario =
            await prisma.usuario.findUnique({

                where:{
                    email
                }

            });





        // ======================================
        // NO EXISTE
        // ======================================

        if(!usuario){

            return res.status(400).json({

                ok:false,
                error:'Usuario no encontrado'

            });

        }





        // ======================================
        // VALIDAR PASSWORD
        // ======================================

        const valida =
            await bcrypt.compare(

                contrasena,
                usuario.contrasena

            );





        // ======================================
        // PASSWORD INCORRECTA
        // ======================================

        if(!valida){

            return res.status(400).json({

                ok:false,
                error:'Contraseña incorrecta'

            });

        }





        // ======================================
        // LOGIN CORRECTO
        // ======================================

        res.json({

            ok:true,

            usuario:{

                id:
                    usuario.id_usuarios,

                nombre:
                    usuario.nombre,

                email:
                    usuario.email,

                rol:
                    usuario.rol

            }

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

    registro,
    login

};