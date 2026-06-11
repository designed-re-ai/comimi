#!/bin/bash
docker run --rm -v $(pwd):/workspace -w /workspace --network shared_net -e DOCKER_HOST=tcp://172.20.0.4:2375 docker:cli docker build -t llm-node-tunnel:latest .
