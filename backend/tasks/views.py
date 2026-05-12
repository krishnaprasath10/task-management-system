from rest_framework.views import APIView

from rest_framework.response import Response

from rest_framework import status

from rest_framework.permissions import IsAuthenticated

from .models import Task

from .serializers import TaskSerializer

from users.permissions import IsAdminUser


class TaskCreateView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdminUser
    ]

    def post(self, request):

        serializer = TaskSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                {
                    "message": "Task created",
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class TaskListView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        if user.role == 'ADMIN':

            tasks = Task.objects.all()

        else:

            tasks = Task.objects.filter(
                assigned_to=user
            )

        serializer = TaskSerializer(
            tasks,
            many=True
        )

        return Response(serializer.data)


class TaskUpdateView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):

        try:

            task = Task.objects.get(
                id=pk,
                assigned_to=request.user
            )

        except Task.DoesNotExist:

            return Response(
                {
                    "message": "Task not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = TaskSerializer(
            task,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                {
                    "message": "Task updated",
                    "data": serializer.data
                }
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )