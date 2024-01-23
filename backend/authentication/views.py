from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from authentication.serializers import ProfileSerializer
from django.shortcuts import get_object_or_404
from .models import Profile

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

class ProfileUpdateView(APIView):
    def put(self, request, pk, format=None):
        profile = Profile.objects.get(pk=pk)
        serializer = ProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)