# Generated by Django 4.2.4 on 2023-08-18 10:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_jobpostingsalary_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobposting',
            name='job_role',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='job_postings', to='api.jobrole', verbose_name='Job Role'),
        ),
    ]
