#!/bin/sh

#openssl genrsa -out key.pem
#openssl req -new -key key.pem -out csr.pem
#openssl x509 -req -signkey key.pem -in csr.pem -out certificate.crt

openssl req -x509 -nodes -days 36500 -newkey rsa:2048 -keyout key.pem -out certificate.crt
