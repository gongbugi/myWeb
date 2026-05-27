output "key_arn" {
  value       = aws_kms_key.common.arn
}

output "key_id" {
  value       = aws_kms_key.common.key_id
}

output "alias_arn" {
    value = aws_kms_alias.common.arn
}