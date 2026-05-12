from rest_framework_simplejwt.views import (
    TokenObtainPairView
)

from .jwt_serializer import (
    CustomTokenObtainPairSerializer
)


class CustomLoginView(
    TokenObtainPairView
):

    serializer_class = (
        CustomTokenObtainPairSerializer
    )