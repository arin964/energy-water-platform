import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # Environment
    PYTHON_ENV = os.getenv('PYTHON_ENV', 'development')
    
    # Database
    POSTGRES_HOST = os.getenv('POSTGRES_HOST', 'localhost')
    POSTGRES_PORT = int(os.getenv('POSTGRES_PORT', 5432))
    POSTGRES_DB = os.getenv('POSTGRES_DB', 'energy_water_db')
    POSTGRES_USER = os.getenv('POSTGRES_USER', 'admin')
    POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD', 'admin123')
    
    # Model paths
    MODEL_DIR = 'app/trained_models'
    
    # Training parameters
    ENERGY_LSTM_UNITS = 64
    WATER_LSTM_UNITS = 64
    EPOCHS = 50
    BATCH_SIZE = 32
    
    @property
    def database_url(self):
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

settings = Settings()
