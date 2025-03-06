# Use an official Python runtime as a parent image
FROM python:3.13-slim

# Set environment variables for Python
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set working directory
WORKDIR /code

# Install system dependencies
RUN apt-get update && apt-get install -y libpq-dev gcc

# Copy the requirements file and install dependencies
COPY requirements.txt /code/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the Django project code
COPY . /code/

# Expose port 8000
EXPOSE 8000

# Run migrations and start the server
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
