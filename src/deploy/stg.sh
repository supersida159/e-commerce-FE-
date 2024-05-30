APP_NAME=e-commerce-fe

echo "Loading Docker image..."
docker load -i ${APP_NAME}.tar

echo "Stopping and removing existing container..."
docker rm -f ${APP_NAME}


# Run the Docker container
echo "Running new Docker container..."
docker run -d --name ${APP_NAME} \
  --network my-net \
  -e VIRTUAL_HOST="139.59.255.226" \
  -e LETSENCRYPT_HOST="139.59.255.226" \
  -e LETSENCRYPT_EMAIL="shitga@gmail.com" \
  -e ENVIRONMENT="Development" \
  -p 3000:3000 \
  ${APP_NAME}

