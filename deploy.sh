#!/bin/bash

APP_NAME=e-commerce-fe
DEPLOY_CONNECTION=root@139.59.255.226

echo "Installing npm packages..."
npm install

echo "Building Next.js application..."
npm run build

echo "Building Docker image..."
docker build -t ${APP_NAME} -f ./Dockerfile .

echo "Saving Docker image to tar file..."
docker save -o ${APP_NAME}.tar ${APP_NAME}

echo "Deploying application..."
scp -o StrictHostKeyChecking=no ./${APP_NAME}.tar ${DEPLOY_CONNECTION}:~
ssh -o StrictHostKeyChecking=no ${DEPLOY_CONNECTION} 'bash -s' < ./src/deploy/stg.sh

echo "Cleaning up local tar file..."
rm -f ./${APP_NAME}.tar

echo "Deployment complete."
