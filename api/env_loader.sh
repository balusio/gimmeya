#!/bin/bash
# use a .env reader on bash
# based on example https://gist.github.com/mihow/9c7f559807069a03e302605691f85572
if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi
echo ".ENV exported"
# wrap and run the node commands as arguments
# example env_loader.sh 'node index.js'
$1
