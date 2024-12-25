import socket
from fastapi import FastAPI
from .routers import products
import os

app = FastAPI()

app.include_router(products.router, prefix="/products", tags=["products"])

@app.get("/")
async def read_root():
    supabase_url = os.getenv("VITE_SUPABASE_URL")
    try:
        ip_address = socket.gethostbyname(supabase_url.split("//")[1])
        print(f"Supabase URL {supabase_url} resolves to {ip_address}")
    except socket.gaierror as e:
        print(f"Error resolving Supabase URL {supabase_url}: {e}")
    return {"Hello": "World"}
