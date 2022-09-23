from django.urls import path, re_path
from . import views

from rest_framework_simplejwt.views import (
   TokenRefreshView,
)

from dj_rest_auth.registration.views import RegisterView, VerifyEmailView, ResendEmailVerificationView
from dj_rest_auth.views import LoginView, LogoutView, PasswordResetView, PasswordResetConfirmView, PasswordChangeView

from .views import MyTokenObtainPairView

urlpatterns = [
   path('', views.getRoutes, name='API routes'),
   ### JWT AUTHENTICATION
   path('token/', MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
   path('token/refresh/', TokenRefreshView.as_view(), name="token_refresh"),
   ### USERS
   path('users/', views.getAllUsers, name='get-all-users'),
   path('users/create/', views.createUser, name='create-user'),
   path('users/<str:pk>/', views.getUser, name='get-user'),
   path('users/<str:pk>/update/', views.updateUser, name='update-user'),
   path('users/<str:pk>/delete/', views.deleteUser, name='delete-user'),
   ### WEBSITE IMAGES
   path('website_images/', views.getWebsiteImages, name='get-website-images'),
   path('website_images/create/', views.createWebsiteImage, name="create-website-image"),
   path('website_images/<str:pk>/', views.getWebsiteImage, name="get-website-image"),
   path('website_images/<str:pk>/update/', views.updateWebsiteImage, name="update-website-image"),
   path('website_images/<str:pk>/delete/', views.deleteWebsiteImage, name="delete-website-image"),
   ### INSTRUMENTS
   path('instruments/', views.getAllInstruments, name='get-all-instruments'),
   path('instruments/create/', views.createInstrument, name='create-instrument'),
   path('instruments/<str:pk>/', views.getInstrument, name='get-instrument'),
   path('instruments/<str:pk>/update/', views.updateInstrument, name='update-instrument'),
   path('instruments/<str:pk>/delete/', views.deleteInstrument, name='delete-instrument'),
   # ACCESSORY INFO
   path('accessories/', views.getAllAccessoryInfo, name='get-all-accessory-info'),
   # LOAN INFO
   path('loan_info/', views.getAllLoanInfo, name='get-all-loan-info'),
   path('loan_info/<str:pk>/update/', views.updateLoanInfo, name='update-loan-info'),
   path('loan_info/<str:pk>/archive/', views.archiveLoanInfo, name='archive-loan-info'),
   # REPAIR INFO
   path('repair_info/', views.getAllRepairInfo, name='get-all-repair-info'),
   path('repair_info/create/', views.createRepairInfo, name='create-repair-info'),
   path('repair_info/<str:pk>/', views.getRepairInfo, name='get-repair-info'),
   path('repair_info/<str:pk>/update/', views.updateRepairInfo, name='update-repair-info'),
   path('repair_info/<str:pk>/delete/', views.deleteRepairInfo, name='delete-repair-info'),
   ### DISTRICTS
   path('districts/', views.getAllDistricts, name='get-all-districts'),
   path('districts/<str:pk>/', views.getDistrict, name='get-district'),
   ### CONTACT US EMAIL
   path('contact_emails/', views.getContactEmails, name='get-contact-emails'),
   path('contact_emails/send/', views.sendContactEmail, name='send-contact-email'),
   path('contact_emails/<str:pk>/', views.getContactEmail, name="get-contact-email"),
   path('contact_emails/<str:pk>/delete/', views.deleteContactEmail, name="delete-contact-email"),
   ### EMAIL VALIDATIONS
   path('email_validations', views.getEmailValidations, name="get-email-validations"),
   path('email_validation/<str:pk>/', views.getEmailValidation, name="get-email-validation"),
   ### REST AUTH
   path('auth/register/', RegisterView.as_view()),
   path('auth/login/', LoginView.as_view()),
   path('auth/logout/', LogoutView.as_view()),
   path('auth/account_confirm_email/', VerifyEmailView.as_view(), name='api-account-confirm-email-no-key'),
   # if the api call from this route is successful, email url is constructed from get_email_confirmation_url() in allauth/account/adapter.py
   re_path(r'^auth/account_confirm_email/(?P<key>[-:\w]+)/$', VerifyEmailView.as_view(), name='api-account-confirm-email'),
   path('auth/resend_email/', ResendEmailVerificationView.as_view(), name='resend_email_verification'),
   # after entering email, email is generated with link from dj_rest_auth/forms.py line 48
   path('auth/change_password/', PasswordResetView.as_view(), name='change-password'),
   path('auth/password_reset_confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
   ### EXAMPLES
   # path('examples/', views.getExamples, name="examples"),
   # path('examples/<str:pk>/', views.getExample, name="example"),
   # path('examples/<str:pk>/update/', views.updateExample, name="update-example"),
   # path('examples/<str:pk>/delete/', views.deleteExample, name="delete-example"),
   # path('examples/create/', views.createExample, name="create-example"),
]