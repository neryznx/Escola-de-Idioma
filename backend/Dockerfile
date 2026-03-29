FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

# Keep running using debug server for hot reload or regular server
CMD ["python", "app.py"]
