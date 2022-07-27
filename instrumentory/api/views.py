from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User, Group
from django.core.mail import send_mail
from urllib3 import HTTPResponse
from .models import *
from .serializers import *
from .decorators import *

from allauth.account.models import EmailAddress

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'token/',
        'token/refresh/',
        # USER VIEWS
        'users/',
        'users/create/',
        'users/<str:pk>/',
        'usres/<str:pk>/update/',
        'users/<str:pk>/delete/',
        # WEBSITE IMAGES VIEWS
        'website_images/',
        'website_images/create/',
        'website_images/<str:pk>/',
        'website_images/<str:pk>/update/',
        'website_images/<str:pk>/delete/',
        # INSTRUMENT VIEWS
        'instruments/',
        'instruments/create/',
        'instruments/<str:pk>/',
        'instruments/<str:pk>/update/',
        'instruments/<str:pk>/delete/',
        # DISTRICT VIEWS
        'instruments/',
        'instruments/<str:pk>/',
        # CONTACT EMAILS
        'contact_emails/',
        'contact_emails/send/',
        'contact_emails/<str:pk>/',
        'contact_emails/<str:pk>/delete/',
        # EMAIL VALIDATIONS
        'email_validations/',
        'email_validation/<str:pk>',
        # REST AUTH
        'auth/register/',
        'auth/login/', #currently not used
        'auth/logout/',
        'auth/verify_email/',
        'auth/account_confirm_email',
    ]
    return Response(routes)

## SHOULD CREATE API VIEWS FOR EACH ITEM WITHIN EACH ROUTE ALL W/ GET REQUESTS

### USERS ###
#############

@api_view(['GET'])
def getAllUsers(request):
    users = CustomUser.objects.all()
    serializer = UserSerializer(users, many=True)
    
    return Response(serializer.data)

@api_view(['GET'])
def getUser(request, pk):
    user = CustomUser.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    
    return Response(serializer.data)

@api_view(['POST'])
def createUser(request):
    data = request.data
    user = CustomUser.objects.create_user(
        # body=data['body']
        username = data['username'],
        email = data['email'],
        password = data['password']
    )
    
    serializer = UserSerializer(user, many=False)
    
    return Response(serializer.data)

@api_view(['PUT'])
def updateUser(request, pk):
    data = request.data
    user = CustomUser.objects.get(id=pk)
    serializer = UserSerializer(instance=user, data=data)
    
    if serializer.is_valid():
        serializer.save()
        
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteUser(request, pk):
    user = CustomUser.objects.get(id=pk)
    user.delete()
    
    return Response('Image was deleted!')

### EMAIL VALIDATION ###
########################

@api_view(['GET'])
def getEmailValidations(request):
    all_emails = EmailAddress.objects.all()
    serializer = EmailAddressSerializer(all_emails, many=True)
    
    return Response(serializer.data)

@api_view(['GET'])
def getEmailValidation(request, pk):
    all_emails = EmailAddress.objects.get(user=pk)
    serializer = EmailAddressSerializer(all_emails, many=False)
    
    return Response(serializer.data)

### WEBSITE IMAGES ###
######################

@api_view(['GET'])
def getWebsiteImages(request):
    website_images = WebsiteImage.objects.all()
    serializer = WebsiteImageSerializer(website_images, many=True)
    
    return Response(serializer.data)

@api_view(['GET'])
def getWebsiteImage(request, pk):
    website_images = WebsiteImage.objects.get(id=pk)
    serializer = WebsiteImageSerializer(website_images, many=False)
    
    return Response(serializer.data)

@api_view(['POST'])
def createWebsiteImage(request):
    data = request.data
    website_images = WebsiteImage.objects.create(
        body=data['body']
    )
    serializer = WebsiteImageSerializer(website_images, many=False)
    
    return Response(serializer.data)

@api_view(['PUT'])
def updateWebsiteImage(request, pk):
    data = request.data
    website_image = WebsiteImage.objects.get(id=pk)
    serializer = WebsiteImageSerializer(instance=website_image, data=data)
    
    if serializer.is_valid():
        serializer.save()
        
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteWebsiteImage(request, pk):
    website_image = WebsiteImage.objects.get(id=pk)
    website_image.delete()
    
    return Response('Image was deleted!')

### SEND EMAIL VIEWS ###
########################

@api_view(['GET'])
def getContactEmails(request):
    contact_emails = ContactEmail.objects.all()
    serializer = ContactEmailSerializer(contact_emails, many=True)
    
    return Response(serializer.data)

@api_view(['GET'])
def getContactEmail(request, pk):
    contact_email = ContactEmail.objects.get(id=pk)
    serializer = ContactEmailSerializer(contact_email, many=False)
    
    return Response(serializer.data)

@api_view(['POST'])
def sendContactEmail(request):
    data = request.data
    composed_emails = ContactEmail.objects.create(
        name = data['name'],
        email = data['email'],
        message = data['message']
    )
    
    send_mail(
        'Contact Form', #subject
        data['message'], #message
        data['email'], #from
        ['robert.hovey95@gmail.com'], #to
        fail_silently=False
    )
    
    serializer = ContactEmailSerializer(composed_emails, many=False)
    
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteContactEmail(request, pk):
    contact_email = WebsiteImage.objects.get(id=pk)
    contact_email.delete()
    
    return Response('Email was deleted!')

### INSTRUMENT VIEWS

@api_view(['GET'])
def getAllInstruments(request):
    instruments = Instrument.objects.all()
    serializer = InstrumentSerializer(instruments, many=True)
    
    return Response(serializer.data)

@api_view(['GET'])
def getInstrument(request, pk):
    instrument = Instrument.objects.get(id=pk)
    serializer = InstrumentSerializer(instrument, many=False)
    
    return Response(serializer.data)

@api_view(['POST'])
def createInstrument(request):
    data = request.data
    # print(data)
    instrument = Instrument.objects.create(
        user = CustomUser.objects.get(username=data['user']),
        instrument_type = data['instrument_type'],
        instrument_serial = data['instrument_serial'],
        instrument_make = data['instrument_make'],
        instrument_model = data['instrument_model'],
        instrument_image = data['instrument_image'],
    )
    
    accessories = Accessories.objects.create(
        instrument = instrument,
        instrument_mouthpiece = data['instrument_mouthpiece'] == 'true',
        instrument_slide_grease = data['instrument_slide_grease'] == 'true',
        instrument_slide_oil = data['instrument_slide_oil'] == 'true',
        instrument_valve_oil = data['instrument_valve_oil'] == 'true',
        instrument_ligature = data['instrument_ligature'] == 'true',
        instrument_reeds = data['instrument_reeds'] == 'true',
        instrument_cork_grease = data['instrument_cork_grease'] == 'true',
        instrument_neck_strap = data['instrument_neck_strap'] == 'true',
        instrument_swab = data['instrument_swab'] == 'true',
    )
        
    loan_info = CurrentLoanInfo.objects.create(
        instrument = instrument,
        student_first_name = None,
        student_last_name = None,
        student_email = None,
        parent_first_name = None,
        parent_last_name = None,
        parent_email = None,
        parent_phone = None,
        loan_start = None,
        is_returned = None,
        loan_end = None,
        accept_contract = None
    )
    
    repair_info = RepairInfo.objects.create(
        instrument = instrument,
        instrument_cosmetic_issues = None,
        instrument_hardware_issues = None
    )
    
    instrument_serializer = InstrumentSerializer(instrument, many=False)
    accessories_serializer = AccessoriesSerializer(accessories, many=False)
    current_loan_info_serializer = CurrentLoanInfoSerializer(loan_info, many=False)
    repair_info_serializer = RepairInfoSerializer(repair_info, many=False)
        
    return Response([
        instrument_serializer.data, 
        accessories_serializer.data, 
        current_loan_info_serializer.data, 
        repair_info_serializer.data
    ])

@api_view(['PUT'])
def updateInstrument(request, pk):
    data = request.data
    
    instrument = Instrument.objects.get(id=pk)
    accessories = Accessories.objects.get(instrument=instrument)
    
    instrument.instrument_type = data['instrument_type']
    instrument.instrument_serial = data['instrument_serial']
    instrument.instrument_make = data['instrument_make']
    instrument.instrument_model = data['instrument_model']
    instrument.instrument_image = data['instrument_image']
    accessories.instrument_mouthpiece = data['instrument_mouthpiece'] == 'true'
    accessories.instrument_ligature = data['instrument_ligature'] == 'true'
    accessories.instrument_slide_grease = data['instrument_slide_grease'] == 'true'
    accessories.instrument_cork_grease = data['instrument_cork_grease'] == 'true'
    accessories.instrument_slide_oil = data['instrument_slide_oil'] == 'true'
    accessories.instrument_valve_oil = data['instrument_valve_oil'] == 'true'
    accessories.instrument_reeds = data['instrument_reeds'] == 'true'
    accessories.instrument_neck_strap = data['instrument_neck_strap'] == 'true'
    accessories.instrument_swab = data['instrument_swab'] == 'true'
    
    instrument.save()
    accessories.save()
    
    return Response('Data successfully updated')

@api_view(['DELETE'])
def deleteInstrument(request, pk):
    instrument = Instrument.objects.get(id=pk)
    instrument.delete()
    
    return Response('Instrument was deleted!')

### ACCESSORY VIEWS ###
#######################

@api_view(['GET'])
def getAllAccessoryInfo(request):
    accessory_infos = Accessories.objects.all()
    serializer = AccessoriesSerializer(accessory_infos, many=True)
    
    return Response(serializer.data)

### LOAN INFO VIEWS ###
#######################

@api_view(['GET'])
def getAllLoanInfo(request):
    previous_loan_infos = PreviousLoanInfo.objects.all()
    current_loan_info = CurrentLoanInfo.objects.all()
    previous_serializer = LoanInfoSerializer(previous_loan_infos, many=True)
    current_serializer = LoanInfoSerializer(current_loan_info, many=False)
    
    return Response([previous_serializer.data, current_serializer.data])

@api_view(['PUT'])
def updateLoanInfo(request, pk):
    data = request.data
    instrument = Instrument.objects.get(id=pk)
    current_loan_info_id = instrument.current_loan_info.id
    current_loan_info = CurrentLoanInfo.objects.get(id=current_loan_info_id)
    
    current_loan_info.student_first_name = data['student_first_name']
    current_loan_info.student_last_name = data['student_last_name']
    current_loan_info.student_email = data['student_email']
    current_loan_info.parent_first_name = data['parent_first_name']
    current_loan_info.parent_last_name = data['parent_last_name']
    current_loan_info.parent_email = data['parent_email']
    current_loan_info.parent_phone = data['parent_phone']
    current_loan_info.loan_start = data['loan_start']
    current_loan_info.loan_end = data['loan_end']
    current_loan_info.accept_contract = data['accept_contract']
    
    current_loan_info.save()
    
    return Response('Loan Info successfully updated!')
    

### REPAIR INFO VIEWS ###
#########################

@api_view(['GET'])
def getAllRepairInfo(request):
    repair_infos = RepairInfo.objects.all()
    serializer = RepairInfoSerializer(repair_infos, many=True)
    
    return Response(serializer.data)

@api_view(['GET'])
def getRepairInfo(request, pk):
    instrument = Instrument.objects.get(id=pk)
    repair_info = RepairInfo.objects.get(instrument=instrument)
    serializer = RepairInfoSerializer(repair_info, many=False)
    
    return Response(serializer.data)

@api_view(['POST'])
def createRepairInfo(request):
    data = request.data
    instrument_serial = data['instrument_serial']
    instrument = Instrument.objects.get(instrument_serial=instrument_serial)
    repair_info = RepairInfo.objects.create(
        instrument = instrument,
        instrument_cosmetic_issues = None,
        instrument_hardware_issues = None,
    )
    
    serializer = RepairInfoSerializer(repair_info, many=False)
    
    return Response(serializer.data)

@api_view(['PUT'])
def updateRepairInfo(request, pk):
    data = request.data
    instrument = Instrument.objects.get(id=pk)
    repair_info_id = instrument.repair_info.id
    repair_info = RepairInfo.objects.get(id=repair_info_id)
    
    repair_info.instrument_cosmetic_issues = data['cosmetic_issues']
    repair_info.instrument_hardware_issues = data['hardware_issues']
    
    repair_info.save()
        
    return Response('Repair Info successfully updated!')

@api_view(['DELETE'])
def deleteRepairInfo(request, pk):
    instrument = Instrument.objects.get(id=pk)
    repair_info = RepairInfo.objects.get(instrument=instrument)
    repair_info.delete()
    
    return Response('Repair Info was deleted!')

### SCHOOL DISTRICT VIEWS ###
#############################

@api_view(['GET'])
def getAllDistricts(request):
    districts = SchoolDistrict.objects.all()
    district_serializer = SchoolDistrictSerializer(districts, many=True)

    return Response(district_serializer.data)

@api_view(['GET'])
def getDistrict(request, pk):
    district = SchoolDistrict.objects.get(id=pk)
    serializer = SchoolDistrictSerializer(district, many=False)
    
    return Response(serializer.data)

### ONLY ADMIN CAN CREATE/CHANGE/DELETE DISTRICT/SITE INFORMATION
