from django.http import HttpResponse
from django.shortcuts import render, redirect
from .forms import DataUploadForm
import pandas as pd
from malaria_dashboard.models import (
    HumanHealthIndicator,
    AnimalHealthIndicator,
    EnvironmentalClimaticIndicator,
)


def upload_data(request):
    if request.method == "POST":
        form = DataUploadForm(request.POST, request.FILES)
        if form.is_valid():
            file = request.FILES["data_file"]
            data_type = form.cleaned_data["data_type"]

            # Read file based on extension
            if file.name.endswith(".csv"):
                df = pd.read_csv(file)
            elif file.name.endswith(".xlsx"):
                df = pd.read_excel(file)
            elif file.name.endswith(".dta"):
                df = pd.read_stata(file)
            else:
                return render(
                    request,
                    "data_uploader/error.html",
                    {"message": "Unsupported file format."},
                )

            # Call correct model saver
            if data_type == "human":
                for _, row in df.iterrows():
                    HumanHealthIndicator.objects.create(
                        location=row["location"],
                        date=row["date"],
                        malaria_incidence=row.get("malaria_incidence"),
                        test_positivity_rate=row.get("test_positivity_rate"),
                        parasite_prevalence=row.get("parasite_prevalence"),
                        anemia_prevalence=row.get("anemia_prevalence"),
                        malaria_mortality_rate=row.get("malaria_mortality_rate"),
                    )

            elif data_type == "animal":
                for _, row in df.iterrows():
                    AnimalHealthIndicator.objects.create(
                        location=row["location"],
                        date=row["date"],
                        livestock_density=row.get("livestock_density"),
                        livestock_ownership=row.get("livestock_ownership"),
                        itl_coverage=row.get("itl_coverage"),
                        distance_to_livestock=row.get("distance_to_livestock"),
                        dominant_livestock_type=row.get("dominant_livestock_type"),
                    )

            elif data_type == "environment":
                for _, row in df.iterrows():
                    EnvironmentalClimaticIndicator.objects.create(
                        location=row["location"],
                        date=row["date"],
                        rainfall=row.get("rainfall"),
                        temperature=row.get("temperature"),
                        humidity=row.get("humidity"),
                        ndvi=row.get("ndvi"),
                        evapotranspiration=row.get("evapotranspiration"),
                    )

            return redirect("upload_success")

    else:
        form = DataUploadForm()

    return render(request, "data_uploader/upload.html", {"form": form})


def upload_success(request):
    return HttpResponse("✅ Upload successful!")
