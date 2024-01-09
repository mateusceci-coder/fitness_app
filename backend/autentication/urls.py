from django.urls import path

from . import views

urlpatterns = [
    path('profile/<str:username>/', views.ProfileDetail.as_view(), name='profile-detail'),
    path('profile/', views.ProfileList.as_view(), name='profile-list'),
]
