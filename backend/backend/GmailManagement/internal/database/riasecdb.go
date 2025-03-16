<<<<<<< HEAD
=======
package database

import (
	"GmailManagement/internal/models"
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

func (s *service) GetRIASEC(id int) (*models.Riasec, error) {
	collection := s.db.Database(database).Collection("Riasec")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var riasec models.Riasec
	err := collection.FindOne(ctx, bson.M{"testid": id}).Decode(&riasec)
	if err != nil {
		return nil, err
	}
	return &riasec, nil
}

func (s *service) SetRIASEC(riasec *models.Riasec) error {
	collection := s.db.Database(database).Collection("Riasec")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err := collection.InsertOne(ctx, riasec)
	return err
}
>>>>>>> a2f439a (working on crud)
