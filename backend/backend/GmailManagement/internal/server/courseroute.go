package server

import (
	"GmailManagement/internal/models"
	"encoding/json"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
)

func (s *Server) courseHandler() http.Handler {
	r := chi.NewRouter()
	r.Get("/{id}", s.getCourse)
	r.Post("/", s.setCourse)
	return r
}

func (s *Server) getCourse(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	course, err := s.db.GetCourse(id)
	// assessment, err := s.db.
	if err != nil {
		http.Error(w, "Course not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(course)
}

func (s *Server) setCourse(w http.ResponseWriter, r *http.Request) {
	var course models.Course
	if err := json.NewDecoder(r.Body).Decode(&course); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	course.CreatedAt = time.Now()
	course.UpdatedAt = time.Now()

	if err := s.db.SetCourse(&course); err != nil {
		http.Error(w, "Failed to save course", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(course)
}
