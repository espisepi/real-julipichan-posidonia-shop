import { Entity } from "@/types";

export type ICreateProductFormData = Entity & {
    title: string;
    description: string;
    slug: string;
    tags: string[]; // Hacerlo PK con la tabla de tags
    price: number;
    inStock: number;
    images: string[];
    scene: string; // URL to model 3D Scene to load with gltfLoader threejs
}