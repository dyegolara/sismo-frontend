deploy:
	cp index.html build/index.html
	rsync -avz \
	-e "ssh" build/ jmz7v@192.81.209.31:/var/www/ayuda-mx.com/public/

run:
	python -m SimpleHTTPServer 3011