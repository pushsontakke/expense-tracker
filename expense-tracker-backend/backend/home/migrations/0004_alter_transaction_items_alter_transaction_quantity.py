# Generated by Django 5.1.6 on 2025-02-12 05:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0003_rename_transactions_transaction'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='items',
            field=models.DecimalField(decimal_places=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='quantity',
            field=models.DecimalField(decimal_places=0, max_digits=10),
        ),
    ]
