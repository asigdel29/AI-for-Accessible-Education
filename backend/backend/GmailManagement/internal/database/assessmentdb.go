package database

import (
	"GmailManagement/internal/models"
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

func (s *service) GetAssessment(id int) (*models.Assessment, error) {
	collection := s.db.Database("LetsStudy").Collection("Assessment")
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	var assessment models.Assessment
	err := collection.FindOne(ctx, bson.M{"assessmentid": id}).Decode(&assessment)
	if err != nil {
		return nil, err
	}
	return &assessment, nil
}

func (s *service) SetAssessment(assessment *models.Assessment) error {
	collection := s.db.Database(database).Collection("Assessment")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err := collection.InsertOne(ctx, assessment)
	return err
}
