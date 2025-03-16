package models

import (
	"time"
)

type Course struct {
	CourseID    int       `json:"courseid" bson:"courseid"`
	CourseName  string    `json:"coursename" bson:"coursename"`
	Description string    `json:"description" bson:"description"`
	CreatedAt   time.Time `json:"createAt" bson:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt" bson:"updatedAt"`
}
