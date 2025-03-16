<<<<<<< HEAD
=======
package models

import (
	"time"
)

type Topic struct {
	Topicid     int       `json:"topicid"`
	Topicname   string    `json:"topicname"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"createAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}
>>>>>>> a2f439a (working on crud)
