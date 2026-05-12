from django.db import models

# Create your models here.
from django.db import models

from users.models import User


class Task(models.Model):

    STATUS_CHOICES = (

        ('Pending', 'Pending'),

        ('In Progress', 'In Progress'),

        ('Completed', 'Completed'),
    )

    title = models.CharField(
        max_length=255
    )

    description = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='Pending'
    )

    assigned_to = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return self.title