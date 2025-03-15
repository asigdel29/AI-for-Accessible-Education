package server

import (
	"GmailManagement/internal/models"
	"encoding/json"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
)

func (s *Server) feedbackHandler() http.Handler {
	r := chi.NewRouter()
	r.Get("/{id}", s.getFeedback)
	r.Post("/", s.setFeedback)
	return r
}

func (s *Server) getFeedback(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	feedback, err := s.db.getFeedback(id)
	// assessment, err := s.db.
	if err != nil {
		http.Error(w, "Feedback not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(feedback)
}

func (s *Server) setFeedback(w http.ResponseWriter, r *http.Request) {
	var feedback models.Feedback
	if err := json.NewDecoder(r.Body).Decode(&feedback); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	feedback.CreatedAt = time.Now()

	if err := s.db.Setfeedback(&feedback); err != nil {
		http.Error(w, "Failed to save feedback", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(feedback)
}
