# Generated by Django 5.0.1 on 2024-02-20 18:50

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("bodybuilder", "0003_exercise_slug"),
    ]

    operations = [
        migrations.AlterField(
            model_name="exercise",
            name="equipment",
            field=models.CharField(
                choices=[
                    ("Dumbbell", "Dumbbell"),
                    ("Barbell", "Barbell"),
                    ("Machine", "Machine"),
                    ("Bodyweight", "Bodyweight"),
                    ("Other", "Other"),
                ],
                max_length=100,
            ),
        ),
    ]
