package middleware

import (
	"golang.org/x/crypto/bcrypt"
)

func VerifyPassword(password, hashedPassword string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
    if err == nil {
        return true
    } else {
        return false
    }
}
