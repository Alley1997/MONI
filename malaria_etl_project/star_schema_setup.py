# star_schema_setup.py
import sqlite3
import logging

logging.basicConfig(level=logging.INFO,
                    format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

DB_PATH = "malaria_star_schema.db"

def create_star_schema(db_path: str):
    try:
        with sqlite3.connect(db_path) as conn:
            cursor = conn.cursor()
            
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS time_dimension (
                    time_id INTEGER PRIMARY KEY,
                    calendar_date TEXT,
                    year INTEGER,
                    month INTEGER,
                    day INTEGER,
                    weekday TEXT
                )
            """)
            logger.info("Created or verified table: time_dimension")
            
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS location_dimension (
                    location_id INTEGER PRIMARY KEY,
                    country TEXT,
                    region TEXT,
                    latitude REAL,
                    longitude REAL
                )
            """)
            logger.info("Created or verified table: location_dimension")
            
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS environmental_dimension (
                    env_id INTEGER PRIMARY KEY,
                    temperature REAL,
                    rainfall REAL,
                    humidity REAL,
                    vegetation_index REAL
                )
            """)
            logger.info("Created or verified table: environmental_dimension")
            
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS fact_malaria_outbreaks (
                    outbreak_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    time_id INTEGER,
                    location_id INTEGER,
                    env_id INTEGER,
                    case_count INTEGER,
                    mortality_rate REAL,
                    FOREIGN KEY (time_id) REFERENCES time_dimension(time_id),
                    FOREIGN KEY (location_id) REFERENCES location_dimension(location_id),
                    FOREIGN KEY (env_id) REFERENCES environmental_dimension(env_id)
                )
            """)
            logger.info("Created or verified table: fact_malaria_outbreaks")
            
            conn.commit()
    except Exception as e:
        logger.error(f"Error while creating star schema tables: {str(e)}")
        raise

if __name__ == "__main__":
    create_star_schema(DB_PATH)
