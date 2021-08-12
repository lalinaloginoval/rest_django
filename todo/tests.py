import json

from rest_framework import status
from rest_framework.test import APITestCase
from mixer.backend.django import mixer

from todo.models import Project
from users.models import User


class TestProjectViewSet(APITestCase):

    def test_get_list(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_mixer_project(self):
        user = mixer.blend(User)
        project = mixer.blend(Project, users=[user])
        response = self.client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail(self):
        project = mixer.blend(Project, name='popo')
        response = self.client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_project = json.loads(response.content)
        self.assertEqual(response_project['name'], 'popo')
