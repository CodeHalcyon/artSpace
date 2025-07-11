from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('customer', 'Customer'),
        ('artist', 'Artist'),
        ('admin', 'Admin'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='customer')
    bio = models.TextField(blank=True, null=True)
    # profile_pic = models.ImageField(upload_to='profile_pics/', blank=True, null=True)


    def __str__(self):
        return self.username
