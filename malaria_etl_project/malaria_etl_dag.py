# malaria_etl_dag.py
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from datetime import datetime, timedelta
import logging
from etl_module import etl_pipeline

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'email': ['alerts@example.com'],
    'email_on_failure': True,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

with DAG(
    'malaria_etl_pipeline',
    default_args=default_args,
    description='ETL DAG for processing synthetic malaria one health data',
    schedule_interval=timedelta(days=1),
    start_date=datetime(2025, 1, 1),
    catchup=False,
    tags=["malaria", "ETL", "OneHealth"]
) as dag:
    
    def run_etl():
        DATA_CSV_PATH = "/path/to/synthetic_malaria_one_health_data.csv"  # Update this path.
        DB_PATH = "/path/to/malaria_data.db"  # Update this path.
        TABLE_NAME = "malaria_outbreaks"
        CHUNK_SIZE = 10000
        
        logger.info("Starting the ETL process.")
        etl_pipeline(DATA_CSV_PATH, DB_PATH, TABLE_NAME, CHUNK_SIZE)
        logger.info("ETL process completed.")
    
    etl_task = PythonOperator(
        task_id='run_etl',
        python_callable=run_etl,
    )

    etl_task
