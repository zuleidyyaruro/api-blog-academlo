const passport = require('passport');
const router = require('express').Router();
const postsServices = require('./posts.https');
const middlewareRole = require('../middleware/adminRole');

router.get('/', postsServices.getAllPostsService);
router.get('/:id', postsServices.getPostByIdService);
router.post('/', passport.authenticate('jwt', {session: false}), postsServices.createPostService);
router.put('/:id', passport.authenticate('jwt', {session: false}), postsServices.editPostService);
router.delete('/:id', passport.authenticate('jwt', {session: false}), postsServices.deletePostService);

module.exports = {router};
