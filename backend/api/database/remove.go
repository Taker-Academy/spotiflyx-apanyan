package database

import (
    "api/models"
)

func RemoveUser(userID uint) error {
    db := GetDB()
    if err := db.Where("id = ?", userID).Delete(&models.User{}).Error; err != nil {
        return err
    }
    return nil
}
