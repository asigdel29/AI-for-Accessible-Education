package models

import (
	"time"
)

type Lesson struct {
	Lessonid  int       `json:"lessonid"`
	Topicid   int       `json:"topicid"`
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}
