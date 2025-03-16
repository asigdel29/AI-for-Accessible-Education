package database

import (
	"GmailManagement/internal/models"
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

func (s *service) GetLesson(id int) (*models.Lesson, error) {
<<<<<<< HEAD
<<<<<<< HEAD
	collection := s.db.Database(database).Collection("Lesson")
=======
	collection := s.db.Database(database).Collection("lesson")
>>>>>>> a2f439a (working on crud)
=======
	collection := s.db.Database(database).Collection("Lesson")
>>>>>>> 30e7cd5 (worked on assessmentdb, coursedb, database, feedbackdb, lessondb, riasecdb, routes, server, toopicdb, userprogressdb)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var lesson models.Lesson
	err := collection.FindOne(ctx, bson.M{"lessonid": id}).Decode(&lesson)
	if err != nil {
		return nil, err
	}
	return &lesson, nil
}

func (s *service) SetLesson(riasec *models.Lesson) error {
<<<<<<< HEAD
<<<<<<< HEAD
	collection := s.db.Database(database).Collection("Lesson")
=======
	collection := s.db.Database(database).Collection("lesson")
>>>>>>> a2f439a (working on crud)
=======
	collection := s.db.Database(database).Collection("Lesson")
>>>>>>> 30e7cd5 (worked on assessmentdb, coursedb, database, feedbackdb, lessondb, riasecdb, routes, server, toopicdb, userprogressdb)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err := collection.InsertOne(ctx, riasec)
	return err
}
