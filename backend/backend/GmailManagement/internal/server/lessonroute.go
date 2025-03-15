package server

import (
	"GmailManagement/internal/models"
	"encoding/json"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
)

func (s *Server) lessonHandler() http.Handler {
	r := chi.NewRouter()
	r.Get("/{id}", s.getLesson)
	r.Post("/", s.setLesson)
	return r
}

func (s *Server) getLesson(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	lesson, err := s.db.getLesson(id)
	// assessment, err := s.db.
	if err != nil {
		http.Error(w, "lesson not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(lesson)
}

func (s *Server) setlesson(w http.ResponseWriter, r *http.Request) {
	var lesson models.Lesson
	if err := json.NewDecoder(r.Body).Decode(&lesson); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	lesson.CreatedAt = time.Now()

	if err := s.db.setLesson(&lesson); err != nil {
		http.Error(w, "Failed to save lesson", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(lesson)
}
