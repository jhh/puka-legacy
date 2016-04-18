BUILD_DIR="./output"
CONFIG_DIR="./config"

if [ $(uname -o) = "GNU/Linux" ]; then
  DEV_HOST="0.0.0.0"
else
  DEV_HOST="localhost"
fi
