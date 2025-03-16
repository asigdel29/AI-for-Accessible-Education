package server

import (
	"GmailManagement/internal/models"
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/go-chi/chi/v5"
)

func (s *Server) topicHandler() http.Handler {
	r := chi.NewRouter()
	r.Get("/{id}", s.getTopic)
	r.Post("/", s.setTopic)
	return r
}

func (s *Server) getTopic(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))

	topic, err := s.db.GetTopic(id)
	// assessment, err := s.db.
	if err != nil {
		http.Error(w, "Topic not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(topic)
}

func (s *Server) setTopic(w http.ResponseWriter, r *http.Request) {
	var topic models.Topic
	if err := json.NewDecoder(r.Body).Decode(&topic); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	topic.CreatedAt = time.Now()
	topic.UpdatedAt = time.Now()

	if err := s.db.SetTopic(&topic); err != nil {
		http.Error(w, "Failed to save topic", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(topic)
}
