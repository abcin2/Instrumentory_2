from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import *

# Register your models here.
admin.site.register(WebsiteImage)

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['email', 'username']
    
admin.site.register(CustomUser, CustomUserAdmin)

admin.site.register(ContactEmail)

admin.site.register(Instrument)
admin.site.register(Accessories)
admin.site.register(RepairInfo)
admin.site.register(PreviousLoanInfo)
admin.site.register(CurrentLoanInfo)
admin.site.register(SchoolDistrict)
admin.site.register(SchoolSite)