import django.db.models

class MyUser(django.db.models.Model):
	data = django.db.models.CharField(max_length=10,primary_key=True)
	def __str__(self):
		return self.data
	
class MyThing(django.db.models.Model):
	data = django.db.models.CharField(max_length=10)
	owner = django.db.models.ForeignKey(MyUser,on_delete=django.db.models.CASCADE, default="default")
	def __str__(self):
		return self.data