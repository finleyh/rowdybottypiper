#!/bin/sh

echo "Beginning bot"
xvfb-run --server-args='-screen 0 1920x1080x24' node example1.js
