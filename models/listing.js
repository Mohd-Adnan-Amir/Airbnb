const { ref } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review.js');

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
            default: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxha2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
            set: (v) =>
                v === "" ? "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxha2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" : v,
        
    },



    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});


listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}})
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
//this contain the whole model of listing that means structure or schema of database model