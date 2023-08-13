# Generated by Django 4.2.4 on 2023-08-13 18:17

import api.models.company_model
import cloudinary_storage.storage
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='logo',
            field=models.ImageField(blank=True, storage=cloudinary_storage.storage.MediaCloudinaryStorage(), upload_to=api.models.company_model.company_logo_upload_to, verbose_name='Company Logo'),
        ),
        migrations.AlterField(
            model_name='company',
            name='address',
            field=models.TextField(blank=True, verbose_name='Company Address'),
        ),
        migrations.AlterField(
            model_name='company',
            name='description',
            field=models.TextField(blank=True, verbose_name='Company Description'),
        ),
        migrations.AlterField(
            model_name='company',
            name='motto',
            field=models.CharField(blank=True, max_length=1000, verbose_name='Company Motto'),
        ),
        migrations.AlterField(
            model_name='company',
            name='name',
            field=models.CharField(max_length=100, verbose_name='Company Name'),
        ),
        migrations.AlterField(
            model_name='company',
            name='website',
            field=models.CharField(blank=True, max_length=100, verbose_name='Company Website'),
        ),
    ]