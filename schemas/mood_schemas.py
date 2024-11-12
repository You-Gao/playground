from marshmallow import Schema, fields

class HexSchema(Schema):
    hex = fields.String()
    
class PlaceholderSchema(Schema):
    placeholder = fields.String()