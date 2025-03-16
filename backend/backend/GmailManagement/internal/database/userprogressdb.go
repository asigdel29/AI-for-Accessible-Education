package database

import (
	"GmailManagement/internal/models"
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

func (s *service) GetUserProgress(userid int) (*models.Userprogress, error) {
	collection := s.db.Database(database).Collection("userprogress")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var progress models.Userprogress
	err := collection.FindOne(ctx, bson.M{"userprogressid": userid}).Decode(&progress)
	if err != nil {
		return nil, err
	}
	return &progress, nil
}

func (s *service) SetUserProgress(progress *models.Userprogress) error {
	collection := s.db.Database(database).Collection("userprogress")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err := collection.InsertOne(ctx, progress)
	return err
}
