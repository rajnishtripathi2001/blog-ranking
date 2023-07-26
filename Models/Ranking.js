const mongoose = require('mongoose');

const rankSchema = new  mongoose.Schema({
    blogId: String,
    rank: Number
});

const Ranking = mongoose.model('Ranking', rankSchema);

module.exports = Ranking;