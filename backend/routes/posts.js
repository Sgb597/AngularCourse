const express = require('express');
const multer = require('multer');
const Post = require('../models/post');
const router = express.Router();
const postController = require('../controllers/post');
const checkAuth = require('../middleware/check-auth');
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid MIME type');
    if (isValid) {
      error = null;
    }
    cb(error, 'backend/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

// Protected Post path
router.post('', checkAuth, multer({storage: storage}).single('image'), postController.createPost);

// Protected Edit path
router.put(
  "/:id",
  checkAuth,
  multer({ storage: storage }).single("image"),
  postController.updatePost
);

router.get('', postController.getPosts);

router.get('/:id', postController.getPost);

// Protected Delete path
router.delete('/:id', checkAuth, postController.deletePost)

module.exports = router;
