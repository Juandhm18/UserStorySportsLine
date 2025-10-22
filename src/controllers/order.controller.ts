import { Request, Response } from 'express';
import OrderService from '../services/order.service';
import { CreateOrderDTOType, UpdateOrderDTOType, OrderParamsDTOType, OrderQueryDTOType } from '../dto/order.dto';

class OrderController {
    async create(req: Request, res: Response) {
        try {
            const orderData: CreateOrderDTOType = req.body;
            
            // Agregar el userId del usuario autenticado
            const userId = (req as any).user?.id;
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: 'Usuario no autenticado'
                });
            }

            const orderWithUser = {
                ...orderData,
                userId
            };

            const order = await OrderService.create(orderWithUser);

            res.status(201).json({
                success: true,
                message: 'Pedido creado exitosamente',
                data: order
            });
        } catch (error: any) {
            if (error.message.includes('Stock insuficiente') || 
                error.message.includes('no encontrado') ||
                error.message.includes('Debe incluir')) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }

            res.status(500).json({
                success: false,
                message: 'Error al crear pedido: ' + error.message
            });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const queryParams = req.query as unknown as OrderQueryDTOType;
            const orders = await OrderService.getAll(queryParams);
            
            res.status(200).json({
                success: true,
                message: 'Pedidos obtenidos exitosamente',
                data: orders
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener pedidos: ' + error.message
            });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params as unknown as OrderParamsDTOType;
            const order = await OrderService.getById(id);

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Pedido no encontrado'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Pedido obtenido exitosamente',
                data: order
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener pedido: ' + error.message
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params as unknown as OrderParamsDTOType;
            const orderData: UpdateOrderDTOType = req.body;
            
            const order = await OrderService.update(id, orderData);

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Pedido no encontrado'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Pedido actualizado exitosamente',
                data: order
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error al actualizar pedido: ' + error.message
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params as unknown as OrderParamsDTOType;
            const deleted = await OrderService.delete(id);

            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Pedido no encontrado'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Pedido eliminado exitosamente'
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error al eliminar pedido: ' + error.message
            });
        }
    }

    async getOrdersByClient(req: Request, res: Response) {
        try {
            const { clientId } = req.params;
            const orders = await OrderService.getOrdersByClient(parseInt(clientId!));
            
            res.status(200).json({
                success: true,
                message: 'Pedidos del cliente obtenidos exitosamente',
                data: orders
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener pedidos del cliente: ' + error.message
            });
        }
    }

    async getOrdersByProduct(req: Request, res: Response) {
        try {
            const { productId } = req.params;
            const orders = await OrderService.getOrdersByProduct(parseInt(productId!));
            
            res.status(200).json({
                success: true,
                message: 'Pedidos del producto obtenidos exitosamente',
                data: orders
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener pedidos del producto: ' + error.message
            });
        }
    }

    async cancelOrder(req: Request, res: Response) {
        try {
            const { id } = req.params as unknown as OrderParamsDTOType;
            const order = await OrderService.cancelOrder(id);

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Pedido no encontrado'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Pedido cancelado exitosamente',
                data: order
            });
        } catch (error: any) {
            if (error.message.includes('Solo se pueden cancelar')) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }

            res.status(500).json({
                success: false,
                message: 'Error al cancelar pedido: ' + error.message
            });
        }
    }

    async confirmOrder(req: Request, res: Response) {
        try {
            const { id } = req.params as unknown as OrderParamsDTOType;
            const order = await OrderService.confirmOrder(id);

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Pedido no encontrado'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Pedido confirmado exitosamente',
                data: order
            });
        } catch (error: any) {
            if (error.message.includes('Solo se pueden confirmar')) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }

            res.status(500).json({
                success: false,
                message: 'Error al confirmar pedido: ' + error.message
            });
        }
    }

    async deliverOrder(req: Request, res: Response) {
        try {
            const { id } = req.params as unknown as OrderParamsDTOType;
            const order = await OrderService.deliverOrder(id);

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Pedido no encontrado'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Pedido entregado exitosamente',
                data: order
            });
        } catch (error: any) {
            if (error.message.includes('Solo se pueden entregar')) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }

            res.status(500).json({
                success: false,
                message: 'Error al entregar pedido: ' + error.message
            });
        }
    }
}

export default new OrderController();
