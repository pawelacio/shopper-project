export class Product {

    public _id: string;
    public name: string;
    public type: string;
    public amount: number;
    public price: number;
    public description: string;
    public availability: boolean;

    constructor(_id: string, name: string, type: string, amount: number, price: number, description: string, availability: boolean) {
        this._id = _id;
        this.name = name;
        this.type = type;
        this.amount = amount;
        this.price = price;
        this.description = description;
        this.availability = availability;
    }
}
