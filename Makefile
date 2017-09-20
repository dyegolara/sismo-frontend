.PHONY: build

deploy: build
	rsync -avz \
	-e "ssh" build/ jmz7v@192.81.209.31:/var/www/ayuda-mx.com/public/

setup:
	yarn install

run:
	yarn start
	# python -m SimpleHTTPServer 3011

build:
	yarn build

standard:
	standard --fix

pull:
	git pull upstream master

