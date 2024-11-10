#!/bin/bash
# Install npm dependencies and build React apps
echo "Building React Clock App..."
cd react_apps/clock
npm install
npm run build

echo "Building React Mood App..."
cd ../mood
npm install
npm run build

# Go back to root
cd ..

