# База для Bun
FROM oven/bun:latest AS development

# Встановлюємо робочу директорію
WORKDIR /app

ENV NEXT_PUBLIC_API_URL=http://api:8080

# Копіюємо package.json і bun.lockb
COPY package.json  ./

# Встановлюємо залежності
RUN bun install

# Копіюємо весь код
COPY . .

RUN bun run build

# Запускаємо Next.js у dev-режимі
CMD ["bun", "run", "start"]
