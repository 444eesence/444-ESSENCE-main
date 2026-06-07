// ======================================
// PRISMA
// ======================================

const { PrismaClient } =
require('@prisma/client');

const prisma =
new PrismaClient();





// ======================================
// OBTENER TODOS LOS PRODUCTOS
// ======================================

async function obtenerProductos(req, res){

    try{

        const productos =
            await prisma.producto.findMany();

        res.json(productos);

    }catch(error){

        console.log(error);

        res.status(500).json({

            ok:false,
            error:error.message

        });

    }

}





// ======================================
// OBTENER PRODUCTO POR ID
// ======================================

async function obtenerProducto(req, res){

    try{

        const producto =
            await prisma.producto.findUnique({

                where:{

                    id_productos:
                        parseInt(req.params.id)

                }

            });





        res.json(producto);

    }catch(error){

        console.log(error);

        res.status(500).json({

            ok:false,
            error:error.message

        });

    }

}





// ======================================
// CREAR PRODUCTO
// ======================================

async function crearProducto(req, res){

    try{

        // ======================================
        // VERIFICAR DUPLICADO
        // ======================================

        const existe =

            await prisma.producto.findFirst({

                where:{

                    nombre:
                        req.body.nombre

                }

            });





        if(existe){

            return res.status(400).json({

                ok:false,

                error:
                    'Ya existe un producto con ese nombre'

            });

        }





        const nuevoProducto =
            await prisma.producto.create({

                data:{

                    nombre:
                        req.body.nombre,

                    marca:
                        req.body.marca,

                    precio:
                        req.body.precio,

                    stock:
                        req.body.stock,

                    imagen_url:
                        req.body.imagen_url || '',

                    categoria:
                        req.body.categoria,

                    genero:
                        req.body.genero,

                    descripcion:
                        req.body.descripcion || '',

                    es_decant:
                        req.body.es_decant,

                    precio_decant_5ml:
                        req.body.precio_decant_5ml,

                    precio_decant_10ml:
                        req.body.precio_decant_10ml,

                    stock_decant_5ml:
                        req.body.stock_decant_5ml,

                    stock_decant_10ml:
                        req.body.stock_decant_10ml

                }

            });





        res.json({

            ok:true,
            producto:nuevoProducto

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
// ACTUALIZAR PRODUCTO
// ======================================

async function actualizarProducto(req, res){

    try{

        const producto =
            await prisma.producto.update({

                where:{

                    id_productos:
                        parseInt(req.params.id)

                },

                data:{

                    nombre:
                        req.body.nombre,

                    marca:
                        req.body.marca,

                    precio:
                        req.body.precio,

                    stock:
                        req.body.stock,

                    imagen_url:
                        req.body.imagen_url,

                    categoria:
                        req.body.categoria,

                    genero:
                        req.body.genero,

                    descripcion:
                        req.body.descripcion,

                    es_decant:
                        req.body.es_decant,

                    precio_decant_5ml:
                        req.body.precio_decant_5ml,

                    precio_decant_10ml:
                        req.body.precio_decant_10ml,

                    stock_decant_5ml:
                        req.body.stock_decant_5ml,

                    stock_decant_10ml:
                        req.body.stock_decant_10ml

                }

            });





        res.json({

            ok:true,
            producto

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
// ELIMINAR PRODUCTO
// ======================================

async function eliminarProducto(req, res){

    try{

        const id =
            parseInt(req.params.id);





        // ======================================
        // ELIMINAR REGISTROS
        // ======================================

        await prisma.registro.deleteMany({

            where:{

                pedido:{
                    id_productos:id
                }

            }

        });





        // ======================================
        // ELIMINAR PEDIDOS
        // ======================================

        await prisma.pedido.deleteMany({

            where:{
                id_productos:id
            }

        });





        // ======================================
        // ELIMINAR PRODUCTO
        // ======================================

        await prisma.producto.delete({

            where:{
                id_productos:id
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
// EXPORTAR FUNCIONES
// ======================================

module.exports = {

    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto

};