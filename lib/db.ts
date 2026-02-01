import mongoose from 'mongoose';
import { ConnectOptions } from 'mongoose';
declare global {
    var mongoose: any;
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        throw new Error(
            'Please define the MONGODB_URI environment variable inside .env',
        );
    }

    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts: ConnectOptions = {
            bufferCommands: false,
            maxPoolSize: 10,
            minPoolSize: 2,
            socketTimeoutMS: 45000,
            serverSelectionTimeoutMS: 10000,
            family: 4,
        };
        cached.promise = mongoose
            .connect(MONGODB_URI, opts)
            .then((mongoose) => {
                return mongoose;
            });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export const dbClient = connectDB();
