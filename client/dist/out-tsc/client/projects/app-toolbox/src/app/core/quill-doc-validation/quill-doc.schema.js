export const quillDocSchema = {
    '$schema': 'http://json-schema.org/draft-07/schema#',
    'definitions': {
        'QuillDoc': {
            'type': 'object',
            'properties': {
                'latestId': {
                    'type': 'number'
                },
                'ops': {
                    'type': 'array',
                    'items': {
                        '$ref': '#/definitions/Op'
                    }
                }
            },
            'required': [
                'latestId'
            ],
            'additionalProperties': false
        },
        'Op': {
            'type': 'object',
            'properties': {
                'insert': {
                    'type': 'string',
                    'minLength': 1,
                    'maxLength': 1
                },
                'attributes': {
                    'type': 'object',
                    'properties': {
                        'charid': {
                            'type': 'string'
                        },
                        'blockid': {
                            'type': 'string'
                        }
                    }
                }
            },
            'required': [
                'insert'
            ],
            'additionalProperties': false
        }
    },
    '$ref': '#/definitions/QuillDoc'
};
//# sourceMappingURL=quill-doc.schema.js.map