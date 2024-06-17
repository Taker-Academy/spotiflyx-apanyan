package database

import (
    "github.com/jinzhu/gorm"
    _ "github.com/jinzhu/gorm/dialects/postgres"
    "log"
    "time"
    "api/models"
    "os"
    "fmt"
)

var db *gorm.DB

func ConnectDB() {
    var err error
    user := os.Getenv("POSTGRES_USER")
    dbname := os.Getenv("POSTGRES_DB")
    password := os.Getenv("POSTGRES_PASSWORD")
    dataSourceName := fmt.Sprintf("host=db user=%s dbname=%s password=%s sslmode=disable", user, dbname, password)
    for {
        db, err = gorm.Open("postgres", dataSourceName)
        if err != nil {
            log.Println("Failed to connect to the database:", err)
            time.Sleep(1 * time.Second)
            continue
        }
        db.AutoMigrate(&models.User{}, &models.Media{}, &models.Favoris{}, &models.Likes{})
        log.Println("Connexion à la base de données établie et migration automatique effectuée.")
        break
    }
}

func GetDB() *gorm.DB {
    return db
}
