from django.db.models import JSONField
from .address import Address

class AddressCreator:
  
    def __init__(self, field):
        self.field = field
  
    def __get__(self, obj, owner=None):
        if obj is None:
            return self
      
        return obj.__dict__[self.field.name].to_dict()
  
    def __set__(self, obj, value):
        obj.__dict__[self.field.name] = self.convert_input(value)

    def convert_input(self, value):
        if value is None:
            return None
        
        if isinstance(value, Address):
            return value
        else:
            return Address(**value)

class AddressField(JSONField):

    def from_db_value(self, value, expression, connection):
        db_val = super().from_db_value(value, expression, connection)

        if db_val is None:
            return db_val
        
        return Address(**db_val)
    
    def get_prep_value(self, value):
        dict_value = value.to_dict()
        prep_value = super().get_prep_value(dict_value)
        return prep_value
    
    def contribute_to_class(self, cls, name, private_only=False):
        super().contribute_to_class(cls, name, private_only=private_only)
        setattr(cls, self.name, AddressCreator(self))
