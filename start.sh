#!/bin/sh
while true
do
node index.js
echo "Ctrl+C wenn du den Server stoppen möchtest!"
echo "Neustart in:"
for i in 3 2 1
do
echo "$i..."
sleep 1
done
echo "Neustart!"
done