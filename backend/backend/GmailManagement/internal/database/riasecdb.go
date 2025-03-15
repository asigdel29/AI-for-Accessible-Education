package database

import (
	"GmailManagement/internal/models"
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

func (s *service) GetRIASEC(id int) (*models.RIASEC, error) {
	collection := s.db.Database(database).Collection("riasec")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var riasec models.RIASEC
	err := collection.FindOne(ctx, bson.M{"riasecid": id}).Decode(&riasec)
	if err != nil {
		return nil, err
	}
	return &riasec, nil
}

func (s *service) SetRIASEC(riasec *models.RIASEC) error {
	collection := s.db.Database(database).Collection("riasec")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err := collection.InsertOne(ctx, riasec)
	return err
}
