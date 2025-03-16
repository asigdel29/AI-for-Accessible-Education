package server

import (
	"GmailManagement/internal/auth"
	"GmailManagement/internal/models"
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"github.com/golang-jwt/jwt/v5"
	"os"
	"time"

	"github.com/gorilla/sessions"

	//"github.com/gorilla/pat"
	"net/http"

	//"github.com/gorilla/pat"
	"github.com/go-chi/chi/v5"
	"github.com/markbates/goth/gothic"
)

func (s *Server) RegisterRoutes() http.Handler {
	//r := pat.New()
	//r := gin.New()

	r := chi.NewRouter()

	// Add logging middleware
	r.Use(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")
			w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding")
			w.Header().Set("Access-Control-Allow-Credentials", "true")
			next.ServeHTTP(w, r)
		})
	})

	assessmentHandler := s.assessment()
	r.Mount("/assessment", assessmentHandler)

	courseHandler := s.courseHandler()
	r.Mount("/course", courseHandler)

	feedbackHandler := s.feedbackHandler()
	r.Mount("/feedback", feedbackHandler)

	lessonHandler := s.lessonHandler()
	r.Mount("/lesson", lessonHandler)

	riasec := s.riasecHandler()
	r.Mount("/riasec", riasec)

	topicHandler := s.topicHandler()
	r.Mount("/topic", topicHandler)

	userProgress := s.progressHandler()
	r.Mount("/progress", userProgress)

	r.Get("/auth/{provider}/callback", s.CallbackHandler)

	r.Get("/health", s.healthHandler)

	r.Get("/home", func(writer http.ResponseWriter, request *http.Request) {
	})

	r.Get("/auth/{provider}", func(w http.ResponseWriter, r *http.Request) {
		provider := chi.URLParam(r, "provider")
		q := r.URL.Query()
		q.Add("provider", provider)
		r.URL.RawQuery = q.Encode()
		//gothic.StoreInSession("provider", provider, r, w)
		gothic.GetContextWithProvider(r, provider)
		if gothUser, err := gothic.CompleteUserAuth(w, r); err == nil {
			fmt.Println(gothUser)
			http.Redirect(w, r, "http://localhost:8080/home", http.StatusTemporaryRedirect)
		}
		gothic.BeginAuthHandler(w, r)
	})

	r.Get("/logout", func(w http.ResponseWriter, r *http.Request) {
		// enableCORS(w, r)
		session, _ := auth.Store.Get(r, "session")
		session.Values["user"] = "" // need to set path to the frontend
		if err := session.Save(r, w); err != nil {
			fmt.Println("Error saving session:", err)
		}
		err := gothic.Logout(w, r)
		if err != nil {
			return
		}
		msg := map[string]string{"msg": "successfully logged out"}
		json.NewEncoder(w).Encode(msg)
	})

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("Received request to /") // Add debug logging
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("hello world"))
	})

	r.Get("/whoamI", func(w http.ResponseWriter, r *http.Request) {
		// enableCORS(w, r)
		cookie, err := auth.Store.Get(r, "session")
		if err != nil {
			if err == http.ErrNoCookie {
				w.WriteHeader(http.StatusUnauthorized)
				w.Write([]byte("Cookies not found"))
				return
			}
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		fmt.Println(cookie)
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("logged in"))
	})

	return r
}

func (s *Server) healthHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
}

// func enableCORS(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8081") // Allow frontend
// 	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
// 	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
// 	w.Header().Set("Access-Control-Allow-Credentials", "true") // Allow cookies & sessions
// }

func (s *Server) CallbackHandler(w http.ResponseWriter, r *http.Request) {
	provider := chi.URLParam(r, "provider")
	//if provider == r.URL.Query().Get("provider") {
	q := r.URL.Query()
	q.Add("provider", provider)
	r.URL.RawQuery = q.Encode()
	sessions.Save(r, w)
	//q.Set("google", provider)
	user, err := gothic.CompleteUserAuth(w, r)
	if err != nil {
		fmt.Println(err)
		return
	}

	//generate session id
	sessionid, err := generateSessionid()
	if err != nil {
		http.Error(w, "Failed to generate session ID: "+err.Error(), http.StatusInternalServerError)
		return
	}
	u := models.User{ID: sessionid, GoogleID: user.UserID, Email: user.Email, Name: user.Name, FamilyName: user.LastName, ProfilePicture: user.AvatarURL, AccessToken: user.AccessToken, RefreshToken: user.RefreshToken, TokenExpiry: user.ExpiresAt, CreatedAt: time.Now(), UpdatedAt: time.Now()}
	err = s.db.SetUser(&u)
	if err != nil {
		return
	}
	jwtstring, err := createToken(sessionid)
	if err != nil {
		fmt.Println(err)
	}

	//create a cookie sessionls
	session, _ := auth.Store.Get(r, "session")
	session.Values["sessionId"] = jwtstring // need to set path to the frontend
	if err := session.Save(r, w); err != nil {
		fmt.Println("Error saving session:", err)
	}
	http.Redirect(w, r, "http://localhost:8000/", http.StatusFound)
}

func generateSessionid() (string, error) {
	b := make([]byte, 32)
	_, err := rand.Read(b)
	if err != nil {
		return "", err
	}
	return base64.URLEncoding.EncodeToString(b), nil
}

func createToken(username string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"sessionId": username,
			"exp":       time.Now().Add(time.Hour * 24).Unix(),
		})
	tokenString, err := token.SignedString(os.Getenv("UID_SECRET"))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func verifyToken(tokenString string) error {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return os.Getenv("UID_SECRET"), nil
	})

	if err != nil {
		return err
	}

	if !token.Valid {
		return fmt.Errorf("invalid token")
	}

	return nil
}
