<<<<<<< HEAD
=======
package server

import (
	"GmailManagement/internal/auth"
	"GmailManagement/internal/models"
	"encoding/json"
	"fmt"
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
			w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
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
		w.Write([]byte(cookie.Values["user"].(string)))
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
	u := models.User{ID: user.UserID, GoogleID: user.UserID, Email: user.Email, Name: user.Name, FamilyName: user.LastName, ProfilePicture: user.AvatarURL, AccessToken: user.AccessToken, RefreshToken: user.RefreshToken, TokenExpiry: user.ExpiresAt, CreatedAt: time.Now(), UpdatedAt: time.Now()}

	//create a cookie sessionls
	session, _ := auth.Store.Get(r, "session")
	session.Values["user"] = u.ID // need to set path to the frontend
	if err := session.Save(r, w); err != nil {
		fmt.Println("Error saving session:", err)
	}
	http.Redirect(w, r, "http://localhost:8000/", http.StatusFound)
}
<<<<<<< HEAD

//func getEmailService(accessToken string) (*gmail.Service, error) {
//	client := &http.Client{}
//	client.Transport = &oauth2.Transport{Source: oauth2.StaticTokenSource(&oauth2.Token{AccessToken: accessToken}),
//		Base: http.DefaultTransport}
//	srv, err := gmail.New(client)
//	if err != nil {
//		return nil, err
//	}
//	return srv, nil
//}
//
//func getEmails(user *goth.User) ([]string, error) {
//	srv, err := getEmailService(user.AccessToken)
//	if err != nil {
//		return nil, err
//	}
//	userId := "me"
//	r, err := srv.Users.Messages.List(userId).Do()
//	if err != nil {
//		return nil, err
//	}
//	var s []string
//	for _, msg := range r.Messages {
//		email, err := GetEmail(srv, msg.Id)
//		if err != nil {
//			return nil, err
//		}
//		s = append(s, email)
//	}
//	return s, nil
//}
//
//func GetEmail(srv *gmail.Service, id string) (string, error) {
//	gmailMessageId, err := srv.Users.Messages.Get("me", id).Format("RAW").Do()
//	if err != nil {
//		return "", err
//	}
//	if gmailMessageId != nil {
//		decodedEmail, err := base64.RawURLEncoding.DecodeString(gmailMessageId.Raw)
//		if err != nil {
//			fmt.Println(err)
//		}
//		return string(decodedEmail), nil
//	}
//	return "", err
//}
>>>>>>> 30e7cd5 (worked on assessmentdb, coursedb, database, feedbackdb, lessondb, riasecdb, routes, server, toopicdb, userprogressdb)
=======
>>>>>>> c8e4ac7 (google oauth worked)
