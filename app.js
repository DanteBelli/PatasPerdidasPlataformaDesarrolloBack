import express from "express";
const app = express();
const port = 5000;
app.get("/", (request, response) =>
    {
        response.send("Prueba PatasPerdidas");
    });
app.listen(5000, () =>
    {
        console.log(`Puerto NRO ${port}`);
    }); 