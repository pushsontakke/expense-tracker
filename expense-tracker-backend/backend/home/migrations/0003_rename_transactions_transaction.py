# Generated by Django 5.1.6 on 2025-02-11 13:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_rename_transaction_transactions'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Transactions',
            new_name='Transaction',
        ),
    ]
