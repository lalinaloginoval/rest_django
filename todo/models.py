from django.db import models
from users.models import User


class Project(models.Model):
    name = models.CharField(max_length=128)
    link = models.CharField(max_length=128)
    users = models.ManyToManyField(User)


class ToDo(models.Model):
    text = models.CharField(max_length=256)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField()
