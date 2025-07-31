import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

# Set random seed for reproducibility
np.random.seed(42)
random.seed(42)


# Helper functions
def random_date(start, end):
    return start + timedelta(days=random.randint(0, (end - start).days))


def generate_synthetic_data(n=10000):
    start_date = datetime(2021, 1, 1)
    end_date = datetime(2023, 12, 31)

    data = {
        "RecordID": range(1, n + 1),
        "CollectionDate": [
            random_date(start_date, end_date).strftime("%Y-%m-%d") for _ in range(n)
        ],
        "ConfirmedMalariaCases": np.random.poisson(5, n),
        "SuspectedMalariaCasesTested": np.random.poisson(10, n),
        "MalariaTestPositivityRate": np.round(np.random.uniform(0.1, 0.9, n), 2),
        "MalariaIncidenceRate": np.round(np.random.uniform(10, 500), 2),
        "SevereMalariaCases": np.random.poisson(1, n),
        "MalariaDeaths": np.random.binomial(1, 0.01, n),
        "OutpatientMalariaVisits": np.random.poisson(8, n),
        "InpatientMalariaAdmissions": np.random.poisson(2, n),
        "ChildMalariaCases": np.random.poisson(3, n),
        "MalariaInPregnancy": np.random.poisson(1, n),
        "ITNOwnershipPercent": np.round(np.random.uniform(50, 100, n), 1),
        "ITNUsagePercent": np.round(np.random.uniform(30, 90, n), 1),
        "IRSCoveragePercent": np.round(np.random.uniform(20, 80, n), 1),
        "Temperature": np.round(np.random.normal(27, 3, n), 1),
        "Precipitation": np.round(np.random.exponential(50, n), 1),
        "NDVI": np.round(np.random.uniform(0.1, 0.8, n), 2),
        "Elevation": np.round(np.random.uniform(0, 2000, n), 1),
        "UrbanPopulationPercent": np.round(np.random.uniform(10, 70, n), 1),
        "Under5PopulationPercent": np.round(np.random.uniform(10, 20, n), 1),
        "GDPPerCapita": np.round(np.random.normal(500, 100, n), 2),
        "ImprovedWaterAccessPercent": np.round(np.random.uniform(40, 90, n), 1),
    }

    return pd.DataFrame(data)


# Generate and save synthetic dataset
df_synthetic = generate_synthetic_data(10000)
df_synthetic.to_csv("synthetic_malaria_one_health_data.csv", index=False)
print(
    "Synthetic dataset with 10,000 records created and saved as 'synthetic_malaria_one_health_data.csv'."
)
