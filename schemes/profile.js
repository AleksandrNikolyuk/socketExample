const profileJsonSchema = {
  'title': 'Person',
  'description': 'Person profile',
  'type': 'object',
  'properties': {
      'username': {
          'description': 'User name',
          'type': 'string',
          'minLength': 2,
          'maxLength': 40
      },
      'content': {
          'description': 'User message',
          'type': 'string',
          "minLength": 1,
          'maxLength': 400
      },
  },
  'required': ['username', 'content',]
};

module.exports = profileJsonSchema;