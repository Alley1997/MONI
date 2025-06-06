# etl_module.py
import pandas as pd
import sqlite3
import logging

# ============================================
# Configuration Constants
# ============================================
CSV_FILE_PATH = "/Users/alex/Documents/GitHub/MONI/malaria_etl_project/synthetic_malaria_one_health_data.csv"  # Place your CSV file in the same directory or update path.
DB_PATH = "malaria_data.db"
TABLE_NAME = "malaria_outbreaks"
CHUNK_SIZE = 10000

# ============================================
# Logging Configuration
# ============================================
logging.basicConfig(level=logging.INFO, 
                    format="%(asctime)s [%(levelname)s] %(message)s",
                    datefmt="%Y-%m-%d %H:%M:%S")
logger = logging.getLogger(__name__)

# ============================================
# Data Extraction Function
# ============================================
def extract_data(file_path: str, chunk_size: int = 10000):
    try:
        for chunk in pd.read_csv(file_path, chunksize=chunk_size):
            logger.info(f"Extracted a chunk with {len(chunk)} rows.")
            yield chunk
    except Exception as e:
        logger.error(f"Error extracting data: {str(e)}")
        raise

# ============================================
# Data Transformation Function
# ============================================
def transform_data(df: pd.DataFrame) -> pd.DataFrame:
    df_transformed = df.copy()
    critical_columns = ['date', 'case_count']
    missing_before = len(df_transformed)
    df_transformed.dropna(subset=critical_columns, inplace=True)
    missing_after = len(df_transformed)
    logger.info(f"Dropped {missing_before - missing_after} rows due to missing critical data.")
    
    if 'date' in df_transformed.columns:
        try:
            df_transformed['date'] = pd.to_datetime(df_transformed['date'], errors='coerce')
            df_transformed['date'] = df_transformed['date'].dt.strftime('%Y-%m-%d')
            logger.info("Converted 'date' column to ISO format.")
        except Exception as e:
            logger.error(f"Error processing the 'date' column: {str(e)}")
    
    if "region" in df_transformed.columns:
        df_transformed["region"] = df_transformed["region"].str.lower()
        logger.info("Normalized 'region' column to lowercase.")
    
    return df_transformed

# ============================================
# Data Loading Function
# ============================================
def load_data(df: pd.DataFrame, db_path: str, table_name: str):
    try:
        with sqlite3.connect(db_path) as conn:
            df.to_sql(table_name, conn, if_exists='append', index=False)
            logger.info(f"Loaded {len(df)} rows into table '{table_name}'.")
    except Exception as e:
        logger.error(f"Error loading data into database: {str(e)}")
        raise

# ============================================
# ETL Pipeline Function
# ============================================
def etl_pipeline(file_path: str, db_path: str, table_name: str, chunk_size: int = 10000):
    logger.info("Starting the ETL pipeline.")
    for chunk in extract_data(file_path, chunk_size):
        transformed_chunk = transform_data(chunk)
        load_data(transformed_chunk, db_path, table_name)
    logger.info("ETL pipeline completed successfully.")

if __name__ == "__main__":
    etl_pipeline(CSV_FILE_PATH, DB_PATH, TABLE_NAME, CHUNK_SIZE)
