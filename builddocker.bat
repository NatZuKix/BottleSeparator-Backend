@echo off
echo Starting Docker container...
docker build -t iot/btapp-backend:1.0 .  
docker save -o app-backend.tar iot/btapp-backend:1.0
echo create  Docker image successfully!
pause