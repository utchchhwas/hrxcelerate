# Generated by Django 4.2.4 on 2023-09-04 09:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0026_project_company_project_manager"),
    ]

    operations = [
        migrations.AddField(
            model_name="employee",
            name="contract",
            field=models.CharField(
                blank=True,
                choices=[("P", "Permanent"), ("C", "Contractual")],
                default="P",
                max_length=1,
                verbose_name="Contract",
            ),
        ),
        migrations.AddField(
            model_name="employee",
            name="contract_end_date",
            field=models.DateField(
                blank=True, null=True, verbose_name="Contract End Date"
            ),
        ),
        migrations.AddField(
            model_name="employee",
            name="contract_start_date",
            field=models.DateField(
                blank=True, null=True, verbose_name="Contract Start Date"
            ),
        ),
    ]
