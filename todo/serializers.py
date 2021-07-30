from rest_framework.serializers import ModelSerializer
from .models import Project, ToDo


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name', 'link', 'users']


class ToDoSerializer(ModelSerializer):
    class Meta:
        model = ToDo
        fields = ['id', 'text', 'project', 'created', 'updated', 'user', 'is_active']