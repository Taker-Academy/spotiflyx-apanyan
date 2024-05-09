package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	"api/database"
	"api/middleware"
	"api/routes/auth"
	"api/routes/user"
    "api/routes/media"
)

func setupRoutes(app *fiber.App) {
    app.Post("/auth/register", auth.RegisterHandler)
    app.Post("/auth/login", auth.LoginHandler)
    app.Get("/user/me", middleware.Authenticate, user.InfoHandler)
	app.Put("/user/edit", middleware.Authenticate, user.EditHandler)
    app.Delete("/user/remove", middleware.Authenticate, user.RemoveHandler)
    app.Get("/media/", middleware.Authenticate, media.GetPostsHandler)
	app.Post("/media/", middleware.Authenticate, media.CreatePostHandler)
    app.Get("/media/me", middleware.Authenticate, media.GetUserPostsHandler)
    app.Get("/post/:id", middleware.Authenticate, media.GetPostDetailsHandler)
}

func main() {
    database.ConnectDB()
    app := fiber.New()
    app.Use(cors.New())
    setupRoutes(app)

    log.Fatal(app.Listen(":8080"))
}