from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Project, ToDo


class ProjectSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ['name', 'link', 'users']


class ToDoSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = ToDo
        fields = ['text', 'project', 'created', 'updated', 'user', 'is_active']