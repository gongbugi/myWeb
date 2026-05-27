resource "aws_cognito_user_pool" "main" {
    name = "${var.project_name}-${var.env}-user-pool"

    username_attributes = ["email"]
    auto_verified_attributes = ["email"]

    tags = {
        Name = "${var.project_name}-${var.env}-cognito-pool"
    }
}

resource "aws_cognito_user_pool_client" "client" {
    name = "${var.project_name}-${var.env}-app-client"
    user_pool_id = aws_cognito_user_pool.main.id

    generate_secret = false

    explicit_auth_flows = [
        "ALLOW_USER_PASSWORD_AUTH",
        "ALLOW_REFRESH_TOKEN_AUTH",
        "ALLOW_USER_SRP_AUTH"
    ]
}