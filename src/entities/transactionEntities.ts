export class TransactionEntities {
  constructor(
    public id: string,
    public userId: string,
    public type: "purchase" | "refund" | "deposit" | "withdrawal"|"advancepay"|"payment"|"credited",
    public amount: number,
    public status: "complete" | "pending" | "failed" = "pending",
    public paymentMethod: "razorpay" | "wallet" | "cod",
    public serviceType: "service" | "product"|"add",
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
