class Address:
    def __init__(self, street, number, neighborhood, city, state, zip_code):
        self.street = street
        self.number = number
        self.neighborhood = neighborhood
        self.city = city
        self.state = state
        self.zip_code = zip_code
    
    def to_dict(self):
        return {
          "street": self.street, 
          "number": self.number, 
          "neighborhood": self.neighborhood,
          "city": self.city,
          "state": self.state,
          "zip_code": self.zip_code,
        }
