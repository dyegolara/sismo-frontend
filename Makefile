deploy:
	rsync -avz \
	-e "ssh" build/ jmz7v@192.81.209.31:/var/www/ayuda-mx.com/public/
