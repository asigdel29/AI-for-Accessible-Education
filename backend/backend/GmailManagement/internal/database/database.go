package database

import (
	"context"
	"log"
	"os"
	"time"

	"GmailManagement/internal/models"

	_ "github.com/joho/godotenv/autoload"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Service interface {
	Health() map[string]string
	GetAssessment(id int) (*models.Assessment, error)
	SetAssessment(assessment *models.Assessment) error
	GetLesson(id int) (*models.Lesson, error)
	SetLesson(lesson *models.Lesson) error
	GetCourse(id int) (*models.Course, error)
	SetCourse(course *models.Course) error
	GetRIASEC(id int) (*models.Riasec, error)
	SetRIASEC(riasec *models.Riasec) error
	GetFeedback(id int) (*models.Feedback, error)
	SetFeedback(feedback *models.Feedback) error
	GetTopic(id int) (*models.Topic, error)
	SetTopic(topic *models.Topic) error
	GetUserProgress(userid int) (*models.Userprogress, error)
	SetUserProgress(progress *models.Userprogress) error
}

type service struct {
	db *mongo.Client
}

var (
	host     = os.Getenv("BLUEPRINT_DB_HOST")
	port     = os.Getenv("BLUEPRINT_DB_PORT")
	url      = os.Getenv("MONGO_CONNECTION_URL")
	database = os.Getenv("MONGO_DATABASE")
)

func New() Service {
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(url))

	if err != nil {
		log.Fatal(err)

	}
	return &service{
		db: client,
	}
}

func (s *service) Health() map[string]string {
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()

	err := s.db.Ping(ctx, nil)
	if err != nil {
		log.Fatalf("db down: %v", err)
	}

	return map[string]string{
		"message": "It's healthy",
	}
}
