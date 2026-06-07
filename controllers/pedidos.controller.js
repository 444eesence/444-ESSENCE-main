// ======================================
// SERVICIO CORREO
// ======================================

const {

    enviarCorreoPedido

} = require('../servicios/correo.servicio');

// ======================================
// PRISMA
// ======================================

const { PrismaClient } =
require('@prisma/client');

const prisma =
new PrismaClient();





// ======================================
// OBTENER PEDIDOS
// ======================================

async function obtenerPedidos(req, res){

    try{

        const pedidos =
            await prisma.pedido.findMany({

                include:{

                    usuario:true,
                    producto:true

                },

                orderBy:{
                    id_pedidos:'desc'
                }

            });





        res.json(pedidos);

    }catch(error){

        console.log(error);

        res.status(500).json({

            ok:false,
            error:error.message

        });

    }

}





// ======================================
// CREAR PEDIDO
// ======================================

async function crearPedido(req, res){

    try{

        const {

            id_usuarios,
            id_productos,

            cantidad,

            tipo_producto,

            precio_final,

            telefono,
            direccion,
            referencias,

            mililitros_decan

        } = req.body;





        // ======================================
        // BUSCAR PRODUCTO
        // ======================================

        const producto =
            await prisma.producto.findUnique({

                where:{
                    id_productos
                }

            });





        // ======================================
        // PRODUCTO NO EXISTE
        // ======================================

        if(!producto){

            return res.status(404).json({

                ok:false,
                error:'Producto no encontrado'

            });

        }





        // ======================================
        // VALIDAR STOCK PERFUME
        // ======================================

        if(tipo_producto === 'Perfume Completo'){

            if(producto.stock < cantidad){

                return res.status(400).json({

                    ok:false,
                    error:'Stock insuficiente'

                });

            }

        }





        // ======================================
        // VALIDAR STOCK 5ML
        // ======================================

        if(tipo_producto === 'Decant 5ML'){

            if(producto.stock_decant_5ml < cantidad){

                return res.status(400).json({

                    ok:false,
                    error:'Stock 5ML insuficiente'

                });

            }

        }





        // ======================================
        // VALIDAR STOCK 10ML
        // ======================================

        if(tipo_producto === 'Decant 10ML'){

            if(producto.stock_decant_10ml < cantidad){

                return res.status(400).json({

                    ok:false,
                    error:'Stock 10ML insuficiente'

                });

            }

        }





        // ======================================
        // CREAR PEDIDO
        // ======================================

        const pedido =
            await prisma.pedido.create({

                data:{

                    id_usuarios,
                    id_productos,

                    cantidad,

                    tipo_producto,

                    precio_final,

                    telefono,
                    direccion,
                    referencias,

                    mililitros_decan:
                        mililitros_decan || '',

                    estado:true

                },

                include:{

                    usuario:true,
                    producto:true

                }

            });





        // ======================================
        // DESCONTAR STOCK PERFUME
        // ======================================

        if(tipo_producto === 'Perfume Completo'){

            await prisma.producto.update({

                where:{
                    id_productos
                },

                data:{

                    stock:{
                        decrement:cantidad
                    }

                }

            });

        }





        // ======================================
        // DESCONTAR STOCK 5ML
        // ======================================

        if(tipo_producto === 'Decant 5ML'){

            await prisma.producto.update({

                where:{
                    id_productos
                },

                data:{

                    stock_decant_5ml:{
                        decrement:cantidad
                    }

                }

            });

        }





        // ======================================
        // DESCONTAR STOCK 10ML
        // ======================================

        if(tipo_producto === 'Decant 10ML'){

            await prisma.producto.update({

                where:{
                    id_productos
                },

                data:{

                    stock_decant_10ml:{
                        decrement:cantidad
                    }

                }

            });

        }





        // ======================================
        // CREAR REGISTRO
        // ======================================

        await prisma.registro.create({

            data:{

                id_pedido:
                    pedido.id_pedidos

            }

        });

await enviarCorreoPedido({

    pedido,

    telefono,
    direccion,
    referencias,

    tipo_producto,

    cantidad,

    precio_final

});



        // ======================================
        // RESPUESTA
        // ======================================

        res.json({

            ok:true,
            pedido

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
// MARCAR ENVIADO
// ======================================

async function marcarEnviado(req, res){

    try{

        const id =
            parseInt(req.params.id);





        // ======================================
        // ACTUALIZAR ESTADO
        // ======================================

        await prisma.pedido.update({

            where:{
                id_pedidos:id
            },

            data:{
                estado:false
            }

        });





        // ======================================
        // CREAR REGISTRO
        // ======================================

        await prisma.registro.create({

            data:{

                id_pedido:id

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
// CANCELAR PEDIDO
// ======================================

async function cancelarPedido(req, res){

    try{

        const id =
            parseInt(req.params.id);





        // ======================================
        // BUSCAR PEDIDO
        // ======================================

        const pedido =
            await prisma.pedido.findUnique({

                where:{
                    id_pedidos:id
                }

            });





        // ======================================
        // PEDIDO NO EXISTE
        // ======================================

        if(!pedido){

            return res.status(404).json({

                ok:false,
                error:'Pedido no encontrado'

            });

        }





        // ======================================
        // DEVOLVER STOCK PERFUME
        // ======================================

        if(pedido.tipo_producto === 'Perfume Completo'){

            await prisma.producto.update({

                where:{
                    id_productos:
                        pedido.id_productos
                },

                data:{

                    stock:{
                        increment:pedido.cantidad
                    }

                }

            });

        }





        // ======================================
        // DEVOLVER STOCK 5ML
        // ======================================

        if(pedido.tipo_producto === 'Decant 5ML'){

            await prisma.producto.update({

                where:{
                    id_productos:
                        pedido.id_productos
                },

                data:{

                    stock_decant_5ml:{
                        increment:pedido.cantidad
                    }

                }

            });

        }





        // ======================================
        // DEVOLVER STOCK 10ML
        // ======================================

        if(pedido.tipo_producto === 'Decant 10ML'){

            await prisma.producto.update({

                where:{
                    id_productos:
                        pedido.id_productos
                },

                data:{

                    stock_decant_10ml:{
                        increment:pedido.cantidad
                    }

                }

            });

        }





        // ======================================
        // ELIMINAR REGISTROS
        // ======================================

        await prisma.registro.deleteMany({

            where:{
                id_pedido:id
            }

        });





        // ======================================
        // ELIMINAR PEDIDO
        // ======================================

        await prisma.pedido.delete({

            where:{
                id_pedidos:id
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

    obtenerPedidos,
    crearPedido,
    marcarEnviado,
    cancelarPedido

};