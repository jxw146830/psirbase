# Generated by Django 2.0.2 on 2018-03-16 18:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homepage', '0005_celegansmrna'),
    ]

    operations = [
        migrations.CreateModel(
            name='CelegansChrSliceI',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start', models.IntegerField()),
                ('end', models.IntegerField()),
                ('sequence', models.CharField(default='N/A', max_length=100)),
            ],
        ),
    ]
