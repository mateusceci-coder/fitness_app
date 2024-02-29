from rest_framework import generics, status
from bodybuilder.serializers.body_workout import WorkoutExerciseSerializer, BodyWorkoutSerializer
from bodybuilder.models.body_workout import BodyExercise, BodyWorkout, WorkoutExercise
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class WorkoutExerciseList(generics.GenericAPIView):
    serializer_class = WorkoutExerciseSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        workout_exercises = WorkoutExercise.objects.filter(
            workout__created_by=request.user)
        serializer = self.serializer_class(workout_exercises, many=True).data
        return Response(serializer)

    def post(self, request, format=None):
        data = request.data
        for exercise_data in data['exercises']:
            exercise, created = BodyExercise.objects.get_or_create(
                **exercise_data)
            WorkoutExercise.objects.create(
                workout=request.data['workout'], exercise=exercise, **exercise_data)
        return Response(self.serializer_class(WorkoutExercise.objects.filter(workout__created_by=request.user, id=data['workout']), many=True).data)


class WorkoutExerciseDetail(generics.GenericAPIView):
    serializer_class = WorkoutExerciseSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        workout_exercise = WorkoutExercise.objects.get(pk=pk)
        if workout_exercise.workout.created_by == request.user:
            serializer = self.serializer_class(workout_exercise)
            return Response(serializer.data)
        else:
            return Response({'error': 'You do not have permission to view this workout exercise'}, status=status.HTTP_403_FORBIDDEN)

    def put(self, request, pk, format=None):
        workout_exercise = WorkoutExercise.objects.get(pk=pk)
        if workout_exercise.workout.created_by == request.user:
            exercise_data = {key: value for key,
                             value in request.data.items() if key != 'id'}
            for field, value in exercise_data.items():
                if field != 'id':
                    setattr(workout_exercise.exercise, field, value)
            workout_exercise.exercise.save()
            return Response({'message': 'Exercise updated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'You do not have permission to edit this workout exercise'}, status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, pk, format=None):
        workout_exercise = WorkoutExercise.objects.get(pk=pk)
        if workout_exercise.workout.created_by == request.user:
            workout_exercise.delete()
            return Response({'message': 'Workout exercise deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'error': 'You do not have permission to delete this workout exercise'}, status=status.HTTP_403_FORBIDDEN)


class BodyWorkoutList(generics.GenericAPIView):
    serializer_class = BodyWorkoutSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        body_workouts = BodyWorkout.objects.filter(created_by=request.user)
        serializer = self.serializer_class(body_workouts, many=True).data
        return Response(serializer)

    def post(self, request, format=None):
        exercises_data = request.data.pop('exercises')
        body_workout = BodyWorkout.objects.create(**request.data)
        for exercise_data in exercises_data:
            exercise, created = BodyExercise.objects.get_or_create(
                **exercise_data)
            WorkoutExercise.objects.create(
                workout=body_workout, exercise=exercise, **exercise_data)
        return Response(self.serializer_class(body_workout).data)


class BodyWorkoutDetail(generics.GenericAPIView):
    serializer_class = BodyWorkoutSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        body_workout = BodyWorkout.objects.get(pk=pk)
        if body_workout.created_by == request.user:
            serializer = self.serializer_class(body_workout)
            return Response(serializer.data)
        else:
            return Response({'error': 'You do not have permission to view this workout'}, status=status.HTTP_403_FORBIDDEN)

    def put(self, request, pk, format=None):
        body_workout = BodyWorkout.objects.get(pk=pk)
        if body_workout.created_by == request.user:
            body_workout.name = request.data.get('name', body_workout.name)
            body_workout.save()
            exercises_data = request.data.pop('exercises')
            for exercise in body_workout.exercises.all():
                if exercise.id not in [exercise_data['id'] for exercise_data in exercises_data]:
                    exercise.delete()
            # Update existing exercises and create new ones
            for exercise_data in exercises_data:
                if exercise_data['id'] in [exercise.id for exercise in body_workout.exercises.all()]:
                    # Update existing exercise
                    exercise = BodyExercise.objects.get(pk=exercise_data['id'])
                    for field, value in exercise_data.items():
                        if field != 'id':
                            setattr(exercise, field, value)
                    exercise.save()
                else:
                    # Create new exercise
                    exercise, created = BodyExercise.objects.get_or_create(
                        **exercise_data)
                    WorkoutExercise.objects.create(
                        workout=body_workout, exercise=exercise, **exercise_data)
            return Response(self.serializer_class(body_workout).data)
        else:
            return Response({'error': 'You do not have permission to edit this workout'}, status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, pk, format=None):
        body_workout = BodyWorkout.objects.get(pk=pk)
        if body_workout.created_by == request.user:
            body_workout.delete()
            return Response({'message': 'Workout deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'error': 'You do not have permission to delete this workout'}, status=status.HTTP_403_FORBIDDEN)
