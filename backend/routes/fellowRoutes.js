import express from 'express';
import Fellow from '../models/Fellow.js';

const router = express.Router();

// GET all fellows
router.get('/', async (req, res) => {
  const fellows = await Fellow.find();
  res.json(fellows);
});

// POST a new fellow
router.post('/', async (req, res) => {
  const { name, email, year } = req.body;
  const newFellow = new Fellow({ name, email, year });
  await newFellow.save();
  res.status(201).json(newFellow);
});

// GET fellow by ID
router.get('/:id', async (req, res) => {
  const fellow = await Fellow.findById(req.params.id);
  res.json(fellow);
});

// PUT update fellow
router.put('/:id', async (req, res) => {
  const updated = await Fellow.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE fellow
router.delete('/:id', async (req, res) => {
  await Fellow.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
