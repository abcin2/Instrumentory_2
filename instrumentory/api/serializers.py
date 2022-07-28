from rest_framework.serializers import ModelSerializer, SlugRelatedField
from .models import *
from .models import WebsiteImage
from allauth.account.models import EmailAddress
from django.contrib.auth.models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

class WebsiteImageSerializer(ModelSerializer):
    class Meta:
        model = WebsiteImage
        fields = '__all__'
        
class EmailAddressSerializer(ModelSerializer):
    class Meta:
        model = EmailAddress
        fields = '__all__'
        
class ContactEmailSerializer(ModelSerializer):
    class Meta:
        model = ContactEmail
        fields = '__all__'
        
### FOR INSTRUMENTS

class AccessoriesSerializer(ModelSerializer):
    class Meta:
        model = Accessories
        fields = [
            'id',
            'instrument_mouthpiece',
            'instrument_slide_grease',
            'instrument_slide_oil',
            'instrument_valve_oil',
            'instrument_ligature',
            'instrument_reeds',
            'instrument_cork_grease',
            'instrument_neck_strap',
            'instrument_swab',
        ]
        
class RepairInfoSerializer(ModelSerializer):
    class Meta:
        model = RepairInfo
        fields = [
            'id',
            'instrument_cosmetic_issues',
            'instrument_hardware_issues'
        ]
        
class PreviousLoanInfoSerializer(ModelSerializer):
    class Meta:
        model = PreviousLoanInfo
        fields = '__all__'
        
class CurrentLoanInfoSerializer(ModelSerializer):
    class Meta:
        model = CurrentLoanInfo
        fields = [
            'id',
            'student_first_name',
            'student_last_name',
            'student_email',
            'parent_first_name',
            'parent_last_name',
            'parent_email',
            'parent_phone',
            'loan_start',
            'is_returned',
            'loan_end',
            'accept_contract'
        ]
        
class InstrumentSerializer(ModelSerializer):
    
    accessories = AccessoriesSerializer(many=False)
    current_loan_info = CurrentLoanInfoSerializer(many=False)
    previous_loan_info = PreviousLoanInfoSerializer(many=True)
    repair_info = RepairInfoSerializer(many=False)
    user = UserSerializer(many=False)
    
    class Meta:
        model = Instrument
        fields = [
            'id', 
            'instrument_type', 
            'instrument_serial', 
            'instrument_make', 
            'instrument_model', 
            'instrument_image',
            'user',
            'accessories',
            'current_loan_info',
            'previous_loan_info',
            'repair_info',
        ]
        
    # def to_representation(self, instance):
    #     self.fields['user'] =  UserSerializer(read_only=True)
    #     return super(InstrumentSerializer, self).to_representation(instance)


class LoanInfoSerializer(ModelSerializer):
    class Meta:
        
        instrument = InstrumentSerializer(many=False)
        previous_loan_info = PreviousLoanInfoSerializer(many=True)
        current_loan_info = CurrentLoanInfoSerializer(many=False)
        
        model = CurrentLoanInfo
        fields = '__all__'
        # fields = [
        #     'id',
        #     'instrument_type',
        #     'instrument_serial',
        #     'current_loan_info',
        #     'previous_loan_info'
        # ]
        
### FOR SCHOOLS
class SchoolSiteSerializer(ModelSerializer):
    class Meta:
        model = SchoolSite
        fields = [
            'id', 
            'name'
        ] #district field can be added but just displays the id of the district it is part of
                
class SchoolDistrictSerializer(ModelSerializer):
    
    site = SchoolSiteSerializer(many=True)
    
    class Meta:
        model = SchoolDistrict
        fields = [
            'id', 
            'name', 
            'district_code', 
            'verify_district_email', 
            'site'
        ]