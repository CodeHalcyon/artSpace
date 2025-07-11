from rest_framework import serializers
from .models import Artwork, Favorite

class ArtworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artwork
        fields = '__all__'
class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ['id', 'user', 'artwork', 'added_at']
        read_only_fields = ['user', 'added_at']