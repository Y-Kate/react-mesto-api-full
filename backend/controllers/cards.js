const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error'); // 404
const IncorrectDataError = require('../errors/incorrect-data-error'); // 400
const ForbiddenError = require('../errors/forbidden-error'); // 403

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => next(err));
};

module.exports.postCard = (req, res, next) => {
  const {
    name,
    link,
  } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') next(new IncorrectDataError('Переданы некорректные данные при создании карточки'));
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .then((card) => {
      if (!card) throw new NotFoundError('Карточка с указанным _id не найдена');
      if (card.owner.toString() !== userId) throw new ForbiddenError('Нельзя удалить чужую карточку');

      return Card.findByIdAndRemove(cardId)
        .then((removedCard) => {
          if (card !== null) return res.send({ data: removedCard });
          throw new NotFoundError('Карточка с указанным _id не найдена');
        })
        .catch((err) => {
          if (err.name === 'CastError') next(new IncorrectDataError('Переданы некорректные данные при создании карточки'));
          next(err);
        });
    })
    .catch((err) => next(err));
};

module.exports.likeCard = (req, res, next) => {
  const currentUserId = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: currentUserId } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card !== null) return res.send({ data: card });
      throw new NotFoundError('Передан несуществующий _id карточки');
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new IncorrectDataError('Переданы некорректные данные для постановки/снятии лайка'));
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  const currentUserId = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: currentUserId } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (card !== null) return res.send({ data: card });
      throw new NotFoundError('Передан несуществующий _id карточки');
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new IncorrectDataError('Переданы некорректные данные для постановки/снятии лайка'));
      next(err);
    });
};
