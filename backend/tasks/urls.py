from django.urls import path

from .views import (
    TaskCreateView,
    TaskListView,
    TaskUpdateView
)

urlpatterns = [

    path(
        '',
        TaskListView.as_view()
    ),

    path(
        'create/',
        TaskCreateView.as_view()
    ),

    path(
        'update/<int:pk>/',
        TaskUpdateView.as_view()
    ),
]