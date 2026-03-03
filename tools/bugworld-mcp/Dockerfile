# BUGWORLD MCP — Dockerfile
# Spec: v260303.1 | Constraint: zero_china_dependencies

FROM python:3.11-slim-bookworm

# Install dependencies (no China mirrors)
RUN pip install --no-cache-dir flask requests

WORKDIR /app

# Copy MCP service code
COPY message_bus.py .
COPY config.json .

# Expose MCP bus port
EXPOSE 8765

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD python -c "import requests; requests.get('http://localhost:8765/health')"

# Run service
CMD ["python", "message_bus.py"]