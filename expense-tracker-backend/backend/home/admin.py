from django.contrib import admin
from .models import Transaction

# Register your models here.

class TransactionAdmin(admin.ModelAdmin):
    list_display = ('id','name', 'quantity', 'costperunit', 'amount', 'date')

admin.site.register(Transaction, TransactionAdmin)
