from django.urls import path
from . import views
from .views import get_user_by_id, update_user, delete_user,login_view

urlpatterns = [
    path('register/', views.register_view),
    path('login/', login_view, name='login'),
    path('profile/', views.profile),
    path('users/', views.user_list),
    path('logged-in-user/', views.logged_in_user),
    path('users/<int:id>/', get_user_by_id, name='get_user_by_id'),
    path('users/<int:user_id>/update/', update_user, name='update_user'),
    path('users/<int:user_id>/delete/', delete_user, name='delete_user'), 
    path('users/create/', views.create_user, name='create_user'),
]
