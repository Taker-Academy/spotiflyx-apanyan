package database

import (
    "api/models"
)

func UpdateUser(userID uint, newUser *models.User) error {
    db := GetDB()
    var existingUser models.User
    if err := db.Where("id = ?", userID).First(&existingUser).Error; err != nil {
        return err
    }
    existingUser.FirstName = newUser.FirstName
    existingUser.LastName = newUser.LastName
    existingUser.Email = newUser.Email
    existingUser.Password = newUser.Password
    if err := db.Save(&existingUser).Error; err != nil {
        return err
    }
    return nil
}
