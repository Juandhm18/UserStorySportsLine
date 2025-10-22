import { Model } from 'sequelize';
declare class Product extends Model {
    id: number;
    code: string;
    name: string;
    price: number;
    stock: number;
}
export default Product;
//# sourceMappingURL=product.model.d.ts.map