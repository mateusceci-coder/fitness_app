from rest_framework import generics, status
from bodybuilder.serializers.body_workout import BodyWorkoutExerciseSerializer, BodyWorkoutSerializer
from bodybuilder.models.body_workout import BodyExercise, BodyWorkout, BodyWorkoutExercise
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

class WorkoutExerciseList(generics.GenericAPIView):
    serializer_class = BodyWorkoutExerciseSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        workout_exercises = BodyWorkoutExercise.objects.filter(workout__created_by=request.user)
        serializer = self.serializer_class(workout_exercises, many=True).data
        return Response(serializer)

    def post(self, request, format=None):
        data = request.data
        print(data)
        for exercise_data in data['exercises']:
            # exercise, created = BodyExercise.objects.get_or_create(**exercise_data)
            BodyWorkoutExercise.objects.create(workout=request.data['workout'], **exercise_data)
        return Response(self.serializer_class(BodyWorkoutExercise.objects.filter(workout__created_by=request.user, id=data['workout']), many=True).data)

class WorkoutExerciseDetail(generics.GenericAPIView):
    serializer_class = BodyWorkoutExerciseSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        workout_exercise = BodyWorkoutExercise.objects.get(pk=pk)
        if workout_exercise.workout.created_by == request.user:
            serializer = self.serializer_class(workout_exercise)
            return Response(serializer.data)
        else:
            return Response({'error': 'You do not have permission to view this workout exercise'}, status=status.HTTP_403_FORBIDDEN)

    def put(self, request, pk, format=None):
        workout_exercise = BodyWorkoutExercise.objects.get(pk=pk)
        if workout_exercise.workout.created_by == request.user:
            exercise_data = {key: value for key, value in request.data.items() if key != 'id'}
            for field, value in exercise_data.items():
                if field != 'id':
                    setattr(workout_exercise.exercise, field, value)
            workout_exercise.exercise.save()
            return Response({'message': 'Exercise updated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'You do not have permission to edit this workout exercise'}, status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, pk, format=None):
        workout_exercise = BodyWorkoutExercise.objects.get(pk=pk)
        if workout_exercise.workout.created_by == request.user:
            workout_exercise.delete()
            return Response({'message': 'Workout exercise deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'error': 'You do not have permission to delete this workout exercise'}, status=status.HTTP_403_FORBIDDEN)

class BodyWorkoutList(generics.GenericAPIView):
    serializer_class = BodyWorkoutSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        workouts = BodyWorkout.objects.filter(created_by=request.user)
        serializer = self.get_serializer(workouts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            workout = serializer.save()
            return Response(BodyWorkoutSerializer(workout, context={'request': request}).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
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
                    exercise, created = BodyExercise.objects.get_or_create(**exercise_data)
                    BodyWorkoutExercise.objects.create(workout=body_workout, exercise=exercise, **exercise_data)
            return Response(self.serializer_class(body_workout).data)
        else:
            return Response({'error': 'You do not have permission to edit this workout'}, status=status.HTTP_403_FORBIDDEN)
        
    def patch(self, request, pk, format=None):
        try:
            body_workout = BodyWorkout.objects.get(pk=pk)
        except BodyWorkout.DoesNotExist:
            return Response({'error': 'Workout not found'}, status=status.HTTP_404_NOT_FOUND)

        if body_workout.created_by != request.user:
            return Response({'error': 'You do not have permission to edit this workout'}, status=status.HTTP_403_FORBIDDEN)

        serializer = self.serializer_class(body_workout, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()

            if 'exercises' in request.data:
                exercises_data = request.data['exercises']
                handled_exercise_ids = []

                for exercise_data in exercises_data:
                    exercise_id = exercise_data.get('exercise', {}).get('id')
                    if exercise_id:
                        # Atualizar exercício existente
                        try:
                            workout_exercise = BodyWorkoutExercise.objects.get(workout=body_workout, exercise__id=exercise_id)
                            exercise_serializer = BodyWorkoutExerciseSerializer(workout_exercise, data=exercise_data, partial=True)
                            if exercise_serializer.is_valid():
                                exercise_serializer.save()
                            handled_exercise_ids.append(exercise_id)
                        except BodyWorkoutExercise.DoesNotExist:
                            pass

                    else:
                        # Adicionar novo exercício
                        exercise_serializer = BodyWorkoutExerciseSerializer(data=exercise_data)
                        if exercise_serializer.is_valid():
                            exercise_serializer.save(workout=body_workout)

                # Remover exercícios ausentes, se necessário
                for workout_exercise in BodyWorkoutExercise.objects.filter(workout=body_workout):
                    if workout_exercise.exercise.id not in handled_exercise_ids:
                        workout_exercise.delete()

                return Response(serializer.data)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk, format=None):
        body_workout = BodyWorkout.objects.get(pk=pk)
        if body_workout.created_by == request.user:
            body_workout.delete()
            return Response({'message': 'Workout deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'error': 'You do not have permission to delete this workout'}, status=status.HTTP_403_FORBIDDEN)