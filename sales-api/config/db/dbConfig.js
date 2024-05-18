import {MongoClient} from "mongodb"

const clientMongoDB = new MongoClient(process.env.MONGODB_URI,{
    loadBalanced: true,
    writeConcern: {
        w: "majority",
        j: true,
        wtimeoutMS: 1000
    },
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

export default async function connectMongoDB() {
    try {
        await clientMongoDB.connect();
        console.log("MongoDB connected");
        clientMongoDB.db("sales").createCollection("sales");
    } catch (error) {
        console.log(error);
    }
}

