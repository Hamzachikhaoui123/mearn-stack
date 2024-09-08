import mongosse from "mongoose"
export const connectDB=async ()=>{
    try {
        const conn=await mongosse.connect(process.env.MONGOURL);
        console.log(`MongoDB Connected:${conn.connection.host}`);
        
    } catch (error) {
        console.error(`Error : ${error.message}`);
        process.exit(1);
    }
}