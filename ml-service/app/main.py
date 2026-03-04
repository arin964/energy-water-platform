from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import predict, optimize

app = FastAPI(
    title="Energy-Water ML Service",
    description="Machine Learning API for Energy and Water Forecasting",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check
@app.get("/")
async def root():
    return {
        "message": "Energy-Water ML Service is running",
        "version": "1.0.0",
        "status": "healthy"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Include routes
app.include_router(predict.router, prefix="/predict", tags=["Predictions"])
app.include_router(optimize.router, prefix="/optimize", tags=["Optimization"])
