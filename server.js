const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Dossier pour stocker les fichiers uploadés
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

// Endpoint pour upload
app.post('/upload', upload.single('media'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Aucun fichier téléchargé.');
  }

  // On renomme le fichier avec son vrai nom
  const ext = path.extname(req.file.originalname);
  const newPath = path.join('uploads', req.file.filename + ext);

  fs.renameSync(req.file.path, newPath);
  res.redirect('/');
});

// Endpoint pour récupérer la liste des fichiers
app.get('/files', (req, res) => {
  fs.readdir('uploads', (err, files) => {
    if (err) return res.status(500).send('Erreur lecture fichiers');
    res.json(files);
  });
});

// Dossier uploads statique
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
