from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers import UserSerializer
from .permissions import IsAdminUser

class UserCreateView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdminUser
    ]

    def post(self, request):

        serializer = UserSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                {
                    "message": "User created successfully",
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class UserListView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdminUser
    ]

    def get(self, request):

        users = User.objects.all()

        serializer = UserSerializer(
            users,
            many=True
        )

        return Response(serializer.data)