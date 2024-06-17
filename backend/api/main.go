package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	"api/database"
	"api/middleware"
	"api/routes/auth"
	"api/routes/favoris"
	"api/routes/likes"
	"api/routes/media"
	"api/routes/user"
)

func setupRoutes(app *fiber.App) {
    app.Post("/auth/register", auth.RegisterHandler)
    app.Post("/auth/login", auth.LoginHandler)
    app.Get("/user/me", middleware.Authenticate, user.InfoHandler)
	app.Put("/user/edit", middleware.Authenticate, user.EditHandler)
    app.Delete("/user/remove", middleware.Authenticate, user.RemoveHandler)
    app.Get("/media/", middleware.Authenticate, media.GetMediasHandler)
	app.Post("/media/", middleware.Authenticate, media.CreateMediaHandler)
    app.Get("/media/me", middleware.Authenticate, media.GetUserMediasHandler)
    app.Get("/media/:id", middleware.Authenticate, media.GetMediaDetailsHandler)
    app.Delete("/media/:id", middleware.Authenticate, media.DeleteMediaHandler)
    app.Get("/likes/me", middleware.Authenticate, likes.GetUserLikesMediaHandler)
    app.Get("/likes/:id", middleware.Authenticate, likes.GetMediaLikesHandler)
    app.Post("/likes/:id", middleware.Authenticate, likes.LikeMediaHandler)
    app.Delete("/likes/:id", middleware.Authenticate, likes.UnlikeMediaHandler)
    app.Post("/favoris/:id", middleware.Authenticate, favoris.AddToFavoriteHandler)
    app.Get("/favoris/me", middleware.Authenticate, favoris.GetUserFavoriteMediasHandler)
    app.Get("/favoris/:id", middleware.Authenticate, favoris.IsPostFavedHandler)
    app.Delete("/favoris/:id", middleware.Authenticate, favoris.RemoveFromFavoritesHandler)
}

func main() {
    database.ConnectDB()
    app := fiber.New()
    app.Use(cors.New())
    setupRoutes(app)

    log.Fatal(app.Listen(":8443"))
}
