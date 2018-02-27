from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url

from . import views

app_name = 'homepage'
urlpatterns = [
    path('', views.index, name='index'),
    url(r'^ajax/search1/$', views.search1, name='search1'),
    url(r'^$', views.IndexPageView.as_view(), name='index'),
]
