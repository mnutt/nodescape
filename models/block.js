mongoose.Model('Block', {
  properties: ['row', 'column', 'user_id', {'blocks': []}],

  cast: {
    row: Number,
    column: Number,
    user_id: Number,
    blocks: Array
  },

  indexes: [{row: 1, column: 1}],

});