from django.db import models

from .fields import AddressField

class MyModel(models.Model):

    name = models.CharField(max_length=50)
    address = AddressField()
