package database

import (
	"GmailManagement/internal/models"
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

func (s *service) GetUser(id string) (*models.User, error) {
	collection := s.db.Database(database).Collection("User")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var user models.User
	err := collection.FindOne(ctx, bson.M{"id": id}).Decode(&user)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (s *service) SetUser(user *models.User) error {
	collection := s.db.Database(database).Collection("User")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err := collection.InsertOne(ctx, user)
	return err
}
