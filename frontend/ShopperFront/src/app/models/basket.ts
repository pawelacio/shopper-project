export class Basket {

    public _id: string;
    public buyer: string;
    public totalCost: number;
    public date: Date;
    public paymentDate: Date;
    public status;
    public products;

    constructor(_id: string, buyer: string, totalCost: number, date: Date, paymentDate: Date, status, products) {
        this._id = _id;
        this.buyer = buyer;
        this.totalCost = totalCost;
        this.date = date;
        this.paymentDate = paymentDate;
        this.status = status;
        this.products = products;
    }
}
