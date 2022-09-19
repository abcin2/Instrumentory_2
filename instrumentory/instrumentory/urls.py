"""instrumentory URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from dj_rest_auth.registration.views import VerifyEmailView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    # ALL FRONTEND URLS
    # General
    path('', TemplateView.as_view(template_name='index.html')),
    path('contact/', TemplateView.as_view(template_name='index.html')),
    path('whats_next/', TemplateView.as_view(template_name='index.html')),
    path('account/', TemplateView.as_view(template_name='index.html')),
    # Auth Routes
    path('login/', TemplateView.as_view(template_name='index.html')),
    path('register/', TemplateView.as_view(template_name='index.html')),
    path('forgot_password/', TemplateView.as_view(template_name='index.html')),
    path('verify_email_sent/', TemplateView.as_view(template_name='index.html')),
    path('account_confirm_email/<str:key>/', TemplateView.as_view(template_name='index.html'), name='account_confirm_email'),
    path('account_change_password/<str:id>/<str:pk>/<str:key>', TemplateView.as_view(template_name='index.html')),
    # Allauth Routes
    #path('account_confirm_email/(?P<key>[-:\w]+)/$', VerifyEmailView.as_view(), name='account_confirm_email'),
    # Teacher Routes
    path('dashboard/', TemplateView.as_view(template_name='index.html')),
    path('dashboard_test/', TemplateView.as_view(template_name='index.html')),
    path('full_inventory/', TemplateView.as_view(template_name='index.html')),
    path('available_instruments/', TemplateView.as_view(template_name='index.html')),
    path('loaned_instruments/', TemplateView.as_view(template_name='index.html')),
    path('broken_instruments/', TemplateView.as_view(template_name='index.html')),
    path('add_instrument/', TemplateView.as_view(template_name='index.html')),
    path('update_instrument/<str:id>/', TemplateView.as_view(template_name='index.html')),
]
