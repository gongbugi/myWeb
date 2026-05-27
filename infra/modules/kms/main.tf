resource "aws_kms_key" "common" {
    enable_key_rotation = true

    tags = {
        Name = "${var.project_name}-${var.env}-kms"
    }
}

resource "aws_kms_alias" "common" {
    name = "alias/${var.project_name}-${var.env}-key"
    target_key_id = aws_kms_key.common.key_id  
}