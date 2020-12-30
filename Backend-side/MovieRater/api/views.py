from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from .models import Movie, Rating
from .serializers import MovieSerializer, RatingSerializer, UserSerializer
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny, )


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, )
    @action(detail=True, methods=["POST"]) # Creating own functions
    def rate_movie(self, request, pk=None):
        if 'stars' in request.data:
            movie = Movie.objects.get(id=pk)
            stars = request.data['stars']
            user = request.user
            #user = User.objects.get(id=1)
            try:
                rating = Rating.objects.get(movie=movie.id, user=user.id)
                rating.stars = stars
                rating.save()
                serializers = RatingSerializer(rating, many=False)
                response = {'message': 'The rating is updated', 'result': serializers.data}
                return Response(response, status=status.HTTP_200_OK)
            except:
                rating = Rating.objects.create(movie=movie, user=user, stars=stars)
                rating.save()
                serializers = RatingSerializer(rating, many=False)
                response = {'message': 'The rating is created', 'result': serializers.data}
                return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'message': 'fail to succeed'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    def update(self, request, *args, **kwargs):
        response = {'message': 'fail to succeed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        response = {'message': 'fail to succeed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)




