export interface Product {
    id: number;
    isUploaded: boolean;
    title: string;
    brand: string;
    buyPrice: number;
    photos?: any;
    url: string;
    productCategory: string;
    detailedDescription: string;
}

export interface ProductUpload{
    id: number;
    isUploaded: boolean;
}