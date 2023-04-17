build:
	GOOS=linux GOARCH=arm64 go build -ldflags="-s -w" -o bootstrap main.go

zip:
	zip appsync-authorizer.zip bootstrap

build_zip: build zip

deploy:
	aws s3api put-object \
	--bucket ffrub-etc \
	--key appsync-authorizer.zip \
	--body appsync-authorizer.zip

clean:
	rm ./bootstrap
	rm ./appsync-authorizer.zip

