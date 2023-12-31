# Generated by Django 4.2.4 on 2023-09-03 10:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0026_alter_timeoff_options_alter_timeoff_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tracking',
            name='employee',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='trackings', to='api.employee', verbose_name='Employee'),
        ),
    ]
