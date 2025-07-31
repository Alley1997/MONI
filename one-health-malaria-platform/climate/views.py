from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import ClimateDataSerializer


@api_view(['POST'])
def upload_climate_data(request):
    serializer = ClimateDataSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
