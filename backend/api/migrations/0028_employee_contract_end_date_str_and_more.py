# Generated by Django 4.2.4 on 2023-09-04 10:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0027_employee_contract_employee_contract_end_date_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="employee",
            name="contract_end_date_str",
            field=models.CharField(
                blank=True,
                max_length=100,
                null=True,
                verbose_name="Contract End Date String",
            ),
        ),
        migrations.AddField(
            model_name="employee",
            name="contract_start_date_str",
            field=models.CharField(
                blank=True,
                max_length=100,
                null=True,
                verbose_name="Contract Start Date String",
            ),
        ),
    ]
