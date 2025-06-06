"""
URL configuration for admin_panel_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from django.shortcuts import redirect

# Redirect to the React frontend (signup page)
def redirect_to_signup(request):
    return redirect('http://localhost:5173/')  # Corrected URL

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),  # Assuming your user-related URLs are in 'users.urls'
    path('', redirect_to_signup),  # Redirect root URL to the frontend signup page
]
