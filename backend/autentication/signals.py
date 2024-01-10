from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Profile

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """
    Creates a user profile when a new user is created.

    Parameters:
        sender (object): The sender of the post_save signal.
        instance (object): The instance of the User model that was saved.
        created (bool): Indicates whether the user was newly created.

    Returns:
        None
    """
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    """
    Save the user profile after saving the User object.

    Args:
        sender: The sender of the signal.
        instance: The User instance being saved.

    Returns:
        None
    """
    instance.profile.save()
