resource "aws_elasticache_subnet_group" "main" {
    name = "${var.project_name}-${var.env}-redis-sng"
    subnet_ids = var.private_subnet_ids

    tags = {
      Name = "${var.project_name}-${var.env}-redis-sng"
    }
}

resource "aws_elasticache_replication_group" "main" {
    replication_group_id = "${var.project_name}-${var.env}-redis"
    description = "Session Managment and caching"

    engine = "redis"
    engine_version = "7.1"
    node_type = "cache.t3.micro"
    port = 6379

    num_cache_clusters = 1

    parameter_group_name = "default.redis7"
    subnet_group_name = aws_elasticache_subnet_group.main.name
    security_group_ids = [var.redis_sg_id]

    snapshot_retention_limit = 0

    tags = {
        Name = "${var.project_name}-${var.env}-redis"
    }
}