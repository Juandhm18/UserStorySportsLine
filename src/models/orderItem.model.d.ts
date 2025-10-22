import { Model } from 'sequelize';
declare class OrderItem extends Model {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    subtotal: number;
}
export default OrderItem;
//# sourceMappingURL=orderItem.model.d.ts.map