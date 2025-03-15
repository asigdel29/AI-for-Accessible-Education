package models

import (
	"time"
)

type userprogress struct {
	Progressid  int       `json:"progressid"`
	Userid      int       `json:"userid"`
	Lessonid    int       `json:"lessonid"`
	Status      string    `json:"status"`
	Score       int       `json:"score"`
	StartedAt   time.Time `json:"startedAt"`
	CompletedAt time.Time `json:"completedAt"`
}
