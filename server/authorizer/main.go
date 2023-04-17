package main

import (
	"context"
	"encoding/json"
	"errors"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	jwt "github.com/golang-jwt/jwt/v4"
)

func parseToken(token string) (jwt.MapClaims, error) {
	begin := "-----BEGIN PUBLIC KEY-----\n"
	end := "\n-----END PUBLIC KEY-----"
	pkString := begin + os.Getenv("pubKey") + end

	parsedToken, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		pk, err := jwt.ParseECPublicKeyFromPEM([]byte(pkString))
		if err != nil {
			return nil, err
		}

		return pk, nil
	})

	if err != nil {
		return nil, err
	}

	if claims, ok := parsedToken.Claims.(jwt.MapClaims); ok && parsedToken.Valid {
		return claims, nil
	}

	return nil, errors.New("invalid token")

}

func HandleRequest(
	ctx context.Context,
	request events.AppSyncLambdaAuthorizerRequest,
) (events.AppSyncLambdaAuthorizerResponse, error) {

	claims, err := parseToken(request.AuthorizationToken)

	switch {
	case err != nil:
		return events.AppSyncLambdaAuthorizerResponse{IsAuthorized: false}, err
	case claims["sub"] == nil:
		return events.AppSyncLambdaAuthorizerResponse{IsAuthorized: false}, nil
	default:
		var roles []string
		for _, r := range claims["rid"].([]interface{}) {
			roles = append(roles, r.(string))
		}

		rid, err := json.Marshal(roles)
		if err != nil {
			return events.AppSyncLambdaAuthorizerResponse{IsAuthorized: false}, err
		}

		return events.AppSyncLambdaAuthorizerResponse{
			IsAuthorized: true,
			ResolverContext: map[string]interface{}{
				"sub": claims["sub"],
				"rid": string(rid),
			},
		}, nil
	}
}

func main() {
	lambda.Start(HandleRequest)
}
