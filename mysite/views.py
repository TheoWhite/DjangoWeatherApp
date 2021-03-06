from django.views import View
from django.shortcuts import render
from mysite.models import MyThing, MyUser
from django.core import serializers
from django.http import JsonResponse
import json
"""
render Returns:
						output: json db 
						status: Returns the status of the db (See state table)

State table:
	0: All good!
	1: No City or User
	2: Invalid data
"""

class Hello(View):
	def get(self, request):
		dataList = serializers.serialize("json",MyThing.objects.all())
		#dataList = list(MyThing.objects.all().values())
		
		return render(request,"hello.html",{"output":dataList,"status":"-1"})
	def post(self, request):
		status = 0
		"The owner is request.POST['owner']"
		"The stuff is request.POST['stuff']"
		"Inputted data is the data that comes from the user."
		if(request.POST["owner"] and request.POST["stuff"]):
			"""
			Check if owner & stuff is not empty. If its empty skip.
			Next step we should validate this.
			"""
			a=MyUser.objects.filter(data=request.POST["owner"])
			if len(a)==0:
				o = MyUser(data=request.POST["owner"])
				o.save()
			else:
				o = a[0]
			myData = MyThing(owner=o,data=request.POST["stuff"])
			myData.save()
			#dataList = list(MyThing.objects.all().values())
		else: 
			status = "1"
		dataList = serializers.serialize("json",MyThing.objects.all())
		return render(request,"hello.html",{"output":dataList,"status":status})

class Item(View):
	def get(self,request):
		ret = MyThing.objects.all().values()
		return JsonResponse(json.dumps(list(ret)),safe=False)
