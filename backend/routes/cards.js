const router = require('express').Router();
const {
  getAllCards,
  deleteCard,
  postCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  validatePostCard,
  validateCardId,
} = require('../middlewares/validations');

router.get('/', getAllCards);
router.post('/', validatePostCard, postCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.put('/:cardId/likes', validateCardId, likeCard);
router.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = router;
