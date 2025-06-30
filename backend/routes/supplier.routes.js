const express = require('express');
const router = express.Router();

//ajouter les routes plus tard ici
router.get('/', (req, res) => {
  res.send('Suppliers route ok');
});

module.exports = router;
