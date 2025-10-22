import { Request, Response } from 'express';
import OrderService from '../services/order.service';
import { CreateOrderDTOType, UpdateOrderDTOType, OrderParamsDTOType, OrderQueryDTOType } from '../dto/order.dto';
import { ResponseUtil } from '../utils/response.util';
import { MESSAGES } from '../constants/messages';

class OrderController {
    async create(req: Request, res: Response) {
        try {
            const orderData: CreateOrderDTOType = req.body;
            
            // Agregar el userId del usuario autenticado
            const userId = (req as any).user?.id;
            if (!userId) {
                return ResponseUtil.unauthorized(res, 'Usuario no autenticado');
            }

            const orderWithUser = {
                ...orderData,
                userId
            } as any;

            const order = await OrderService.create(orderWithUser);

            ResponseUtil.created(res, MESSAGES.SUCCESS.ORDER_CREATED, order);
        } catch (error: any) {
            if (error.message.includes('Stock insuficiente') || 
                error.message.includes('no encontrado') ||
                error.message.includes('Debe incluir')) {
                return ResponseUtil.error(res, error.message, 400);
            }

            ResponseUtil.internalError(res, `Error al crear pedido: ${error.message}`);
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const queryParams = req.query as any;
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
            const orderData: any = req.body;
            
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

    async getOrdersByStatus(req: Request, res: Response) {
        try {
            const { status } = req.params;
            const orders = await OrderService.getOrdersByStatus(status!);
            
            res.status(200).json({
                success: true,
                message: `Pedidos con estado ${status} obtenidos exitosamente`,
                data: orders
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener pedidos por estado: ' + error.message
            });
        }
    }

    async getOrderHistory(req: Request, res: Response) {
        try {
            const userId = (req as any).user?.id;
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: 'Usuario no autenticado'
                });
            }

            const queryParams = {
                ...req.query as any,
                userId
            } as any;
            
            const orders = await OrderService.getAll(queryParams);
            
            res.status(200).json({
                success: true,
                message: 'Historial de pedidos obtenido exitosamente',
                data: orders
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener historial de pedidos: ' + error.message
            });
        }
    }

    async getOrderStatistics(req: Request, res: Response) {
        try {
            const { status } = req.query;
            
            let orders;
            if (status) {
                orders = await OrderService.getOrdersByStatus(status as string);
            } else {
                const allOrders = await OrderService.getAll({ limit: 1000 });
                orders = allOrders.orders;
            }

            // Calcular estadísticas
            const totalOrders = orders.length;
            const totalValue = orders.reduce((sum, order) => sum + order.total, 0);
            const averageOrderValue = totalOrders > 0 ? totalValue / totalOrders : 0;
            
            const statusCounts = orders.reduce((acc, order) => {
                acc[order.status] = (acc[order.status] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            const statistics = {
                totalOrders,
                totalValue,
                averageOrderValue: Math.round(averageOrderValue * 100) / 100,
                statusCounts,
                topProducts: this.calculateTopProducts(orders)
            };

            res.status(200).json({
                success: true,
                message: 'Estadísticas de pedidos obtenidas exitosamente',
                data: statistics
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener estadísticas: ' + error.message
            });
        }
    }

    private calculateTopProducts(orders: any[]): Array<{ productId: number; productName: string; totalQuantity: number; totalValue: number }> {
        const productStats = new Map<number, { name: string; quantity: number; value: number }>();

        orders.forEach(order => {
            order.items.forEach((item: any) => {
                const existing = productStats.get(item.productId);
                if (existing) {
                    existing.quantity += item.quantity;
                    existing.value += item.subtotal;
                } else {
                    productStats.set(item.productId, {
                        name: item.product.name,
                        quantity: item.quantity,
                        value: item.subtotal
                    });
                }
            });
        });

        return Array.from(productStats.entries())
            .map(([productId, stats]) => ({
                productId,
                productName: stats.name,
                totalQuantity: stats.quantity,
                totalValue: stats.value
            }))
            .sort((a, b) => b.totalQuantity - a.totalQuantity)
            .slice(0, 10);
    }
}

export default new OrderController();
