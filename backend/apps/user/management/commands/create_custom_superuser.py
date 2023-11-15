from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db.utils import IntegrityError

class Command(BaseCommand):
    help = 'Crea un superusuario personalizado con campos adicionales.'

    def add_arguments(self, parser):
        parser.add_argument('--email', type=str, help='Email for the superuser')
        parser.add_argument('--first_name', type=str, help='First name for the superuser')
        parser.add_argument('--last_name', type=str, help='Last name for the superuser')
        parser.add_argument('--rol', type=str, help='Rol for the superuser')
        parser.add_argument('--password', type=str, help='Password for the superuser')
        parser.add_argument('--school', type=int, help='School ID for the superuser')

    def handle(self, *args, **options):
        User = get_user_model()
        email = options['email']
        first_name = options['first_name']
        last_name = options['last_name']
        rol = options['rol']
        password = options['password']
        school = options['school']

        try:
            user = User.objects.create_user(
                email=email,
                first_name=first_name,
                last_name=last_name,
                rol=rol,
                password=password,
                school_id=school
            )

            user.is_superuser = True
            user.is_staff = True
            user.save()

            self.stdout.write(self.style.SUCCESS('Superuser creado con éxito.'))
        except IntegrityError:
            self.stderr.write(self.style.ERROR('El superusuario ya existe o faltan campos obligatorios.'))
