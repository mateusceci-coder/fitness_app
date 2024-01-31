from django.urls import path

from . import views

urlpatterns = [
    path('exercises/', views.ListExercises.as_view(), name='list-exercises'),
    path('exercises/create/', views.CreateExercises.as_view(), name='create-exercises'),
]
