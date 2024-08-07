const mongoose = require('mongoose');

// Slide schema definition
const SlideSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId, // Custom ObjectId for each slide
        auto: true
    },
    title: {
        type: String,
        required: [true, 'Slide title is required'] // Ensure each slide has a title
    },
    content: {
        type: String,
        required: [true, 'Slide content is required'] // Ensure each slide has content
    }
});

// Custom validation function for the authors array
function arrayLimit(val) {
    return val.length > 0; // Ensure the array has at least one element
}

// Presentation schema definition
const PresentationSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true, // Ensure the title is unique across all presentations
        required: [true, 'Presentation title is required'] // Ensure the title field is mandatory
    },
    authors: {
        type: [String], // Array of strings for authors
        validate: {
            validator: arrayLimit,
            message: 'At least one author is required'
        }
    },
    publishDate: {
        type: Date,
        default: Date.now, // Default to the current date if not provided
        required: [true, 'Publish date is required'] // Ensure the publish date field is mandatory
    },
    slides: [SlideSchema] // Array of slides associated with the presentation
});

// Export the Presentation model
module.exports = mongoose.model('Presentation', PresentationSchema);
