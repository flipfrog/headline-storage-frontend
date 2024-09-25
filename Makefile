all: run

run:
	npm run dev

run-prod:
	npm run build && npx next start

test:
	npm run test
