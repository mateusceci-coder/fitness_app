# Generated by Django 5.0.2 on 2024-03-12 19:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crossfit', '0006_alter_cross_exercise_workout_created_by_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cross_exercise_workout',
            name='workout',
        ),
    ]
