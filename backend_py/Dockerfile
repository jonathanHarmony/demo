FROM python:3.11-slim

WORKDIR /app

# Copy requirements first for caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into a subdirectory 'backend_py'
# This preserves the package structure so relative imports work
COPY . backend_py/

# Set PYTHONPATH so python can find the backend_py package
ENV PYTHONPATH=/app

# Run the application as a module with hot-reloading for development
CMD ["uvicorn", "backend_py.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
