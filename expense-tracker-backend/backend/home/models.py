from django.db import models
from django.utils.timezone import now


# Create your models here.


class Transaction(models.Model):
    name = models.CharField(max_length=255)
    quantity = models.DecimalField(max_digits=10, decimal_places=0)
    costperunit = models.DecimalField(max_digits=10, decimal_places=2)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(default=now)

    # def __str__(self):
    #     return self.name
