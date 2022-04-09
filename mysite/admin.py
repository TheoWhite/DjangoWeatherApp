from django.contrib import admin
from mysite.models import MyThing, MyUser

admin.site.register(MyThing)
admin.site.register(MyUser)