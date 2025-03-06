from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import TransactionSerializers
from .models import Transaction

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializers

@api_view(['GET', 'POST'])
def transactions(request):
    if request.method == 'GET':
        transactions = Transaction.objects.all()
        serializer = TransactionSerializers(transactions, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = TransactionSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)