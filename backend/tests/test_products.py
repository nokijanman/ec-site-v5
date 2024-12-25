import os
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_read_products():
    print(f"DATABASE_URL: {os.environ.get('DATABASE_URL')}")
    response = client.get("/products/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
