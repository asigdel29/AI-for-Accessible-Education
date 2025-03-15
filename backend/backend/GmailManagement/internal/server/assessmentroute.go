package server

import (
	"GmailManagement/internal/models"
	"encoding/json"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
)

func (s *Server) assessment() http.Handler {
	r := chi.NewRouter()
	r.Get("/assessment/{id}", s.getAssessment)
	r.Post("/assessment", s.setAssessment)
	return r
}

func (s *Server) getAssessment(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	assessment, err := s.db.GetAssessment(id)
	// assessment, err := s.db.
	if err != nil {
		http.Error(w, "Assessment not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(assessment)
}

func (s *Server) setAssessment(w http.ResponseWriter, r *http.Request) {
	var assessment models.Assessment
	if err := json.NewDecoder(r.Body).Decode(&assessment); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	assessment.CreatedAt = time.Now()
	assessment.UpdatedAt = time.Now()

	if err := s.db.SetAssessment(&assessment); err != nil {
		http.Error(w, "Failed to save assessment", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(assessment)
}
