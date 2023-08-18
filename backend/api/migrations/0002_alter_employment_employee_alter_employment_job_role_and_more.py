# Generated by Django 4.2.4 on 2023-08-17 15:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employment',
            name='employee',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='employments', to='api.employee', verbose_name='Employee'),
        ),
        migrations.AlterField(
            model_name='employment',
            name='job_role',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='employments', to='api.jobrole', verbose_name='Job Role'),
        ),
        migrations.AlterField(
            model_name='employment',
            name='note',
            field=models.CharField(blank=True, max_length=500, verbose_name='Employment Note'),
        ),
    ]
