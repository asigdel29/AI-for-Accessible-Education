package database

import (
	"GmailManagement/internal/models"
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

func (s *service) GetTopic(id int) (*models.Topic, error) {
	collection := s.db.Database(database).Collection("Topic")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var topic models.Topic
	err := collection.FindOne(ctx, bson.M{"topicid": id}).Decode(&topic)
	if err != nil {
		return nil, err
	}
	return &topic, nil
}

func (s *service) SetTopic(topic *models.Topic) error {
	collection := s.db.Database(database).Collection("Topic")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err := collection.InsertOne(ctx, topic)
	return err
}
