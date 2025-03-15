package database

import (
	"GmailManagement/internal/models"
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

func (s *service) GetCourse(id int) (*models.Course, error) {
	collection := s.db.Database(database).Collection("courses")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var course models.Course
	err := collection.FindOne(ctx, bson.M{"courseid": id}).Decode(&course)
	if err != nil {
		return nil, err
	}
	return &course, nil
}

func (s *service) SetCourse(course *models.Course) error {
	collection := s.db.Database(database).Collection("courses")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err := collection.InsertOne(ctx, course)
	return err
}
