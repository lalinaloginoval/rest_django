from rest_framework import serializers
from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Project, ToDo
from users.serializers import UserSerializer


class ProjectSerializer(HyperlinkedModelSerializer):
    users = serializers.StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = ['name', 'link', 'users']


class ToDoSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = ToDo
        fields = ['text', 'project', 'created', 'updated', 'user', 'is_active']