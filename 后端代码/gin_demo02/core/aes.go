package core

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"encoding/base64"
)

// AesEncrypt data为明文  key为密钥
func AesEncrypt(data, key []byte) string {
	block, err := aes.NewCipher(key)
	if err != nil {
		return ""
	}
	blockSize := block.BlockSize()
	padding := blockSize - len(data)%blockSize
	text := bytes.Repeat([]byte{byte(padding)}, padding)
	data = append(data, text...)
	blockMode := cipher.NewCBCEncrypter(block, key[:blockSize])
	crypt := make([]byte, len(data))
	blockMode.CryptBlocks(crypt, data)
	return base64.StdEncoding.EncodeToString(crypt)
}
