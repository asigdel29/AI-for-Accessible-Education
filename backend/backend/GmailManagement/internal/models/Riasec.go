<<<<<<< HEAD
=======
package models

import (
	"time"
)

type Riasec struct {
	Testid       int       `json:"testid"`
	Userid       int       `json:"userid"`
	Realistic    int       `json:"realistic"`
	Investigate  int       `json:"investigate"`
	Artistic     int       `json:"artistic"`
	Social       int       `json:"social"`
	Enterprising int       `json:"enterprising"`
	Conventional int       `json:"conventional"`
	CreatedAt    time.Time `json:"createAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
}
>>>>>>> a2f439a (working on crud)
