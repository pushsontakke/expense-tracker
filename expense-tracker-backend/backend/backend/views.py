from django.http import HttpResponse
#
# def home(request):
#     return HttpResponse("hello world!, This is Home Page.")

def about(request):
    return HttpResponse("hello user!, This is about Page.")

