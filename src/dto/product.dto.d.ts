import { z } from 'zod';
export declare const CreateProductDTO: z.ZodObject<{
    code: z.ZodString;
    name: z.ZodString;
    price: z.ZodNumber;
    stock: z.ZodNumber;
}, z.core.$strip>;
export declare const UpdateProductDTO: z.ZodObject<{
    code: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    stock: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const ProductParamsDTO: z.ZodObject<{
    id: z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
}, z.core.$strip>;
export declare const ProductQueryDTO: z.ZodObject<{
    page: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
    limit: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
    search: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodOptional<z.ZodEnum<{
        name: "name";
        price: "price";
        stock: "stock";
        createdAt: "createdAt";
    }>>;
    sortOrder: z.ZodOptional<z.ZodEnum<{
        ASC: "ASC";
        DESC: "DESC";
    }>>;
}, z.core.$strip>;
export type CreateProductDTOType = z.infer<typeof CreateProductDTO>;
export type UpdateProductDTOType = z.infer<typeof UpdateProductDTO>;
export type ProductParamsDTOType = z.infer<typeof ProductParamsDTO>;
export type ProductQueryDTOType = z.infer<typeof ProductQueryDTO>;
export interface ProductResponseDTO {
    id: number;
    code: string;
    name: string;
    price: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface ProductListResponseDTO {
    products: ProductResponseDTO[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
//# sourceMappingURL=product.dto.d.ts.map