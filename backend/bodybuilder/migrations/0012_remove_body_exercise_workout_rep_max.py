# Generated by Django 5.0.2 on 2024-03-12 22:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bodybuilder', '0011_body_exercise_workout_rep_max_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='body_exercise_workout',
            name='rep_max',
        ),
    ]
