import app from "./app";

const port = process.env.PORT

async function server() {
    try {
        app.listen(port, () => {
            console.log(`Server is running at ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

server()