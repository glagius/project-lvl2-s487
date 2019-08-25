install: 
	npm install

start: 
	npx babel-node 'src/bin/gendiff.js'

build:
	npm run build

lint:
	npx eslint '.'

test: 
	npm run test

publish: lint
	npm publish

publish-dry: lint
	npm publish --dry-run

install-local: 
	npm run build
	cd dist
	sudo npm link
