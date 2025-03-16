package models

import (
	"time"
)

type Feedback struct {
	Feedbackid int       `json:"feedbackid"`
	Userid     int       `json:"useridname"`
	Courseid   int       `json:"courseid"`
	Rating     int       `json:"rating"`
	Comments   string    `json:"comments"`
	CreatedAt  time.Time `json:"createAt"`
}
