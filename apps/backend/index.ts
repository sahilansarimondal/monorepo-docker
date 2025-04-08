import express from "express";
import { prismaClient } from "db/client"

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello from backend!");
});

app.get("/users", async (req, res) => {
    try {
        const users = await prismaClient.user.findMany();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post("/users", async (req, res) => {
    try {
        const {username, password} = req.body;
        if(!username || !password) {
            res.status(400).send("Missing username or password");
            return;
        }
    
        const user = await prismaClient.user.create({
            data: {
                username,
                password
            }
        });
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
})


app.listen(8080, () => {
    console.log("Backend is running on port 8080");
});


