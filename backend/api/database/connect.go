package database

import (
    "github.com/jinzhu/gorm"
    _ "github.com/jinzhu/gorm/dialects/postgres"
    "log"
    "time"
    "api/models"
)

var db *gorm.DB

func ConnectDB() {
    var err error
    ***REMOVED***
    for {
        db, err = gorm.Open("postgres", dataSourceName)
        if err != nil {
            log.Println("Failed to connect to the database:", err)
            time.Sleep(5 * time.Second)
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