package server

import (
	"GmailManagement/internal/models"
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/go-chi/chi/v5"
)

func (s *Server) riasecHandler() http.Handler {
	r := chi.NewRouter()
	r.Get("/{id}", s.getRiasec)
	r.Post("/", s.setRiasec)
	return r
}

func (s *Server) getRiasec(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))

	riasec, err := s.db.GetRIASEC(id)
	// assessment, err := s.db.
	if err != nil {
		http.Error(w, "RIASEC not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(riasec)
}

func (s *Server) setRiasec(w http.ResponseWriter, r *http.Request) {
	var riasec models.Riasec
	if err := json.NewDecoder(r.Body).Decode(&riasec); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	riasec.CreatedAt = time.Now()
	riasec.UpdatedAt = time.Now()

	if err := s.db.SetRIASEC(&riasec); err != nil {
		http.Error(w, "Failed to save RIASEC", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(riasec)
}
