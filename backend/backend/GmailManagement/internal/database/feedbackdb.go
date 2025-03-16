package database

import (
	"GmailManagement/internal/models"
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

func (s *service) GetFeedback(id int) (*models.Feedback, error) {
<<<<<<< HEAD
	collection := s.db.Database(database).Collection("Feedback")
=======
	collection := s.db.Database(database).Collection("feedback")
>>>>>>> a2f439a (working on crud)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var feedback models.Feedback
	err := collection.FindOne(ctx, bson.M{"feedbackid": id}).Decode(&feedback)
	if err != nil {
		return nil, err
	}
	return &feedback, nil
}

func (s *service) SetFeedback(riasec *models.Feedback) error {
<<<<<<< HEAD
	collection := s.db.Database(database).Collection("Feedback")
=======
	collection := s.db.Database(database).Collection("feedback")
>>>>>>> a2f439a (working on crud)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err := collection.InsertOne(ctx, riasec)
	return err
}
