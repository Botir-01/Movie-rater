from django.urls import path, include
from rest_framework import routers
from .views import MovieViewSet, RatingViewSet, UserViewSet
router = routers.DefaultRouter()
router.register('movies', MovieViewSet)
router.register('ratings', RatingViewSet)
router.register('users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]