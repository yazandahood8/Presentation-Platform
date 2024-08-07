const express = require('express');
const router = express.Router();
const presentationsController = require('../controllers/presentationsController'); // Ensure this path is correct

// Define routes

// Create a new presentation
router.post('/presentations', presentationsController.createPresentation);

// Fetch a presentation by title
router.get('/presentations/:title', presentationsController.getPresentationByTitle);

// Add a slide to a presentation
router.post('/presentations/:title/slides', presentationsController.addSlide);

// Alter a slide
router.put('/presentations/:title/slides/:slideId', presentationsController.alterSlide);

// Alter the authors list
router.put('/presentations/:title/authors', presentationsController.alterAuthors);

// Delete a slide
router.delete('/presentations/:title/slides/:slideId', presentationsController.deleteSlide);

// Delete a presentation by either title or ID
router.delete('/presentations/:param', presentationsController.deletePresentation);

// Get all presentations
router.get('/presentations', presentationsController.getAllPresentations);

module.exports = router;
