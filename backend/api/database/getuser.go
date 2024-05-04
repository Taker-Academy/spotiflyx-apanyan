package database

import (
	"api/models"
)

func GetUserByEmail(email string) (*models.User, error) {
    var user models.User
    db := GetDB()
    if err := db.Where("email = ?", email).First(&user).Error; err != nil {
        return nil, err
    }
    return &user, nil
}