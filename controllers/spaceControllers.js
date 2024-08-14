const Space = require('../models/Space');
const asyncHandler = require('express-async-handler');
const NodeCache = require('node-cache');

// Simple in-memory cache with node-cache
const cache = new NodeCache({ stdTTL: 3600 }); // Cache time-to-live of 1 hour

// Middleware to check if space exists by ID
const checkSpaceExists = asyncHandler(async (req, res, next) => {
  const space = await Space.findById(req.params.id);
  if (!space || space.deleted) {
    return res.status(404).json({ message: 'Space not found' });
  }
  req.space = space; // Attach the found space to the request object
  next();
});

// Register (Create) a new Space
exports.registerSpace = asyncHandler(async (req, res) => {
  const { name, description, location, category } = req.body;

  // Input validation
  if (!name || !category) {
    return res.status(400).json({ message: 'Name and category are required' });
  }

  const newSpace = new Space({
    name,
    description,
    location,
    category
  });

  const savedSpace = await newSpace.save();
  res.status(201).json({ message: 'Space registered successfully', space: savedSpace });
});

// Get all Spaces with Advanced Querying and In-Memory Caching
exports.getAllSpaces = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, category, name, location } = req.query;

  const query = { deleted: false };
  if (category) query.category = category;
  if (name) query.name = { $regex: name, $options: 'i' };
  if (location) query.location = { $regex: location, $options: 'i' };

  // Check cache
  const cacheKey = `spaces:${page}:${limit}:${category || ''}:${name || ''}:${location || ''}`;
  const cachedSpaces = cache.get(cacheKey);

  if (cachedSpaces) {
    return res.status(200).json(cachedSpaces);
  }

  const spaces = await Space.find(query)
    .populate('followers', 'firstName lastName')
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const totalSpaces = await Space.countDocuments(query);

  const response = {
    totalSpaces,
    totalPages: Math.ceil(totalSpaces / limit),
    currentPage: parseInt(page),
    spaces
  };

  // Store result in cache
  cache.set(cacheKey, response);

  res.status(200).json(response);
});

// Get a single Space by ID
exports.getSpaceById = [
  checkSpaceExists,
  asyncHandler(async (req, res) => {
    const cacheKey = `space:${req.params.id}`;
    const cachedSpace = cache.get(cacheKey);

    if (cachedSpace) {
      return res.status(200).json(cachedSpace);
    }

    const space = await req.space.populate('followers', 'firstName lastName').execPopulate();

    // Cache the result
    cache.set(cacheKey, space);

    res.status(200).json(space);
  })
];

// Update a Space by ID
exports.updateSpace = [
  checkSpaceExists,
  asyncHandler(async (req, res) => {
    const { name, description, location, category, status } = req.body;

    // Only update provided fields
    if (name) req.space.name = name;
    if (description) req.space.description = description;
    if (location) req.space.location = location;
    if (category) req.space.category = category;
    if (status) req.space.status = status;

    const updatedSpace = await req.space.save();

    // Invalidate cache
    cache.del(`space:${req.params.id}`);

    res.status(200).json({ message: 'Space updated successfully', space: updatedSpace });
  })
];

// Soft Delete a Space by ID
exports.deleteSpace = [
  checkSpaceExists,
  asyncHandler(async (req, res) => {
    req.space.deleted = true;
    await req.space.save();

    // Invalidate cache
    cache.del(`space:${req.params.id}`);

    res.status(200).json({ message: 'Space deleted successfully' });
  })
];

// Restore a Soft Deleted Space by ID
exports.restoreSpace = [
  asyncHandler(async (req, res) => {
    const space = await Space.findById(req.params.id);
    if (!space || !space.deleted) {
      return res.status(404).json({ message: 'Space not found or not deleted' });
    }

    space.deleted = false;
    const restoredSpace = await space.save();

    res.status(200).json({ message: 'Space restored successfully', space: restoredSpace });
  })
];
