package server

import (
	"GmailManagement/internal/models"
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/go-chi/chi/v5"
)

func (s *Server) assessment() http.Handler {
	r := chi.NewRouter()
	r.Get("/{id}", s.getAssessment)
	r.Post("/", s.setAssessment)
	return r
}

func (s *Server) getAssessment(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		http.Error(w, "invalid id", http.StatusBadRequest)
		return
	}
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
