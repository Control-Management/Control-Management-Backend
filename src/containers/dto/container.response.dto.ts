export class ContainerResponseDTO{
    id: number;
    name: string;
    description: string;
    quantity: number;
    type: string;
    user: {
        id: number;
        username: string;
    }

    constructor(id: number, name: string, description: string, quantity: number, type: string, user: {id: number, username: string}){ 
        this.id = id;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.type = type;
        this.user = user;
    }
}