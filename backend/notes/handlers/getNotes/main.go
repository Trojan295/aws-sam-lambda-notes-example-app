package main

import (
	"encoding/json"
	"log"
	"notes/notes"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

var (
	repo = notes.NewDynamoDBNotesRepositoryFromEnv()
)

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	notes, err := repo.GetNotesForUser("")
	if err != nil {
		log.Printf("cannot get notes: %v", err)
		return events.APIGatewayProxyResponse{StatusCode: 500}, nil
	}

	responseBody, err := json.Marshal(&notes)
	if err != nil {
		log.Printf("cannot marshal notes: %v", err)
		return events.APIGatewayProxyResponse{StatusCode: 500}, nil
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       string(responseBody),
	}, nil
}

func main() {
	lambda.Start(handler)
}
