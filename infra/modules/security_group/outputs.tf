output "db_sg_id" {
    value = aws_security_group.db.id
}

output "redis_sg_id" {
    value = aws_security_group.redis.id
}