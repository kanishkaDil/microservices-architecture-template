const express = require('express');
const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());

// In-memory storage
let checklists = [];
let idCounter = 1;

// GET all checklists
app.get('/api/checklist', (req, res) => {
  res.json({
    success: true,
    data: checklists
  });
});

// GET single checklist by ID
app.get('/api/checklists/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const checklist = checklists.find(c => c.id === id);
  
  if (!checklist) {
    return res.status(404).json({
      success: false,
      message: 'Checklist not found'
    });
  }
  
  res.json({
    success: true,
    data: checklist
  });
});

// POST create new checklist
app.post('/api/checklists', (req, res) => {
  const { title, items } = req.body;
  
  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'Title is required'
    });
  }
  
  const newChecklist = {
    id: idCounter++,
    title,
    items: items || [],
    createdAt: new Date().toISOString()
  };
  
  checklists.push(newChecklist);
  
  res.status(201).json({
    success: true,
    data: newChecklist
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});