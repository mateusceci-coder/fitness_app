from .settings import *

# Desabilitar middleware não necessário durante os testes
MIDDLEWARE = [mw for mw in MIDDLEWARE if mw not in ['middleware_to_disable']]

