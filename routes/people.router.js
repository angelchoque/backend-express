const express = require('express');

const router = express.Router()

router.get('/people', (req, res) => {
  res.json([{
      name: 'Arturo',
      type: 'employee'
  }, {
      name: 'Jimena',
      type: 'customer'
  }]);
});

router.get('/people/:id', (req, res) => {
  const { id } = req.params;
  res.json({
      id,
      name: 'Arturo',
      type: 'employee'
  });
});

module.exports = router;
