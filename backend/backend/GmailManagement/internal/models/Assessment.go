package models

import (
	"time"
)

type Assessment struct {
	AssessmentID   int       `json:"assessmentid" bson:"assessmentid"`
	LessonID       int       `json:"lessonid" bson:"lessonid"`
	AssessmentType string    `json:"assessmentType" bson:"assessmentType"`
	Questions      string    `json:"questions" bson:"questions"`
	CreatedAt      time.Time `json:"createdAt" bson:"createdAt"`
	UpdatedAt      time.Time `json:"updatedAt" bson:"updatedAt"`
}
