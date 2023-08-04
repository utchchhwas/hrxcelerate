# Generated by Django 4.2.4 on 2023-08-04 20:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_employee_manager'),
    ]

    operations = [
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, verbose_name='Department Name')),
                ('description', models.TextField(blank=True, max_length=1000, verbose_name='Department Description')),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.company', verbose_name='Company')),
            ],
        ),
    ]