# Generated by Django 4.2.4 on 2023-08-05 16:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_alter_company_website'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='manager',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.employee', verbose_name='Manager'),
        ),
    ]
