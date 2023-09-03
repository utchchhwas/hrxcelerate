# Generated by Django 4.2.4 on 2023-09-03 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0025_alter_interviewresult_score_alter_timeoff_employee'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='timeoff',
            options={'verbose_name_plural': 'Time-Offs'},
        ),
        migrations.AlterField(
            model_name='timeoff',
            name='status',
            field=models.CharField(choices=[('P', 'Pending'), ('A', 'Accepted'), ('R', 'Rejected')], default='P', max_length=1, verbose_name='Time-Off Status'),
        ),
    ]