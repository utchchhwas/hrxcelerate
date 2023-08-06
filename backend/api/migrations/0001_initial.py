# Generated by Django 4.2.4 on 2023-08-06 15:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('email', models.EmailField(error_messages={'unique': 'A user with that email already exists.'}, max_length=254, unique=True, verbose_name='email address')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Applicant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='First Name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='First Name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='Email')),
                ('status', models.CharField(blank=True, choices=[('A', 'Applied'), ('Q', 'Qualified'), ('I', 'Interviewing'), ('S', 'Short-listed'), ('O', 'Offered'), ('H', 'Hired'), ('R', 'Rejected')], max_length=1, verbose_name='Status')),
            ],
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, verbose_name='Company Name')),
                ('motto', models.CharField(blank=True, max_length=250, verbose_name='Company Motto')),
                ('description', models.TextField(blank=True, max_length=5000, verbose_name='Company Description')),
                ('website', models.CharField(blank=True, max_length=50, verbose_name='Company Website')),
                ('address', models.TextField(blank=True, max_length=500, verbose_name='Company Address')),
            ],
            options={
                'verbose_name_plural': 'companies',
            },
        ),
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, verbose_name='Department Name')),
                ('description', models.TextField(blank=True, max_length=1000, verbose_name='Department Description')),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.company', verbose_name='Company')),
            ],
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_owner', models.BooleanField(default=False, verbose_name='Owner')),
                ('is_admin', models.BooleanField(default=False, verbose_name='Admin')),
                ('is_active', models.BooleanField(default=True, verbose_name='Active')),
                ('gender', models.CharField(blank=True, choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')], max_length=1, verbose_name='Gender')),
                ('date_of_birth', models.DateField(blank=True, null=True, verbose_name='Date of Birth')),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.company', verbose_name='Company')),
                ('manager', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.employee', verbose_name='Manager')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
        ),
        migrations.CreateModel(
            name='Interviewer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.employee', verbose_name='Employee')),
            ],
        ),
        migrations.CreateModel(
            name='JobPosting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tags', models.TextField(blank=True, max_length=500, verbose_name='Job Posting Tags')),
                ('description', models.TextField(blank=True, verbose_name='Job Posting Description')),
            ],
        ),
        migrations.CreateModel(
            name='Tracking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.DateTimeField(blank=True, null=True, verbose_name='Tracking Start Time')),
                ('end_time', models.DateTimeField(blank=True, null=True, verbose_name='Tracking End Time')),
                ('note', models.TextField(blank=True, max_length=1000, verbose_name='Tracking Note')),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.employee', verbose_name='Employee')),
            ],
        ),
        migrations.CreateModel(
            name='TimeOff',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.DateTimeField(blank=True, null=True, verbose_name='Time-Off Start Time')),
                ('end_time', models.DateTimeField(blank=True, null=True, verbose_name='Time-Off End Time')),
                ('status', models.CharField(choices=[('P', 'Pending'), ('A', 'Accepted'), ('R', 'Rejected')], max_length=1, verbose_name='Time-Off Status')),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.employee', verbose_name='Employee')),
            ],
        ),
        migrations.CreateModel(
            name='Payslip',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('from_date', models.DateField(blank=True, null=True, verbose_name='Payslip To Date')),
                ('amount', models.DecimalField(blank=True, decimal_places=10, max_digits=19, verbose_name='Payslip Amount')),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.employee', verbose_name='Employee')),
            ],
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField(blank=True, null=True, verbose_name='Notification Time')),
                ('message', models.TextField(blank=True, max_length=1000, verbose_name='Notification Message')),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.employee', verbose_name='Employee')),
            ],
        ),
        migrations.CreateModel(
            name='JobRole',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, verbose_name='Job Role Name')),
                ('description', models.TextField(blank=True, max_length=500, verbose_name='Job Role Description')),
                ('department', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.department', verbose_name='Department')),
            ],
        ),
        migrations.CreateModel(
            name='JobPostingSalary',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_posting', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.jobposting', verbose_name='Job Posting')),
            ],
        ),
        migrations.AddField(
            model_name='jobposting',
            name='job_role',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.jobrole', verbose_name='Job Role'),
        ),
        migrations.CreateModel(
            name='InterviewResult',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.FloatField(blank=True, verbose_name='Interview Score')),
                ('note', models.TextField(blank=True, max_length=5000, verbose_name='Interview Note')),
                ('applicant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.applicant', verbose_name='Applicant')),
                ('interviewer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.interviewer', verbose_name='Interviewer')),
            ],
        ),
        migrations.AddField(
            model_name='interviewer',
            name='job_posting',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.jobposting', verbose_name='Job Posting'),
        ),
        migrations.CreateModel(
            name='Employment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_active', models.BooleanField(default=True, verbose_name='Active')),
                ('start_date', models.DateField(blank=True, null=True, verbose_name='Start Date')),
                ('end_date', models.DateField(blank=True, null=True, verbose_name='End Date')),
                ('employment_type', models.CharField(blank=True, choices=[('FT', 'Full-Time'), ('PT', 'Part-Time'), ('IS', 'Internship')], max_length=2, verbose_name='Employment Type')),
                ('is_remote', models.BooleanField(default=False, verbose_name='Remote')),
                ('note', models.CharField(blank=True, max_length=150, verbose_name='Employment Note')),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.employee', verbose_name='Employee')),
                ('job_role', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.jobrole', verbose_name='Job Role')),
            ],
        ),
        migrations.AddField(
            model_name='applicant',
            name='job_posting',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.jobposting', verbose_name='Job Posting'),
        ),
    ]
