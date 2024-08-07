const Presentation = require('../models/Presentation');
const mongoose = require('mongoose');

// Create a new presentation
exports.createPresentation = async (req, res) => {
    const { title, authors, publishDate } = req.body;

    // Check for missing required fields
    if (!title || !authors || !publishDate) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const presentation = new Presentation({
            title,
            authors,
            publishDate,
            slides: [] // Initialize slides as an empty array
        });

        await presentation.save();
        res.status(201).json({ message: 'Presentation created successfully', data: presentation });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Fetch a presentation by title
exports.getPresentationByTitle = async (req, res) => {
    try {
        const presentation = await Presentation.findOne({ title: req.params.title });
        if (!presentation) {
            return res.status(404).json({ error: 'Presentation not found' });
        }
        res.json(presentation);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Add a slide to a presentation
exports.addSlide = async (req, res) => {
    try {
        const presentation = await Presentation.findOne({ title: req.params.title });

        if (!presentation) {
            return res.status(404).json({ error: 'Presentation not found' });
        }
       

        // Create a new slide with a custom ObjectId
        const newSlide = {
            _id: new mongoose.Types.ObjectId(), // Create a new ObjectId for the slide
            title: req.body.title,
            content: req.body.content
        };

        presentation.slides.push(newSlide);
        await presentation.save();

        res.status(200).json({ message: 'Slide added successfully', presentation });
    } catch (error) {
        res.status(400).json({ error: 'Error adding slide', details: error.message });
    }
};

// Alter a slide
exports.alterSlide = async (req, res) => {
    try {
        // Find the presentation with the given title
        const presentation = await Presentation.findOne({ title: req.params.title });
        if (!presentation) {
            return res.status(404).json({ error: 'Presentation not found' });
        }

        // Find the slide to update
        const slide = presentation.slides.id(req.params.slideId);
        if (!slide) {
            return res.status(404).json({ error: 'Slide not found' });
        }

        // Update slide details while preserving the ID
        slide.title = req.body.title || slide.title;
        slide.content = req.body.content || slide.content;

        // Save the updated presentation
        await presentation.save();

        res.json({ message: 'Slide updated successfully', presentation });
    } catch (error) {
        res.status(400).json({ error: 'Error updating slide', details: error.message });
    }
};

// Alter the authors list
exports.alterAuthors = async (req, res) => {
    try {
        // Find and update the presentation's authors list
        const presentation = await Presentation.findOneAndUpdate(
            { title: req.params.title },
            { authors: req.body.authors },
            { new: true }
        );
        if (!presentation) {
            return res.status(404).json({ error: 'Presentation not found' });
        }
        res.json(presentation);
    } catch (error) {
        res.status(400).json({ error: 'Error updating authors', details: error.message });
    }
};

// Delete a slide
exports.deleteSlide = async (req, res) => {
    try {
        // Find and update the presentation, removing the specified slide
        const presentation = await Presentation.findOneAndUpdate(
            { title: req.params.title },
            { $pull: { slides: { _id: req.params.slideId } } },
            { new: true }
        );
        if (!presentation) {
            return res.status(404).json({ error: 'Presentation or slide not found' });
        }
        res.json(presentation);
    } catch (error) {
        res.status(500).json({ error: 'Error deleting slide', details: error.message });
    }
};

// Delete a presentation
// Delete a presentation
exports.deletePresentation = async (req, res) => {
    try {
        const param = req.params.param;
        let query;

        // Check if the param is a valid ObjectId
        if (mongoose.Types.ObjectId.isValid(param)) {
            query = { _id: param };
        } else {
            query = { title: param };
        }

        const presentation = await Presentation.findOneAndDelete(query);

        if (!presentation) {
            return res.status(404).json({ error: 'Presentation not found' });
        }

        res.json({ message: 'Presentation deleted successfully', data: presentation });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};
// Get all presentations
exports.getAllPresentations = async (req, res) => {
    try {
        // Fetch all presentations
        const presentations = await Presentation.find({});
        res.json(presentations);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};
