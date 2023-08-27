export type SignInParams = {
    email: string;
    password: string;
}

export type SignUpParams = {
    name: string;
    email: string;
    password: string;
}

export type addToCartParams = {
    productId: string;
    
    quantity: number;
}

export type CreateProductParams = {
    image: string;
    
    title: string;

    price: number;

    stock: number;
}

export type UpdateProductParams = {
    image: string;
    
    title: string;

    price: number;

    stock: number;
}

