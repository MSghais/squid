process: migrate
	@node -r dotenv/config lib/processor.js


serve:
	@npx squid-graphql-server


migrate:
	@npx sqd db:migrate


migration:
	@npx sqd db:create-migration Data


typegen:
	@npx squid-evm-typegen --abi erc721.json --output src/erc721.ts


codegen:
	@npx sqd codegen


up:
	@docker-compose up -d


down:
	@docker-compose down


.PHONY: process serve migrate migration codegen typegen up down
