install: 
	npm install

start: 
	npx babel-node 'src/bin/gendiff.js'

lint:
	npx eslint '.'

publish: lint
	npm publish

publish-dry: lint
	npm publish --dry-run

install-local: 
	npm run build
	cd dist
	sudo npm link
