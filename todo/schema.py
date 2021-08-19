import graphene
from graphene_django import DjangoObjectType

from todo.models import Project, ToDo
from users.models import User


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)

    def resolve_all_projects(self, info):
        return Project.objects.all()

    all_users = graphene.List(UserType)

    def resolve_all_users(self, info):
        return User.objects.all()

    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))

    def resolve_user_by_id(self, info, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            return None

    project_by_user = graphene.List(ProjectType, name=graphene.String(required=False))

    def resolve_project_by_user(self, info, name=None):
        projects = Project.objects.all()
        if name:
            projects = projects.filter(users__username=name)
        return projects


schema = graphene.Schema(query=Query)