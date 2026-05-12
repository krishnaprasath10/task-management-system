from django.urls import path

from .views import (
    UserCreateView,
    UserListView
)

urlpatterns = [

    path(
        '',
        UserListView.as_view()
    ),

    path(
        'create/',
        UserCreateView.as_view()
    ),
]