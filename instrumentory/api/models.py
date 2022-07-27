import uuid

from datetime import datetime
from enum import unique
from pyexpat import model
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.forms import CharField

from django.utils.timezone import now
# Create your models here.


### EXAMPLE MODEL:

# class Example(models.Model):
#     body = models.TextField(null=True, blank=True)
#     updated = models.DateTimeField(auto_now=True)
#     created = models.DateTimeField(auto_now_add=True)
    
#     def __str__(self):
#         return self.body[0:50]

### MAKE SURE!!!!!!!
### $ python3 manage.py makemigrations & $ python3 manage.py migrate
### when making any changes

# Models for custom user
# class MyAccountMananger(BaseUserManager):
#     def create_user(self, email, username, first_name, last_name, password=None):
#         if not email:
#             raise ValueError("New users must have a valid email address!")
#         if not username:
#             raise ValueError("New users must have a valid username!")
#         if not first_name or last_name:
#             raise ValueError("New users must include their first and last name!")
        
#         user = self.model(
#             email = self.normalize_email(email),
#             username = username,
#             first_name = first_name,
#             last_name = last_name,
#         )
        
#         user.set_password(password)
#         user.save()
#         return user
    
#     def create_superuser(self, email, username, first_name, last_name, password=None):
#         user = self.create_user(
#             email = self.normalize_email(email),
#             username = username,
#             password = password,
#             first_name = first_name,
#             last_name = last_name,
#         )
        
#         user.is_admin = True
#         user.is_staff = True
#         user.is_superuser = True
#         user.save()
#         return user


# class Account(AbstractBaseUser, PermissionsMixin):
#     # required fields
#     email = models.EmailField(verbose_name="email", max_length=100, unique=True)
#     username = models.CharField(max_length=30, unique=True)
#     date_joined = models.DateTimeField(verbose_name="date joined", auto_now_add=True)
#     last_login = models.DateTimeField(verbose_name="last login", auto_now=True)
#     is_admin = models.BooleanField(default=False)
#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)
#     is_superuser = models.BooleanField(default=False)
#     # custom fields
#     first_name = models.CharField(max_length=30)
#     last_name = models.CharField(max_length=30)
#     ## WILL MOST LIKELY NEED TO ADD A FORIEGN KEY FOR STUDENT/TEACHER ROLES
    
#     # required fields
#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['username', 'first_name', 'last_name']
    
#     objects = MyAccountMananger()
    
#     def __str__(self):
#         return self.first_name + self.last_name
    
#     # required functions
#     def has_perm(self, perm, obj=None):
#         return self.is_admin
    
#     def has_module_perms(self, app_label):
#         return True

# id for school district - this will be used to confirm they are a teacher from the school
def unique_id():
    return uuid.uuid4().hex[:6].upper()

class SchoolDistrict(models.Model):
    name = models.CharField(max_length=100, blank=False, unique=True, default='enter district name here')
    district_code = models.CharField(max_length=10, default=unique_id, unique=True)
    verify_district_email = models.CharField(max_length=100, blank=False, unique=True, default='enter what is followed by "@" for district email')

    def __str__(self):
        return self.name

class SchoolSite(models.Model):
    district = models.ForeignKey(SchoolDistrict, on_delete=models.CASCADE, null=False, related_name='site', default=1)
    name = models.CharField(max_length=100, blank=False, unique=True, default='enter school site here')

    def __str__(self):
        return self.name

### Custom User Model
class CustomUser(AbstractUser):
    # extra fields
    is_validated = models.BooleanField(default=False)
    school_district = models.CharField(max_length=100, default="district")
    school_site = models.CharField(max_length=100, default="site")
    
    def __str__(self):
        return self.email


### Model for website/app photos:
class WebsiteImage(models.Model):
    # need to add all routes here:
    ALL_ROUTES_CHOICES = [
        ('GEN', 'general'),
        ('LOGIN', 'login'),
    ]
    
    for_page = models.CharField(max_length=50, choices=ALL_ROUTES_CHOICES, default='general')
    image_name = models.CharField(max_length=100, default='please_name_this_image')
    image = models.FileField(upload_to='uploads')
    
    def __str__(self):
        return self.image_name
    

### Model for sent 'contact us' emails
class ContactEmail(models.Model):
    name = models.CharField(max_length=50, blank=False)
    email = models.CharField(max_length=100, blank=False)
    message = models.TextField(blank=False)
    date_sent = models.DateTimeField(blank=True, default=now)
    
    def __str__(self):
        return str(self.date_sent)[0:16] + ' ' + '"' + self.message + '"'
    
# all the above fields need to be related
# connecting to other teachers in district/site can be as simple as creating a vaerfication code
# check if other teachers exist in district,
    # if so, ask for code
    # if not, create one
    
### Instrument Models
class Instrument(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, related_name='instrument')
    instrument_type = models.CharField(max_length=50, blank=False)
    instrument_serial = models.CharField(max_length=50, blank=False, unique=True)
    instrument_make = models.CharField(max_length=50)
    instrument_model = models.CharField(max_length=50)
    instrument_image = models.FileField(upload_to='uploads', blank=True)
    
    def __str__(self):
        return self.instrument_type + ': ' + self.instrument_serial
    
class Accessories(models.Model):
    instrument = models.OneToOneField(Instrument, on_delete=models.CASCADE, null=True, related_name='accessories')
    instrument_mouthpiece = models.BooleanField(default=False)
    instrument_slide_grease = models.BooleanField(default=False)
    instrument_slide_oil = models.BooleanField(default=False)
    instrument_valve_oil = models.BooleanField(default=False)
    instrument_ligature = models.BooleanField(default=False)
    instrument_reeds = models.BooleanField(default=False)
    instrument_cork_grease = models.BooleanField(default=False)
    instrument_neck_strap = models.BooleanField(default=False)
    instrument_swab = models.BooleanField(default=False)
    
    def __str__(self):
        return str(self.instrument)
    
class RepairInfo(models.Model):
    instrument = models.OneToOneField(Instrument, on_delete=models.CASCADE, null=True, related_name='repair_info')
    instrument_cosmetic_issues = models.TextField(default=None, max_length=500, blank=True, null=True)
    instrument_hardware_issues = models.TextField(default=None, max_length=500, blank=True, null=True)
    
    def __str__(self):
        return str(self.instrument)
   
class PreviousLoanInfo(models.Model):
    instrument = models.ForeignKey(Instrument, on_delete=models.CASCADE, null=True, related_name='previous_loan_info')
    student_first_name = models.CharField(max_length=200, blank=True, null=True)
    student_last_name = models.CharField(max_length=200, blank=True, null=True)
    student_email = models.CharField(max_length=200, blank=True, null=True)
    parent_first_name = models.CharField(max_length=200, blank=True, null=True)
    parent_last_name = models.CharField(max_length=200, blank=True, null=True)
    parent_email = models.CharField(max_length=200, blank=True, null=True)
    parent_phone = models.CharField(max_length=50, blank=True, null=True)
    loan_start = models.DateField(blank=True, default=now, null=True)
    is_returned = models.BooleanField(default=False, null=True)
    loan_end = models.DateField(default=None, blank=True, null=True)
    accept_contract = models.BooleanField(default=False, blank=False, null=True)
    
    def __str__(self):
        return str(self.instrument)
    
class CurrentLoanInfo(models.Model):
    instrument = models.OneToOneField(Instrument, on_delete=models.CASCADE, null=True, related_name='current_loan_info')
    student_first_name = models.CharField(max_length=200, blank=True, null=True)
    student_last_name = models.CharField(max_length=200, blank=True, null=True)
    student_email = models.CharField(max_length=200, blank=True, null=True)
    parent_first_name = models.CharField(max_length=200, blank=True, null=True)
    parent_last_name = models.CharField(max_length=200, blank=True, null=True)
    parent_email = models.CharField(max_length=200, blank=True, null=True)
    parent_phone = models.CharField(max_length=50, blank=True, null=True)
    loan_start = models.DateField(blank=True, default=now, null=True)
    is_returned = models.BooleanField(default=False, null=True)
    loan_end = models.DateField(default=None, blank=True, null=True)
    accept_contract = models.BooleanField(default=False, blank=False, null=True)
    
    def __str__(self):
        return str(self.instrument)
