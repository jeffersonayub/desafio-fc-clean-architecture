import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for products", () => {
    beforeEach( async () => {
        await sequelize.sync({ force: true });
    });

    afterAll( async () => {
        await sequelize.close();
    });

    it("should list all products", async () => {
        const response1 = await request(app)
                .post("/product")
                .send({
                    name: "Product 1",
                    price: 1,
                });
        expect(response1.status).toBe(200);
        const response2 = await request(app)
                .post("/product")
                .send({
                    name: "Product 2",
                    price: 2,
                });
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/product").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);
        expect(listResponse.body.products).toMatchObject([{
                name: "Product 1",
                price: 1,
            },{
                name: "Product 2",
                price: 2,
            }]); 
    });

})