package com.example.BaoEng.enums;

/**
 * Lý do vô hiệu hóa token:
 * ENUM('LOGOUT','REFRESH_ROTATION','PASSWORD_CHANGE','ADMIN_REVOKE','SECURITY_ISSUE')
 */
public enum InvalidationReason {
    LOGOUT,
    REFRESH_ROTATION,
    PASSWORD_CHANGE,
    ADMIN_REVOKE,
    SECURITY_ISSUE
}
