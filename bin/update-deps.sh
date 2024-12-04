#!/bin/bash

# Обновляем пакеты в apps
for dir in apps/*/*/; do
  if [ -f "$dir/package.json" ]; then
    echo "Updating dependencies in $dir"
    cd "$dir"
    ncu -u
    cd - > /dev/null
  fi
done

# Обновляем пакеты в packages
for dir in packages/*/; do
  if [ -f "$dir/package.json" ]; then
    echo "Updating dependencies in $dir"
    cd "$dir"
    ncu -u
    cd - > /dev/null
  fi
done

# Обновляем корневой package.json
ncu -u

# Переустанавливаем зависимости
pnpm install
