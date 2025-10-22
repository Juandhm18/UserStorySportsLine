import { z } from 'zod';
export declare const CreateClientDTO: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    address: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    document: z.ZodString;
}, z.core.$strip>;
export declare const UpdateClientDTO: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    address: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    document: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const ClientParamsDTO: z.ZodObject<{
    id: z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
}, z.core.$strip>;
export declare const ClientQueryDTO: z.ZodObject<{
    page: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
    limit: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
    search: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodOptional<z.ZodEnum<{
        name: "name";
        email: "email";
        document: "document";
        createdAt: "createdAt";
    }>>;
    sortOrder: z.ZodOptional<z.ZodEnum<{
        ASC: "ASC";
        DESC: "DESC";
    }>>;
}, z.core.$strip>;
export type CreateClientDTOType = z.infer<typeof CreateClientDTO>;
export type UpdateClientDTOType = z.infer<typeof UpdateClientDTO>;
export type ClientParamsDTOType = z.infer<typeof ClientParamsDTO>;
export type ClientQueryDTOType = z.infer<typeof ClientQueryDTO>;
export interface ClientResponseDTO {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    address: string | null;
    document: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface ClientListResponseDTO {
    clients: ClientResponseDTO[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
//# sourceMappingURL=client.dto.d.ts.map