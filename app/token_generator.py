import secrets
from .models import Usuario
from datetime import datetime, timedelta, timezone

def generate_token(user):
    token = secrets.token_urlsafe(16)  # Generate a random token
    expires_at = datetime.timezone() + timedelta(hours=1)  # Token expires in 1 hour
    return token, expires_at

def verify_token(token):
    try:
        user = Usuario.objects.get(token=token)
        if user.token_expires_at > datetime.timezone():
            return user
        else:
            return None
    except Usuario.DoesNotExist:
        return None