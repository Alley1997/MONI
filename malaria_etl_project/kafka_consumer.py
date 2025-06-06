# kafka_consumer.py
from confluent_kafka import Consumer, KafkaException
import json
import logging
import sqlite3

logging.basicConfig(level=logging.INFO,
                    format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

KAFKA_BOOTSTRAP_SERVERS = 'localhost:9092'
KAFKA_TOPIC = 'malaria_live_data'
GROUP_ID = 'malaria_consumer_group'

DB_PATH = 'malaria_live_data.db'
TABLE_NAME = 'live_malaria_cases'

def process_message(message_value):
    try:
        data = json.loads(message_value)
        return data
    except Exception as e:
        logger.error(f"Error processing message: {e}")
        return None

def load_live_data(data, db_path, table_name):
    try:
        with sqlite3.connect(db_path) as conn:
            cursor = conn.cursor()
            cursor.execute(f"""
                CREATE TABLE IF NOT EXISTS {table_name} (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    event_time TEXT,
                    case_count INTEGER,
                    extra_info TEXT
                )
            """)
            conn.commit()
            cursor.execute(f"""
                INSERT INTO {table_name} (event_time, case_count, extra_info)
                VALUES (?, ?, ?)
            """, (data.get('event_time'), data.get('case_count'), data.get('extra_info', '')))
            conn.commit()
            logger.info("Live data loaded into the database.")
    except Exception as e:
        logger.error(f"Error loading live data: {e}")

def start_kafka_consumer():
    consumer_conf = {
        'bootstrap.servers': KAFKA_BOOTSTRAP_SERVERS,
        'group.id': GROUP_ID,
        'auto.offset.reset': 'earliest'
    }
    consumer = Consumer(consumer_conf)
    
    try:
        consumer.subscribe([KAFKA_TOPIC])
        logger.info(f"Subscribed to Kafka topic: {KAFKA_TOPIC}")
        
        while True:
            msg = consumer.poll(1.0)
            if msg is None:
                continue
            if msg.error():
                logger.error(f"Consumer error: {msg.error()}")
                continue
            message_str = msg.value().decode('utf-8')
            data = process_message(message_str)
            if data:
                load_live_data(data, DB_PATH, TABLE_NAME)
    except KeyboardInterrupt:
        logger.info("Kafka consumer interrupted by user.")
    except KafkaException as e:
        logger.error(f"Kafka exception: {e}")
    finally:
        consumer.close()
        logger.info("Kafka consumer closed.")

if __name__ == '__main__':
    start_kafka_consumer()
