from django.apps import AppConfig


class AutenticationConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "autentication"


    def ready(self):
        import autentication.signals