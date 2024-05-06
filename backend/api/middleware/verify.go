package middleware

import (
	"time"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

type CustomClaims struct {
	UserID string `json:"_id"`
	jwt.StandardClaims
}

func VerifyJWT(tokenString string) (*CustomClaims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET_KEY")), nil
	})
	if err != nil {
		return nil, err
	}
	claims, ok := token.Claims.(*CustomClaims)
	if !ok || !token.Valid {
		return nil, jwt.ErrSignatureInvalid
	}
	if time.Now().Unix() > claims.ExpiresAt {
		return nil, jwt.ValidationError{Inner: err, Errors: jwt.ValidationErrorExpired}
	}
	return claims, nil
}

func VerifyPassword(password, hashedPassword string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
    if err == nil {
        return true
    } else {
        return false
    }
}
