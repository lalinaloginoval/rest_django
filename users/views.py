from rest_framework import mixins, viewsets
from .models import User
from .serializers import UserSerializer, UserSerializerVersion2


class UserViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return UserSerializerVersion2
        return UserSerializer
