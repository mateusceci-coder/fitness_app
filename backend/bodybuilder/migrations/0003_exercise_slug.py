# Generated by Django 5.0.1 on 2024-02-06 17:37

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("bodybuilder", "0002_alter_exercise_equipment"),
    ]

    operations = [
        migrations.AddField(
            model_name="exercise",
            name="slug",
            field=models.SlugField(blank=True, max_length=150, unique=True),
        ),
    ]