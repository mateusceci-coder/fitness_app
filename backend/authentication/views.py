from django.http import Http404
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from authentication.serializers import ProfileSerializer
from django.shortcuts import get_object_or_404
from .models import Profile
import logging

logger = logging.getLogger('API')

class ProfileDetail(RetrieveAPIView):
    """
    View para detalhar um perfil de usuário.
    Para exibir todos os perfis de usuários, use a view ProfileList.
    """
    serializer_class = ProfileSerializer

    def get_object(self):
        """
        Retorna o perfil do usuário com base no username passado na URL.
        """
        username = self.kwargs.get('username')
        return get_object_or_404(Profile, user__username=username)

class ProfileList(ListAPIView):
    """
    View para listar todos os perfis de usuários.
    Para detalhar um perfil de usuário, use a view DetalheProfile.
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class IsOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        return obj.user == request.user

class ProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    def patch(self, request, pk, format=None):
        """
        Update the profile with the given primary key using the data from the request.
    
        :param request: The request object
        :param pk: The primary key of the profile to be updated
        :param format: The format of the data
        :return: Response with the updated profile data or errors if the data is invalid
        """

        profile = get_object_or_404(Profile, pk=pk) # Get the profile with the given primary key

        logger.info(f"Updating profile with pk={pk}", extra={'profile_id': profile.pk, 'user_id': request.user.pk})

        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)