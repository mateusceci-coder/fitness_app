# Generated by Django 5.0.1 on 2024-01-23 20:10

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("authentication", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="profile",
            name="gender",
            field=models.CharField(blank=True, max_length=6, null=True),
        ),
    ]
