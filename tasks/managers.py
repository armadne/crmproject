from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, name, family_name, password=None):
        if not email:
            raise ValueError("L'utilisateur doit avoir une adresse email")

        email = self.normalize_email(email)
        user = self.model(email=email, name=name, family_name=family_name)
        user.set_password(password)  # Hash du mot de passe
        user.is_staff = False
        user.is_superuser = False
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, family_name, password):
        user = self.create_user(email, name, family_name, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
