# Generated by Django 4.2.4 on 2023-09-04 09:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0028_alter_company_logo'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='contract_end_date',
            field=models.DateField(blank=True, null=True, verbose_name='End Date'),
        ),
        migrations.AddField(
            model_name='employee',
            name='contract_start_date',
            field=models.DateField(blank=True, null=True, verbose_name='Start Date'),
        ),
        migrations.AddField(
            model_name='employee',
            name='is_permanent',
            field=models.BooleanField(default=True, verbose_name='Permanent'),
        ),
    ]
