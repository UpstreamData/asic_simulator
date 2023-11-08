import os

BASE_DIR = os.path.dirname(__file__)

SSL_PUBLIC_KEY = os.path.join(BASE_DIR, "ssl", "self-signed.pub.pem")
SSL_PRIVATE_KEY = os.path.join(BASE_DIR, "ssl", "self-signed.priv.pem")
