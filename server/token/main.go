package main

import (
	"fmt"
	"os"
	"time"
	"flag"

	jwt "github.com/golang-jwt/jwt/v4"
)

const ROOM_ID = "room#0dc94c94-a36e-420e-9d6f-eeeaacbe87e1"
const BUYER_ID = "f46f9fda-bb72-48f5-84a3-95e514d2320c"
const SELLLER_ID = "0184535f-71dd-4310-8a8e-06cdda81de4b"

func createToken(userId string) (string, error) {
	pkPem, err := os.ReadFile("keys/private-key.pem")
	if err != nil {
		return "", err
	}

	signingKey, err := jwt.ParseECPrivateKeyFromPEM(pkPem)
	if err != nil {
		return "", err
	}

	claims := &jwt.MapClaims{
		"iss": "https://auth.ffrub.com",
		"aud": "https://api.ffrub.com",
		"sub": userId,
		"exp": time.Now().Add(time.Hour * 1).Unix(),
		"iat": time.Now().Unix(),
		"rid": []string{ROOM_ID},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodES256, claims)
	ss, err := token.SignedString(signingKey)
	if err != nil {
		return "", err
	}

	return ss, nil
}

type Claims struct {
	sub string `json:"sub"`
	rid []string `json:"rid"`
	jwt.RegisteredClaims
}

func parseToken(token string) (jwt.MapClaims, error) {
	pkPem, err := os.ReadFile("keys/public-key.pem")
	if err != nil {
		return nil, err
	}

	parsedToken, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		pk, err := jwt.ParseECPublicKeyFromPEM(pkPem)
		if err != nil {
			return nil, err
		}

		return pk, nil
	})

	if err != nil {
		return nil, err
	}

	claims, _ := parsedToken.Claims.(jwt.MapClaims)

	return claims, nil
}

func main() {
	uKind := flag.String("u", "", "Specify if buyer or seller")
	flag.Parse()

	if *uKind == "" || (*uKind != "buyer" && *uKind != "seller") {
		flag.PrintDefaults()
		os.Exit(1)
	}

	var uId string
	if *uKind == "buyer" {
		uId = BUYER_ID
	} else {
		uId = SELLLER_ID
	}


	token, err := createToken(uId)
	if err != nil {
		panic(err)
	}
	fmt.Println(token)

	claims, err := parseToken(token)
	if err != nil {
		panic(err)
	}

	var roles []string
	for _, r := range claims["rid"].([]interface{}) {
		roles = append(roles, r.(string))
	}

	fmt.Println(roles)

	for k, v := range claims {
		fmt.Printf("%s: %v\n", k, v)
	}
}
