import mongooose from "mongoose"

const tourSchema = mongooose.Schema({
    title:String,
    description: String,
    name: String,
    creator: String,
    tags: [String],
    imageFile: String,
    createdAt:{
        type:Date,
        default: new Date(),        
    },
    likes: { type: [String], default: [] },  // PUTTING NUMBER INSTEAD OF STRING IS WE ARE SAVING USER's ID
});

export const TourModal = mongooose.model("places",tourSchema);

export default TourModal;