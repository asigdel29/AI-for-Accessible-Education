package server

import (
	"GmailManagement/internal/models"
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/go-chi/chi/v5"
)

func (s *Server) progressHandler() http.Handler {
	r := chi.NewRouter()
	r.Get("/{id}", s.getProgress)
	r.Post("/", s.setProgress)
	return r
}

func (s *Server) getProgress(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	progress, err := s.db.GetUserProgress(id)
	// assessment, err := s.db.
	if err != nil {
		http.Error(w, "User progress not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(progress)
}

func (s *Server) setProgress(w http.ResponseWriter, r *http.Request) {
	var progress models.Userprogress
	if err := json.NewDecoder(r.Body).Decode(&progress); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	progress.StartedAt = time.Now()
	progress.CompletedAt = time.Now()

	if err := s.db.SetUserProgress(&progress); err != nil {
		http.Error(w, "Failed to save user progress", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(progress)
}
