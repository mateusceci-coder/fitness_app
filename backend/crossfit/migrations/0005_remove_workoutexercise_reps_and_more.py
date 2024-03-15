# Generated by Django 5.0.2 on 2024-03-12 00:14

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crossfit', '0004_merge_20240227_1048'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='workoutexercise',
            name='reps',
        ),
        migrations.RemoveField(
            model_name='workoutexercise',
            name='weight_for_men',
        ),
        migrations.RemoveField(
            model_name='workoutexercise',
            name='weight_for_women',
        ),
        migrations.CreateModel(
            name='Cross_Exercise_Workout',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('slug', models.SlugField(blank=True, max_length=150, unique=True)),
                ('equipment', models.CharField(choices=[('Dumbbell', 'Dumbbell'), ('Barbell', 'Barbell'), ('Kettlebell', 'Kettlebell'), ('Bodyweight', 'Bodyweight'), ('Other', 'Other')], max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('weight_for_women', models.FloatField(blank=True, null=True)),
                ('weight_for_men', models.FloatField(blank=True, null=True)),
                ('reps', models.IntegerField()),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('workout', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='exercises_workout', to='crossfit.crosworkout')),
            ],
        ),
        migrations.AlterField(
            model_name='crosworkout',
            name='exercises',
            field=models.ManyToManyField(through='crossfit.WorkoutExercise', to='crossfit.cross_exercise_workout'),
        ),
        migrations.AlterField(
            model_name='workoutexercise',
            name='exercise',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='crossfit.cross_exercise_workout'),
        ),
    ]