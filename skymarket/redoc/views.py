from django.shortcuts import render


def redoc(request):
    return render(request, 'redoc.html')


def redoc_json(request):
    return render(request, 'redoc-2.json')
